"use client";

// Adapted from beui.dev/components/motion/theme-toggle (MIT).
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import {
  useSyncExternalStore,
  type ComponentPropsWithoutRef,
} from "react";

export type ThemeVariant = "rectangle" | "circle" | "circle-blur";

export type RectStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "bottom-up";

export interface ThemeToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> {
  variant?: ThemeVariant;
  start?: RectStart;
  iconClassName?: string;
}

const RECT_FROM: Record<RectStart, string> = {
  "top-left": "inset(0 100% 100% 0)",
  "top-right": "inset(0 0 100% 100%)",
  "bottom-left": "inset(100% 100% 0 0)",
  "bottom-right": "inset(100% 0 0 100%)",
  center: "inset(50% 50% 50% 50%)",
  "bottom-up": "inset(100% 0 0 0)",
};

const CIRCLE_ORIGIN: Record<RectStart, string> = {
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
  center: "50% 50%",
  "bottom-up": "50% 100%",
};

const subscribe = () => () => undefined;

export function useThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
}: { variant?: ThemeVariant; start?: RectStart } = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const nextTheme = isDark ? "light" : "dark";

    if (reduceMotion || !("startViewTransition" in document)) {
      setTheme(nextTheme);
      return;
    }

    const root = document.documentElement;

    if (variant === "rectangle") {
      root.style.setProperty("--beui-vt-from", RECT_FROM[start]);
      root.dataset.beuiVt = "rect";
    } else {
      root.style.setProperty("--beui-vt-origin", CIRCLE_ORIGIN[start]);
      root.dataset.beuiVt = variant;
    }

    const transition = (
      document as Document & {
        startViewTransition(update: () => void): { finished: Promise<void> };
      }
    ).startViewTransition(() => setTheme(nextTheme));

    transition.finished.finally(() => {
      delete root.dataset.beuiVt;
    });
  };

  return { isDark, mounted, toggle };
}

export function ThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
  className,
  iconClassName,
  disabled,
  ...rest
}: ThemeToggleProps) {
  const { isDark, mounted, toggle } = useThemeToggle({ variant, start });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
      data-state={isDark ? "dark" : "light"}
      disabled={!mounted || disabled}
      onClick={toggle}
      {...rest}
    >
      <span className="theme-toggle-icon-slot" aria-hidden="true">
        {mounted ? (
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="theme-toggle-icon-motion"
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, scale: 0.7, filter: "blur(4px)" }
              }
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.7, filter: "blur(4px)" }
              }
              key={isDark ? "dark" : "light"}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              {isDark ? (
                <Sun className={iconClassName} />
              ) : (
                <Moon className={iconClassName} />
              )}
            </motion.span>
          </AnimatePresence>
        ) : null}
      </span>
    </button>
  );
}
