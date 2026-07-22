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
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  triggerMode: "click" | "hover";
  show: () => void;
  hide: () => void;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: "click" | "hover";
  side?: "top" | "bottom";
  align?: "start" | "end" | "center";
  sideOffset?: number;
  gooStrength?: number;
  children: ReactNode;
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const show = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(true);
  }, [setOpen]);

  const hide = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (trigger === "hover") {
      hoverTimer.current = setTimeout(() => setOpen(false), 150);
    } else {
      setOpen(false);
    }
  }, [trigger, setOpen]);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentId = useId();

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        contentId,
        triggerMode: trigger,
        show,
        hide,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps {
  children: ReactElement;
  className?: string;
}

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("PopoverTrigger must be used inside Popover");

  const { open, setOpen, triggerRef, contentId, triggerMode, show, hide } = ctx;

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(e) => {
        if (triggerMode === "click") {
          e.stopPropagation();
          setOpen(!open);
        }
      }}
      onMouseEnter={() => {
        if (triggerMode === "hover") show();
      }}
      onMouseLeave={() => {
        if (triggerMode === "hover") hide();
      }}
      onFocus={() => {
        if (triggerMode === "hover") show();
      }}
      onBlur={() => {
        if (triggerMode === "hover") hide();
      }}
      className={cn("inline-flex items-center justify-center outline-none cursor-pointer", className)}
    >
      {children}
    </button>
  );
}

export interface PopoverContentProps {
  side?: "top" | "bottom";
  align?: "start" | "end" | "center";
  sideOffset?: number;
  className?: string;
  children: ReactNode;
}

export function PopoverContent({
  side = "bottom",
  align = "end",
  sideOffset = 12,
  className,
  children,
}: PopoverContentProps) {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("PopoverContent must be used inside Popover");

  const { open, setOpen, triggerRef, contentId, triggerMode, show, hide } = ctx;
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
    if (triggerMode === "click") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
      if (triggerMode === "click") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, updateCoords, setOpen, triggerMode, triggerRef]);

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

  return (
    <>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && coords ? (
                <div
                  ref={panelRef}
                  id={contentId}
                  onMouseEnter={() => {
                    if (triggerMode === "hover") show();
                  }}
                  onMouseLeave={() => {
                    if (triggerMode === "hover") hide();
                  }}
                  style={{
                    position: "fixed",
                    top: coords.top,
                    left: coords.left,
                  }}
                  className={cn("z-[9999]", transformClass)}
                >
                  {/* Gooey Filter liquid neck container */}
                  <motion.div
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.6,
                            y: side === "bottom" ? -18 : 18,
                          }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }
                    }
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.7,
                            y: side === "bottom" ? -10 : 10,
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 22,
                      mass: 0.7,
                    }}
                    className={cn(
                      "rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper)] p-2 shadow-2xl backdrop-blur-xl",
                      className
                    )}
                  >
                    {children}
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
