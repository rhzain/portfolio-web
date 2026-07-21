'use client';

import * as React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

type GradientBackgroundProps = HTMLMotionProps<'div'>;

const EDGE_MOTION_MASK =
  'radial-gradient(ellipse at center, rgb(0 0 0 / 22%) 0%, rgb(0 0 0 / 36%) 44%, black 78%)';
const NOISE_TEXTURE =
  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22 result=%22grain%22/%3E%3CfeColorMatrix in=%22grain%22 type=%22matrix%22 values=%220 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .333 .333 .333 0 0%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")';

function GradientBackground({
  className,
  transition = { duration: 12, ease: 'easeInOut', repeat: Infinity },
  ...props
}: GradientBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const duration =
    typeof transition.duration === 'number' ? transition.duration : 12;

  return (
    <motion.div
      data-slot="gradient-background"
      className={cn(
        'relative size-full overflow-hidden bg-[var(--color-paper-2)]',
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: EDGE_MOTION_MASK,
          maskImage: EDGE_MOTION_MASK,
        }}
      >
        <motion.div
          className="absolute left-[-30vmax] top-[-35vmax] size-[90vmax] will-change-transform bg-[radial-gradient(ellipse_at_center,var(--color-gradient-light)_0%,transparent_68%)]"
          animate={
            shouldReduceMotion
              ? { x: '6vw', y: '16vh', scaleX: 1.08, scaleY: 0.92 }
              : {
                  x: ['-8vw', '64vw', '68vw', '18vw', '-8vw'],
                  y: ['-10vh', '-8vh', '54vh', '58vh', '-10vh'],
                  scaleX: [1.08, 1.3, 0.9, 1.18, 1.08],
                  scaleY: [0.92, 0.78, 1.24, 0.88, 0.92],
                  rotate: [-8, 11, -4, 7, -8],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { ...transition, duration: duration * 1.15 }
          }
        />

        <motion.div
          className="absolute right-[-32vmax] top-[-22vmax] size-[86vmax] will-change-transform bg-[radial-gradient(ellipse_at_center,var(--color-gradient-dark)_0%,transparent_64%)]"
          animate={
            shouldReduceMotion
              ? { x: '-8vw', y: '20vh', scaleX: 0.94, scaleY: 1.12 }
              : {
                  x: ['0vw', '-14vw', '-6vw', '-20vw', '0vw'],
                  y: ['-8vh', '34vh', '62vh', '18vh', '-8vh'],
                  scaleX: [0.94, 1.2, 0.82, 1.26, 0.94],
                  scaleY: [1.12, 0.86, 1.28, 0.8, 1.12],
                  rotate: [7, -13, 5, -6, 7],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { ...transition, duration: duration * 1.4 }
          }
        />

        <motion.div
          className="absolute bottom-[-30vmax] left-[5vw] size-[74vmax] will-change-transform bg-[radial-gradient(ellipse_at_center,var(--color-paper-3)_0%,transparent_62%)]"
          animate={
            shouldReduceMotion
              ? { x: '8vw', y: '-8vh', scaleX: 1.16, scaleY: 0.86 }
              : {
                  x: ['-28vw', '8vw', '38vw', '18vw', '-28vw'],
                  y: ['8vh', '-10vh', '4vh', '-18vh', '8vh'],
                  scaleX: [1.16, 0.86, 1.28, 0.96, 1.16],
                  scaleY: [0.86, 1.22, 0.82, 1.18, 0.86],
                  rotate: [-3, 9, -11, 4, -3],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { ...transition, duration: duration * 0.9 }
          }
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-[var(--soft-light)] opacity-[var(--gradient-noise-opacity)]"
        style={{
          WebkitMaskImage: NOISE_TEXTURE,
          WebkitMaskSize:
            'var(--gradient-noise-size) var(--gradient-noise-size)',
          maskImage: NOISE_TEXTURE,
          maskSize: 'var(--gradient-noise-size) var(--gradient-noise-size)',
        }}
      />
    </motion.div>
  );
}

export { GradientBackground, type GradientBackgroundProps };
