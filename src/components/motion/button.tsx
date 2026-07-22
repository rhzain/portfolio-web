"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import {
  forwardRef,
  useState,
  useRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/ease";

export interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  pressScale?: number;
  ripple?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      pressScale = 0.94,
      ripple = true,
      href,
      target,
      rel,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();
    const [ripples, setRipples] = useState<RippleEffect[]>([]);
    const buttonRef = useRef<HTMLElement | null>(null);

    const handlePointerDown = (e: MouseEvent<HTMLElement>) => {
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      onClick?.(e as MouseEvent<HTMLButtonElement>);
    };

    const variantStyles = {
      primary: "bg-[var(--color-accent)] color-[var(--color-accent-ink)] border-transparent shadow-md hover:brightness-105",
      secondary: "bg-[var(--color-paper-2)] color-[var(--color-ink)] border border-[var(--color-rule)] shadow-sm hover:bg-[var(--color-paper-3)]",
      outline: "bg-transparent color-[var(--color-ink)] border border-[var(--color-rule)] hover:border-[var(--color-accent)] hover:color-[var(--color-accent)]",
      ghost: "bg-transparent color-[var(--color-ink-2)] border-transparent hover:bg-[var(--color-paper-2)] hover:color-[var(--color-ink)]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
      md: "h-10 px-4 text-sm gap-2 rounded-xl",
      lg: "h-12 px-6 text-base gap-2.5 rounded-2xl",
      icon: "h-10 w-10 p-0 items-center justify-center rounded-full shrink-0",
    };

    const baseClass = cn(
      "relative inline-flex items-center justify-center font-medium overflow-hidden select-none transition-colors outline-none cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const motionProps = {
      whileHover: reduceMotion ? {} : { y: -1, scale: 1.01 },
      whileTap: reduceMotion ? {} : { scale: pressScale, y: 1 },
      transition: { type: "spring" as const, stiffness: 450, damping: 25, mass: 0.6 },
    };

    const renderRipples = () => (
      <AnimatePresence aria-hidden="true">
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            style={{
              position: "absolute",
              top: r.y - 25,
              left: r.x - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    );

    if (href) {
      const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <motion.a
          ref={(node) => {
            buttonRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as unknown as { current: HTMLElement | null }).current = node;
          }}
          href={href}
          target={target}
          rel={rel}
          onMouseDown={handlePointerDown}
          onClick={handleClick}
          className={baseClass}
          whileHover={motionProps.whileHover}
          whileTap={motionProps.whileTap}
          transition={motionProps.transition}
          {...(anchorProps as HTMLMotionProps<"a">)}
        >
          {renderRipples()}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as unknown as { current: HTMLElement | null }).current = node;
        }}
        onMouseDown={handlePointerDown}
        onClick={handleClick}
        className={baseClass}
        whileHover={motionProps.whileHover}
        whileTap={motionProps.whileTap}
        transition={motionProps.transition}
        {...(props as HTMLMotionProps<"button">)}
      >
        {renderRipples()}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  magneticClassName?: string;
}

export function MagneticButton({
  strength = 0.3,
  magneticClassName,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", magneticClassName)}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}

export type ButtonState = "idle" | "loading" | "success" | "error";

export interface StatefulButtonProps extends ButtonProps {
  state?: ButtonState;
  loadingText?: ReactNode;
  successText?: ReactNode;
  errorText?: ReactNode;
  icon?: ReactNode;
}

export function StatefulButton({
  state = "idle",
  loadingText = "Loading",
  successText = "Done",
  errorText = "Try again",
  icon,
  children,
  ...props
}: StatefulButtonProps) {
  return (
    <Button {...props}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="inline-flex items-center gap-2"
        >
          {state === "idle" && (
            <>
              {children}
              {icon}
            </>
          )}
          {state === "loading" && <span>{loadingText}</span>}
          {state === "success" && <span>{successText}</span>}
          {state === "error" && <span>{errorText}</span>}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
