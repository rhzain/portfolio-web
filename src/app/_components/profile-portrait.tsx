"use client";

import Image from "next/image";
import confetti from "canvas-confetti";
import { motion, useReducedMotion } from "motion/react";
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/ease";

const HOLD_DURATION = 5;
const TRANSITION_DURATION = 0.36;
const REDUCED_TRANSITION_DURATION = 0.15;
const TRACE_PATH_LENGTH = 1350.262;

export type ProfilePortraitHandle = {
  reset: () => void;
};

export const ProfilePortrait = forwardRef<ProfilePortraitHandle, { name: string; onSmile?: () => void }>(
  ({ name, onSmile }, ref) => {
  const reduceMotion = useReducedMotion();
  const [isHolding, setIsHolding] = useState(false);
  const [isSmiling, setIsSmiling] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldLoadSmile, setShouldLoadSmile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const swapTimer = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      for (const timer of [
        swapTimer.current,
        finishTimer.current,
      ]) {
        if (timer !== null) window.clearTimeout(timer);
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (!isSmiling) return;
      const transitionDur = reduceMotion ? REDUCED_TRANSITION_DURATION : TRANSITION_DURATION;
      
      setIsTransitioning(true);

      swapTimer.current = window.setTimeout(() => {
        swapTimer.current = null;
        setIsSmiling(false);
      }, transitionDur * 450);

      finishTimer.current = window.setTimeout(() => {
        finishTimer.current = null;
        setIsTransitioning(false);
      }, transitionDur * 1000);
    }
  }));

  const cancelHold = () => {
    setIsHolding(false);
  };

  const startHold = () => {
    if (isHolding || isSmiling || isTransitioning) return;

    setShouldLoadSmile(true);
    setIsHolding(true);
  };

  const completeHold = () => {
    if (!isHolding || isSmiling || isTransitioning) return;

    const transitionDuration = reduceMotion
      ? REDUCED_TRANSITION_DURATION
      : TRANSITION_DURATION;

    setIsHolding(false);
    setIsTransitioning(true);

    swapTimer.current = window.setTimeout(() => {
      swapTimer.current = null;
      setIsSmiling(true);
      if (onSmile) onSmile();
      if (!reduceMotion) {
        let originX = 0.5;
        let originY = 0.6;
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          originX = (rect.left + rect.width / 2) / window.innerWidth;
          originY = (rect.top + rect.height) / window.innerHeight;
        }

        confetti({
          particleCount: 80,
          spread: 180,
          angle: 270,
          origin: { x: originX, y: originY },
          startVelocity: 25,
          gravity: 0.8,
        });
      }
    }, transitionDuration * 450);

    finishTimer.current = window.setTimeout(() => {
      finishTimer.current = null;
      setIsTransitioning(false);
    }, transitionDuration * 1000);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    startHold();
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    cancelHold();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) {
      event.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      cancelHold();
    }
  };

  const transitionDuration = reduceMotion
    ? REDUCED_TRANSITION_DURATION
    : TRANSITION_DURATION;

  return (
    <button
      ref={buttonRef}
      type="button"
      className="identity-mark"
      aria-label={
        isSmiling
          ? `Smiling portrait of ${name}`
          : `Hold for five seconds to reveal a smiling portrait of ${name}`
      }
      aria-pressed={isSmiling}
      disabled={isSmiling || isTransitioning}
      data-smiling={isSmiling}
      style={{ overflow: "visible" }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={cancelHold}
      onPointerLeave={cancelHold}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={cancelHold}
    >
      <Image
        className="identity-portrait identity-portrait-default"
        src="/pp.jpg"
        alt=""
        fill
        preload
        quality={85}
        draggable={false}
        sizes="(min-width: 61rem) 11rem, (min-width: 40rem) 18vw, 8rem"
        style={{
          objectFit: "cover",
          objectPosition: "50% 46%",
          opacity: isSmiling ? 0 : 1,
          borderRadius: "calc(var(--radius-card) - 1px)",
          pointerEvents: "none",
          transition: "opacity var(--dur-fast) var(--ease-out)",
        }}
      />
      {shouldLoadSmile ? (
        <Image
          className="identity-portrait identity-portrait-smile"
          src="/pp-smile.jpg"
          alt=""
          fill
          loading="eager"
          quality={85}
          draggable={false}
          sizes="(min-width: 61rem) 11rem, (min-width: 40rem) 18vw, 8rem"
          style={{
            objectFit: "cover",
            objectPosition: "50% 46%",
            opacity: isSmiling ? 1 : 0,
            borderRadius: "calc(var(--radius-card) - 1px)",
            pointerEvents: "none",
            transition: "opacity var(--dur-fast) var(--ease-out)",
          }}
        />
      ) : null}

      <svg
        className="identity-portrait-progress"
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 2,
          inset: "-4px -3px",
          width: "calc(100% + 6px)",
          height: "calc(100% + 8px)",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <motion.path
          d="M 150 3 H 282 A 15 15 0 0 1 297 18 V 382 A 15 15 0 0 1 282 397 H 18 A 15 15 0 0 1 3 382 V 18 A 15 15 0 0 1 18 3 H 150"
          fill="none"
          stroke="var(--color-ink)"
          strokeLinecap="butt"
          strokeDasharray={`${TRACE_PATH_LENGTH} ${TRACE_PATH_LENGTH}`}
          style={{ strokeWidth: 4.25, vectorEffect: "none" }}
          initial={false}
          animate={{
            strokeDashoffset: isHolding ? 0 : TRACE_PATH_LENGTH,
            opacity: isHolding ? 1 : 0,
          }}
          transition={
            isHolding
              ? {
                  strokeDashoffset: {
                    duration: HOLD_DURATION,
                    ease: "linear",
                  },
                  opacity: { duration: 0.12, ease: EASE_OUT },
                }
              : { duration: 0.12, ease: EASE_OUT }
          }
          onAnimationComplete={completeHold}
        />
      </svg>

      <motion.span
        className="identity-portrait-flash"
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 2,
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "var(--radius-card)",
          background: "var(--color-image-flash)",
          pointerEvents: "none",
        }}
        initial={false}
        animate={isTransitioning ? { opacity: [0, 0.82, 0] } : { opacity: 0 }}
        transition={
          isTransitioning
            ? {
                duration: transitionDuration,
                ease: EASE_IN_OUT,
                times: [0, 0.45, 1],
              }
            : { duration: 0 }
        }
      />

      <span className="sr-only" aria-live="polite">
        {isSmiling ? "Smiling portrait revealed." : ""}
      </span>
    </button>
  );
});
ProfilePortrait.displayName = "ProfilePortrait";
