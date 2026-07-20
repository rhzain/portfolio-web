"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type RgbColor = [number, number, number];

export interface RibbonColors {
  face?: string;
  foldA?: string;
  foldB?: string;
  foldC?: string;
}

export interface TwistingRibbonProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of segments along the ribbon (default 180, capped lower on small screens). */
  segments?: number;
  /** Speed of the wave motion (default 0.018) */
  waveSpeed?: number;
  /** Scale factor for the wave amplitude (default 1) */
  waveAmplitude?: number;
  /** Number of full twists along the ribbon length (default 6) */
  twistCycles?: number;
  /** Custom CSS colors for light mode. Defaults to the local ribbon tokens. */
  lightColors?: RibbonColors;
  /** Custom CSS colors for dark mode. Defaults to the local ribbon tokens. */
  darkColors?: RibbonColors;
  /** Duration before the ambient motion settles, in milliseconds (default 480). */
  motionDuration?: number;
  /** Keep the ribbon moving after its initial frame. */
  continuous?: boolean;
}

export function TwistingRibbon({
  className,
  segments = 180,
  waveSpeed = 0.018,
  waveAmplitude = 1,
  twistCycles = 6,
  lightColors,
  darkColors,
  motionDuration = 480,
  continuous = false,
  ...props
}: TwistingRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = container.clientWidth;
    let height = container.clientHeight;
    let segmentCount = segments;

    // ── Configuration ───────────────────────────────────────────────────
    const RIBBON_HALF_W = 14; 
    const RIBBON_X_SCALE = 1.4; 
    const RIBBON_X_OFFSET = 0.2; 

    // ── Wave / motion ─────────────────────────────────────────────────────
    const WAVE1_FREQ = 3.5;
    const WAVE1_TIME_SPEED = 0.7;
    const WAVE1_AMP = 110 * waveAmplitude;
    const WAVE2_FREQ = 7.0;
    const WAVE2_TIME_SPEED = 1.1;
    const WAVE2_AMP = 30 * waveAmplitude;

    const TWIST_TIME_SPEED = 0.5;

    const colorParser = document.createElement("canvas");
    colorParser.width = 1;
    colorParser.height = 1;
    const colorParserContext = colorParser.getContext("2d", {
      willReadFrequently: true,
    });

    let L_COLOR_FACE: RgbColor = [0, 0, 0];
    let L_COLOR_FOLD_A: RgbColor = [0, 0, 0];
    let L_COLOR_FOLD_B: RgbColor = [0, 0, 0];
    let L_COLOR_FOLD_C: RgbColor = [0, 0, 0];
    let D_COLOR_FACE: RgbColor = [0, 0, 0];
    let D_COLOR_FOLD_A: RgbColor = [0, 0, 0];
    let D_COLOR_FOLD_B: RgbColor = [0, 0, 0];
    let D_COLOR_FOLD_C: RgbColor = [0, 0, 0];
    let shadowAlpha = 0;
    let edgeAlpha = 0;

    const COLOR_CYCLE_FREQ = 2.0;
    const COLOR_CYCLE_SPEED = 0.3;
    const FACE_BLEND_GAMMA = 1.2;

    const SHADOW_OFFSET_X = 4;
    const SHADOW_OFFSET_Y = 7;
    const EDGE_MIN_TWIST = 0.08;
    const EDGE_WEIGHT = 0.5;

    let t = 0;

    function parseCssColor(value: string, fallback: string): RgbColor {
      if (!colorParserContext) return [0, 0, 0];

      colorParserContext.clearRect(0, 0, 1, 1);
      colorParserContext.fillStyle = fallback;
      colorParserContext.fillStyle = value;
      colorParserContext.fillRect(0, 0, 1, 1);
      const { data } = colorParserContext.getImageData(0, 0, 1, 1);
      return [data[0], data[1], data[2]];
    }

    function refreshColors() {
      const styles = getComputedStyle(container!);
      const fallback = styles.color;
      const token = (name: string) =>
        styles.getPropertyValue(name).trim() || fallback;
      const readPalette = (colors?: RibbonColors) => ({
        face: parseCssColor(
          colors?.face ?? token("--color-ribbon-face"),
          fallback
        ),
        foldA: parseCssColor(
          colors?.foldA ?? token("--color-ribbon-fold-a"),
          fallback
        ),
        foldB: parseCssColor(
          colors?.foldB ?? token("--color-ribbon-fold-b"),
          fallback
        ),
        foldC: parseCssColor(
          colors?.foldC ?? token("--color-ribbon-fold-c"),
          fallback
        ),
      });
      const lightPalette = readPalette(lightColors);
      const darkPalette = readPalette(darkColors);

      L_COLOR_FACE = lightPalette.face;
      L_COLOR_FOLD_A = lightPalette.foldA;
      L_COLOR_FOLD_B = lightPalette.foldB;
      L_COLOR_FOLD_C = lightPalette.foldC;
      D_COLOR_FACE = darkPalette.face;
      D_COLOR_FOLD_A = darkPalette.foldA;
      D_COLOR_FOLD_B = darkPalette.foldB;
      D_COLOR_FOLD_C = darkPalette.foldC;
      shadowAlpha = Number(token("--ribbon-shadow-alpha")) || 0;
      edgeAlpha = Number(token("--ribbon-edge-alpha")) || 0;
    }

    function resize() {
      width = container!.clientWidth;
      height = container!.clientHeight;
      segmentCount = Math.min(segments, width < 640 ? 120 : 180);
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      canvas!.width = Math.max(1, Math.round(width * pixelRatio));
      canvas!.height = Math.max(1, Math.round(height * pixelRatio));
      ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    // ── Helper functions ────────────────────────────────────────────────
    function lerpColor(a: RgbColor, b: RgbColor, f: number): RgbColor {
      return [
        Math.round(a[0] + (b[0] - a[0]) * f),
        Math.round(a[1] + (b[1] - a[1]) * f),
        Math.round(a[2] + (b[2] - a[2]) * f),
      ];
    }

    function buildSpine(time: number) {
      const pts = [];
      for (let i = 0; i <= segmentCount; i++) {
        const progress = i / segmentCount;
        pts.push({
          x: progress * width * RIBBON_X_SCALE - width * RIBBON_X_OFFSET,
          y:
            height / 2 +
            Math.sin(progress * Math.PI * WAVE1_FREQ + time * WAVE1_TIME_SPEED) * WAVE1_AMP +
            Math.sin(progress * Math.PI * WAVE2_FREQ + time * WAVE2_TIME_SPEED) * WAVE2_AMP,
        });
      }
      return pts;
    }

    function buildNormals(pts: { x: number; y: number }[]) {
      const last = pts.length - 1;
      return pts.map((_, i) => {
        const dx =
          i === 0
            ? pts[1].x - pts[0].x
            : i === last
            ? pts[last].x - pts[last - 1].x
            : pts[i + 1].x - pts[i - 1].x;
        const dy =
          i === 0
            ? pts[1].y - pts[0].y
            : i === last
            ? pts[last].y - pts[last - 1].y
            : pts[i + 1].y - pts[i - 1].y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        return { nx: -dy / len, ny: dx / len };
      });
    }

    function buildEdges(
      pts: { x: number; y: number }[],
      normals: { nx: number; ny: number }[],
      time: number
    ) {
      const tops = [];
      const bots = [];
      const twists = [];
      for (let i = 0; i <= segmentCount; i++) {
        const twist = Math.cos(
          (i / segmentCount) * Math.PI * twistCycles + time * TWIST_TIME_SPEED
        );
        const w = RIBBON_HALF_W * Math.abs(twist);
        const sign = twist >= 0 ? 1 : -1;
        twists.push(twist);
        tops.push({
          x: pts[i].x + normals[i].nx * w * sign,
          y: pts[i].y + normals[i].ny * w * sign,
        });
        bots.push({
          x: pts[i].x - normals[i].nx * w * sign,
          y: pts[i].y - normals[i].ny * w * sign,
        });
      }
      return { tops, bots, twists };
    }

    function getFoldColor(frac: number, time: number, isDark: boolean) {
      const cycle =
        (((frac * COLOR_CYCLE_FREQ + time * COLOR_CYCLE_SPEED) % 1) + 1) % 1;
      
      const colorA = isDark ? D_COLOR_FOLD_A : L_COLOR_FOLD_A;
      const colorB = isDark ? D_COLOR_FOLD_B : L_COLOR_FOLD_B;
      const colorC = isDark ? D_COLOR_FOLD_C : L_COLOR_FOLD_C;

      if (cycle < 1 / 3) return lerpColor(colorA, colorB, cycle * 3);
      if (cycle < 2 / 3) return lerpColor(colorB, colorC, (cycle - 1 / 3) * 3);
      return lerpColor(colorC, colorA, (cycle - 2 / 3) * 3);
    }

    function getRibbonColor(frac: number, twist: number, time: number, isDark: boolean) {
      const foldColor = getFoldColor(frac, time, isDark);
      const faceColor = isDark ? D_COLOR_FACE : L_COLOR_FACE;
      const facedness = Math.pow(Math.abs(twist), FACE_BLEND_GAMMA);
      return lerpColor(foldColor, faceColor, facedness);
    }

    function drawQuad(
      ax: number,
      ay: number,
      bx: number,
      by: number,
      cx: number,
      cy: number,
      dx: number,
      dy: number
    ) {
      ctx!.beginPath();
      ctx!.moveTo(ax, ay);
      ctx!.lineTo(bx, by);
      ctx!.lineTo(cx, cy);
      ctx!.lineTo(dx, dy);
      ctx!.closePath();
      ctx!.fill();
    }

    function drawShadow(
      tops: { x: number; y: number }[],
      bots: { x: number; y: number }[],
      isDark: boolean
    ) {
      const color = isDark ? D_COLOR_FACE : L_COLOR_FACE;
      ctx!.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${shadowAlpha})`;
      for (let i = 0; i < segmentCount; i++) {
        drawQuad(
          tops[i].x + SHADOW_OFFSET_X,
          tops[i].y + SHADOW_OFFSET_Y,
          tops[i + 1].x + SHADOW_OFFSET_X,
          tops[i + 1].y + SHADOW_OFFSET_Y,
          bots[i + 1].x + SHADOW_OFFSET_X,
          bots[i + 1].y + SHADOW_OFFSET_Y,
          bots[i].x + SHADOW_OFFSET_X,
          bots[i].y + SHADOW_OFFSET_Y
        );
      }
    }

    function drawRibbon(
      tops: { x: number; y: number }[],
      bots: { x: number; y: number }[],
      twists: number[],
      time: number,
      isDark: boolean
    ) {
      const edgeColor = isDark ? D_COLOR_FACE : L_COLOR_FACE;

      for (let i = 0; i < segmentCount; i++) {
        const [r, g, b] = getRibbonColor(
          i / segmentCount,
          twists[i],
          time,
          isDark
        );
        ctx!.fillStyle = `rgb(${r}, ${g}, ${b})`;
        drawQuad(
          tops[i].x,
          tops[i].y,
          tops[i + 1].x,
          tops[i + 1].y,
          bots[i + 1].x,
          bots[i + 1].y,
          bots[i].x,
          bots[i].y
        );

        if (Math.abs(twists[i]) > EDGE_MIN_TWIST) {
          ctx!.strokeStyle = `rgba(${edgeColor[0]}, ${edgeColor[1]}, ${edgeColor[2]}, ${edgeAlpha})`;
          ctx!.lineWidth = EDGE_WEIGHT;
          ctx!.beginPath();
          ctx!.moveTo(tops[i].x, tops[i].y);
          ctx!.lineTo(tops[i + 1].x, tops[i + 1].y);
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.moveTo(bots[i].x, bots[i].y);
          ctx!.lineTo(bots[i + 1].x, bots[i + 1].y);
          ctx!.stroke();
        }
      }
    }

    const systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const finalTime =
      waveSpeed * Math.max(1, motionDuration / (1000 / 60));
    let animationStartedAt: number | null = null;
    let previousTimestamp: number | null = null;
    let isInViewport = true;

    function isDarkTheme() {
      const explicitTheme = document.documentElement.dataset.theme;
      return explicitTheme === "dark" ||
        (explicitTheme !== "light" && systemDarkQuery.matches);
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const isDark = isDarkTheme();

      const pts = buildSpine(t);
      const normals = buildNormals(pts);
      const { tops, bots, twists } = buildEdges(pts, normals, t);

      drawShadow(tops, bots, isDark);
      drawRibbon(tops, bots, twists, t, isDark);
    }

    function render(timestamp: number) {
      animationFrameId = 0;

      if (continuous) {
        const frameScale = previousTimestamp
          ? Math.min((timestamp - previousTimestamp) / (1000 / 60), 4)
          : 1;
        previousTimestamp = timestamp;
        t += waveSpeed * frameScale;
        draw();

        if (!document.hidden && isInViewport) {
          animationFrameId = requestAnimationFrame(render);
        }
        return;
      }

      if (animationStartedAt === null) animationStartedAt = timestamp;
      const progress = Math.min(
        (timestamp - animationStartedAt) / Math.max(motionDuration, 1),
        1
      );
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      t = finalTime * easedProgress;
      draw();

      if (progress < 1) animationFrameId = requestAnimationFrame(render);
    }

    function startMotion() {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      animationStartedAt = null;
      previousTimestamp = null;

      if (reducedMotionQuery.matches || motionDuration <= 0) {
        t = finalTime;
        draw();
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function syncPlayback() {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      previousTimestamp = null;

      if (document.hidden || !isInViewport) return;
      startMotion();
    }

    function refreshTheme() {
      refreshColors();
      draw();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      syncPlayback();
    });
    const themeObserver = new MutationObserver(refreshTheme);

    refreshColors();
    resize();
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    systemDarkQuery.addEventListener("change", refreshTheme);
    reducedMotionQuery.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    startMotion();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      systemDarkQuery.removeEventListener("change", refreshTheme);
      reducedMotionQuery.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [
    segments,
    waveSpeed,
    waveAmplitude,
    twistCycles,
    lightColors,
    darkColors,
    motionDuration,
    continuous,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "twisting-ribbon relative h-full w-full overflow-hidden rounded-[12px]",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}

export default TwistingRibbon;
