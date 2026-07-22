"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type ReactElement,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface MorphPopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
}

const MorphPopoverContext = createContext<MorphPopoverContextType | null>(null);

export interface MorphPopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function MorphPopover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: MorphPopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentId = useId();

  return (
    <MorphPopoverContext.Provider
      value={{ open, setOpen, triggerRef, contentId }}
    >
      {children}
    </MorphPopoverContext.Provider>
  );
}

export interface MorphPopoverTriggerProps {
  children: ReactElement;
  className?: string;
}

export function MorphPopoverTrigger({ children, className }: MorphPopoverTriggerProps) {
  const ctx = useContext(MorphPopoverContext);
  if (!ctx) throw new Error("MorphPopoverTrigger must be used inside MorphPopover");

  const { open, setOpen, triggerRef, contentId } = ctx;

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(!open);
      }}
      className={cn("inline-flex items-center justify-center outline-none cursor-pointer select-none", className)}
    >
      {children}
    </button>
  );
}

export interface MorphPopoverContentProps {
  side?: "top" | "bottom";
  align?: "start" | "end" | "center";
  sideOffset?: number;
  className?: string;
  children: ReactNode;
}

export function MorphPopoverContent({
  side = "bottom",
  align = "end",
  sideOffset = 8,
  className,
  children,
}: MorphPopoverContentProps) {
  const ctx = useContext(MorphPopoverContext);
  if (!ctx) throw new Error("MorphPopoverContent must be used inside MorphPopover");

  const { open, setOpen, triggerRef, contentId } = ctx;
  const reduceMotion = useReducedMotion();
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    
    const top = side === "bottom" ? r.bottom + sideOffset : r.top - sideOffset;
    let left = r.left;

    if (align === "center") {
      left = r.left + r.width / 2;
    } else if (align === "end") {
      left = r.right;
    }

    setCoords({ top, left });
  }, [side, align, sideOffset, triggerRef]);

  useEffect(() => {
    if (!open) return;
    updateCoords();

    const handleScrollOrResize = () => updateCoords();
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, updateCoords, setOpen, triggerRef]);

  const transformClass =
    align === "center"
      ? side === "bottom"
        ? "-translate-x-1/2"
        : "-translate-x-1/2 -translate-y-full"
      : align === "end"
      ? side === "bottom"
        ? "-translate-x-full"
        : "-translate-x-full -translate-y-full"
      : side === "bottom"
      ? ""
      : "-translate-y-full";

  // Morph origin direction
  const originY = side === "bottom" ? "top" : "bottom";
  const originX = align === "end" ? "right" : align === "start" ? "left" : "center";

  return (
    <>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence aria-live="polite">
              {open && coords ? (
                <div
                  ref={panelRef}
                  id={contentId}
                  style={{
                    position: "fixed",
                    top: coords.top,
                    left: coords.left,
                  }}
                  className={cn("z-[9999]", transformClass)}
                >
                  {/* Single-surface corner morph container */}
                  <motion.div
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.2,
                            borderRadius: "50px",
                            filter: "blur(6px)",
                          }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 1,
                            scale: 1,
                            borderRadius: "20px",
                            filter: "blur(0px)",
                          }
                    }
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.3,
                            borderRadius: "40px",
                            filter: "blur(4px)",
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 26,
                      mass: 0.6,
                    }}
                    style={{ transformOrigin: `${originY} ${originX}` }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 shadow-2xl backdrop-blur-xl transition-colors duration-200",
                      className
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: side === "bottom" ? -6 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: side === "bottom" ? -4 : 4 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      {children}
                    </motion.div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
