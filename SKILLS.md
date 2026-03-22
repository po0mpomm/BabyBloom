# 🚀 WORLD-CLASS LIGHT THEME SAAS WEBSITE — COMPLETE SKILL GUIDE

> A complete, production-ready reference for building Apple-caliber SaaS websites with
> cutting-edge animations, scroll effects, Web3 aesthetics, and modern UI in a light theme.
> This is your single source of truth — design system, libraries, code patterns, and rules.

---

## TABLE OF CONTENTS

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Technology Stack](#4-technology-stack)
5. [Animation & Motion Library](#5-animation--motion-library)
6. [Scroll Effects System](#6-scroll-effects-system)
7. [UI Component Libraries](#7-ui-component-libraries)
8. [Web3 & Modern Visual Effects](#8-web3--modern-visual-effects)
9. [Layout & Spacing System](#9-layout--spacing-system)
10. [Page Structure Blueprint](#10-page-structure-blueprint)
11. [Component Patterns](#11-component-patterns)
12. [Performance Rules](#12-performance-rules)
13. [Complete Code Examples](#13-complete-code-examples)
14. [Deployment Checklist](#14-deployment-checklist)

---

## 1. DESIGN PHILOSOPHY

### The Apple Principle
Apple's websites work because of **restraint + precision + motion**. Every pixel is intentional.
Every animation has a purpose. White space is used aggressively. The product is the hero.

### The 5 Laws of World-Class SaaS Design

**Law 1 — Hierarchy Over Decoration**
Every element must have a clear visual weight. Hero headline = largest. CTA = most contrasted.
Supporting text = muted. Nothing competes. Nothing is decorative without function.

**Law 2 — Motion Has Meaning**
Animations reveal information, guide attention, or confirm interactions. Never animate just
because you can. Every motion must answer: "What does this teach the user?"

**Law 3 — Light ≠ White**
A light theme is NOT a white background with black text. It uses tinted whites, warm off-whites,
subtle gradients, layered translucency, and carefully tinted shadows.

**Law 4 — Depth Through Layering**
Create the illusion of depth using: layered cards, frosted glass, subtle shadows with color,
blurred backgrounds behind foreground elements, and z-indexed overlapping sections.

**Law 5 — Typography IS Design**
On world-class SaaS sites, the font choice alone signals quality. Use editorial, modern, or
geometric sans-serifs. The heading font must be distinctive. Never use Inter or Roboto.

### Forbidden Anti-Patterns

- ❌ White background + pink/purple gradient as accent (overused)
- ❌ Inter font (too generic)
- ❌ Generic hero with "hero image on right, text on left" only
- ❌ Flat cards with no depth
- ❌ Animations that run on every scroll without purpose
- ❌ Color palettes with more than 3 primary colors
- ❌ Font sizes below 15px for body text
- ❌ Borders with full opacity (use 10-20% opacity borders)

---

## 2. COLOR SYSTEM

### Approved Light Theme Palettes (NOT white + pink)

Choose ONE palette and apply it consistently across the entire site.

---

#### PALETTE A — "Stone & Slate" (Premium Neutral)
```css
:root {
  /* Backgrounds — layered warm neutrals */
  --bg-primary:    #F5F4F0;   /* Warm stone white — base canvas */
  --bg-secondary:  #EDECEA;   /* Slightly deeper, for card backgrounds */
  --bg-elevated:   #FFFFFF;   /* Pure white for floating cards */
  --bg-sunken:     #E8E6E1;   /* Sunken/inset areas */

  /* Text */
  --text-primary:  #1A1917;   /* Near black with warm tint */
  --text-secondary:#57534E;   /* Medium warm gray */
  --text-muted:    #A8A29E;   /* Muted labels, captions */
  --text-inverse:  #FAFAF9;   /* On dark backgrounds */

  /* Brand Accents */
  --accent-primary: #0F4C75;  /* Deep navy blue */
  --accent-hover:   #1B6CA8;  /* Lighter navy on hover */
  --accent-soft:    #EFF6FF;  /* Very light blue tint for tags/chips */
  --accent-glow:    rgba(15, 76, 117, 0.15); /* For glow effects */

  /* Semantic */
  --success:  #16A34A;
  --warning:  #D97706;
  --error:    #DC2626;
  --info:     #0369A1;

  /* Borders & Dividers */
  --border-default:  rgba(26, 25, 23, 0.08);
  --border-strong:   rgba(26, 25, 23, 0.16);
  --border-accent:   rgba(15, 76, 117, 0.25);

  /* Shadows — always tinted, never pure black */
  --shadow-sm:  0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
  --shadow-md:  0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
  --shadow-lg:  0 16px 48px rgba(15,23,42,0.10), 0 4px 16px rgba(15,23,42,0.06);
  --shadow-xl:  0 32px 80px rgba(15,23,42,0.12), 0 8px 24px rgba(15,23,42,0.08);
  --shadow-accent: 0 8px 32px rgba(15, 76, 117, 0.20);
}
```

---

#### PALETTE B — "Sage & Charcoal" (Natural Premium)
```css
:root {
  --bg-primary:    #F4F5F0;   /* Slightly green-tinted white */
  --bg-secondary:  #ECEDE8;
  --bg-elevated:   #FFFFFF;
  --text-primary:  #1C1F1A;
  --text-secondary:#4A5240;
  --text-muted:    #8A9280;
  --accent-primary: #2D5016;  /* Deep forest green */
  --accent-hover:   #3D6B20;
  --accent-soft:    #F0F4EB;
  --border-default: rgba(28,31,26,0.08);
  --shadow-md: 0 4px 16px rgba(28,31,26,0.08);
}
```

---

#### PALETTE C — "Slate & Amber" (Modern Tech)
```css
:root {
  --bg-primary:    #F6F7F9;   /* Cool blue-gray white */
  --bg-secondary:  #EDEEF2;
  --bg-elevated:   #FFFFFF;
  --text-primary:  #0F172A;   /* Deep slate */
  --text-secondary:#475569;
  --text-muted:    #94A3B8;
  --accent-primary: #B45309;  /* Deep amber */
  --accent-hover:   #D97706;
  --accent-soft:    #FFFBEB;
  --border-default: rgba(15,23,42,0.08);
  --shadow-md: 0 4px 16px rgba(15,23,42,0.08);
}
```

---

#### PALETTE D — "Frost & Indigo" (Web3 / Tech)
```css
:root {
  --bg-primary:    #F8F9FC;   /* Ice white with blue undertone */
  --bg-secondary:  #F0F2F8;
  --bg-elevated:   #FFFFFF;
  --text-primary:  #0D0F1A;
  --text-secondary:#3D4166;
  --text-muted:    #8B90B0;
  --accent-primary: #3730A3;  /* Deep indigo */
  --accent-secondary: #6D28D9; /* Violet for gradient pairs */
  --accent-hover:   #4338CA;
  --accent-soft:    #EEF2FF;
  --border-default: rgba(13,15,26,0.08);
  --shadow-md: 0 4px 16px rgba(55,48,163,0.10);
  --shadow-accent: 0 8px 32px rgba(55,48,163,0.20);
}
```

### Gradient Definitions (Use sparingly, max 2 per page)
```css
/* Hero gradient background */
--gradient-hero: radial-gradient(
  ellipse 80% 60% at 50% -10%,
  rgba(55,48,163,0.08) 0%,
  transparent 70%
);

/* Accent gradient for CTAs and highlights */
--gradient-accent: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));

/* Card shimmer gradient (used in hover states) */
--gradient-shimmer: linear-gradient(
  105deg,
  transparent 40%,
  rgba(255,255,255,0.6) 50%,
  transparent 60%
);

/* Text gradient for headings */
--gradient-text: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%);
```

---

## 3. TYPOGRAPHY SYSTEM

### Approved Font Pairings (2026 Modern)

These fonts signal quality, are highly readable, and are distinct from generic choices.

---

#### PAIRING 1 — "Editorial Power" (Recommended for SaaS)
```css
/* Display / Headings */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
/* OR */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

/* Body / UI */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

:root {
  --font-display: 'Instrument Serif', 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
}
```

#### PAIRING 2 — "Geometric Precision" (Clean Tech)
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

:root {
  --font-display: 'Syne', sans-serif;          /* Ultra-modern geometric */
  --font-body:    'Plus Jakarta Sans', sans-serif; /* Clean, readable */
}
```

#### PAIRING 3 — "Modern Grotesque" (Apple-adjacent)
```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');

:root {
  --font-display: 'Bricolage Grotesque', sans-serif;  /* Editorial grotesque */
  --font-body:    'Geist', sans-serif;                /* Vercel's font — ultra clean */
}
```

#### PAIRING 4 — "Luxury Editorial" (Premium SaaS)
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

:root {
  --font-display: 'Cormorant Garamond', serif;  /* High-end editorial */
  --font-body:    'Cabinet Grotesk', sans-serif; /* Modern grotesque */
}
```

### Type Scale (Tailwind CSS classes)
```
Hero Headline:      text-7xl / text-8xl  (72px–96px)  — font-display, font-semibold/bold
Section Heading:    text-5xl / text-6xl  (48px–60px)  — font-display
Card Title:         text-2xl / text-3xl  (24px–30px)  — font-display or font-body semibold
Subheading:         text-xl              (20px)        — font-body, font-medium
Body Large:         text-lg              (18px)        — font-body, font-normal
Body Default:       text-base            (16px)        — font-body, font-normal
Caption / Label:    text-sm              (14px)        — font-body, tracking-wide
Micro / Tag:        text-xs              (12px)        — font-body, uppercase, tracking-widest
```

### Line Height & Letter Spacing
```css
/* Headlines — tight, impactful */
.heading-tight { line-height: 1.05; letter-spacing: -0.04em; }

/* Section headings — balanced */
.heading-balance { line-height: 1.15; letter-spacing: -0.02em; }

/* Body text — readable */
.body-text { line-height: 1.7; letter-spacing: -0.01em; }

/* Captions / tags — airy */
.caption-text { line-height: 1.5; letter-spacing: 0.04em; }
```

---

## 4. TECHNOLOGY STACK

### Complete Stack for Vercel Deployment

```
Framework:        Next.js 14+ (App Router)
Language:         TypeScript
Styling:          Tailwind CSS 3.4+
UI Components:    shadcn/ui + Radix UI
Animation:        Framer Motion 11 + GSAP 3 + Lenis (smooth scroll)
3D/WebGL:         Three.js OR Spline (drag-and-drop 3D)
Icons:            Lucide React + Phosphor Icons
Fonts:            Google Fonts (next/font for optimization)
Charts:           Recharts OR Victory
State:            Zustand (lightweight) OR Jotai
Forms:            React Hook Form + Zod
HTTP:             Axios + TanStack Query (caching/loading states)
Database:         MongoDB Atlas + Mongoose
Auth:             NextAuth.js v5
Files:            Cloudinary
Deploy:           Vercel
```

### Install Command (copy-paste ready)
```bash
# Create project
npx create-next-app@latest myapp --typescript --tailwind --app --eslint

cd myapp

# Core animation & scroll
npm install framer-motion gsap @studio-freight/lenis

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
npx shadcn@latest init
npx shadcn@latest add button card input badge dialog sheet tooltip

# Icons
npm install lucide-react @phosphor-icons/react

# 3D (optional, powerful)
npm install @splinetool/react-spline @splinetool/runtime

# OR Three.js
npm install three @types/three @react-three/fiber @react-three/drei

# Utilities
npm install clsx tailwind-merge class-variance-authority

# Data & Forms
npm install react-hook-form zod @hookform/resolvers
npm install axios @tanstack/react-query

# Visual effects
npm install canvas-confetti react-hot-toast

# Types
npm install -D @types/canvas-confetti
```

### tailwind.config.ts — Extended Configuration
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg: {
          primary:   'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated:  'var(--bg-elevated)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover:   'var(--accent-hover)',
          soft:    'var(--accent-soft)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          strong:  'var(--border-strong)',
        },
      },
      boxShadow: {
        'sm':     'var(--shadow-sm)',
        'md':     'var(--shadow-md)',
        'lg':     'var(--shadow-lg)',
        'xl':     'var(--shadow-xl)',
        'accent': 'var(--shadow-accent)',
        // Layered soft shadow (Apple style)
        'apple': '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'spin-slow':   'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'gradient':    'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        '200%': '200% 200%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
```

---

## 5. ANIMATION & MOTION LIBRARY

### Framer Motion — Core Patterns

#### Page Transition Wrapper
```typescript
// components/PageTransition.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)',
             transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }},
  exit:    { opacity: 0, y: -12, filter: 'blur(2px)',
             transition: { duration: 0.3, ease: 'easeIn' }},
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

#### Scroll-Reveal Component (Universal)
```typescript
// components/ScrollReveal.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  blur?: boolean
  className?: string
}

const directionMap = {
  up:    { y: 40, x: 0 },
  down:  { y: -40, x: 0 },
  left:  { y: 0,  x: 40 },
  right: { y: 0,  x: -40 },
  none:  { y: 0,  x: 0 },
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  blur = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const offset = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset, filter: blur ? 'blur(8px)' : 'none' }}
      animate={inView
        ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
        : { opacity: 0, ...offset, filter: blur ? 'blur(8px)' : 'none' }
      }
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

#### Stagger Container (for lists/grids)
```typescript
// components/StaggerContainer.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function StaggerContainer({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Use this for each child item
export const staggerItem = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
             transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }},
}
```

#### Magnetic Button Effect
```typescript
// components/MagneticButton.tsx
'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function MagneticButton({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

#### Text Split Animation (Character by character)
```typescript
// components/SplitText.tsx
'use client'
import { motion } from 'framer-motion'

export function SplitText({ text, className }: {
  text: string
  className?: string
}) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: wi * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
```

### GSAP — Number Counter Animation
```typescript
// components/AnimatedCounter.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'

export function AnimatedCounter({ value, suffix = '', prefix = '' }: {
  value: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || !ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix
        }
      },
    })
  }, [inView, value, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
```

---

## 6. SCROLL EFFECTS SYSTEM

### Lenis — Buttery Smooth Scrolling (Apple-level)
```typescript
// app/providers.tsx
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

### Parallax Section
```typescript
// components/ParallaxSection.tsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ParallaxSection({ children, speed = 0.3, className }: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
```

### Scroll Progress Bar (Top of page)
```typescript
// components/ScrollProgress.tsx
'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary, var(--accent-hover)))',
      }}
    />
  )
}
```

### Horizontal Scroll Section (Apple product scroll)
```typescript
// components/HorizontalScroll.tsx
'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function HorizontalScroll({ items }: { items: React.ReactNode[] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(items.length - 1) * 100}%`])

  return (
    // Tall container to create scroll distance
    <div ref={ref} style={{ height: `${items.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-screen h-screen flex items-center justify-center">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
```

### Sticky Section with Reveal (Like Apple feature pages)
```typescript
// Sticky text reveal as user scrolls through tall section
export function StickyReveal({ slides }: {
  slides: Array<{ title: string; description: string; visual: React.ReactNode }>
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} style={{ height: `${slides.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="grid grid-cols-2 gap-16 w-full px-16">
          {/* Text that changes */}
          <div>
            {slides.map((slide, i) => {
              const start = i / slides.length
              const end = (i + 1) / slides.length
              const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0])
              const y = useTransform(scrollYProgress, [start, start + 0.1], [40, 0])
              return (
                <motion.div key={i} style={{ opacity, y }} className="absolute">
                  <h2 className="text-5xl font-display font-bold">{slide.title}</h2>
                  <p className="mt-4 text-lg text-text-secondary">{slide.description}</p>
                </motion.div>
              )
            })}
          </div>
          {/* Visual that changes */}
          <div>{/* visual elements */}</div>
        </div>
      </div>
    </div>
  )
}
```

---

## 7. UI COMPONENT LIBRARIES

### shadcn/ui — How to Use
shadcn/ui gives you unstyled, accessible components that you fully own.
Install only what you need:
```bash
npx shadcn@latest add button card input label badge dialog sheet
npx shadcn@latest add dropdown-menu tooltip popover tabs accordion
npx shadcn@latest add avatar skeleton progress command
```

Customize in `components/ui/button.tsx` — the CVA variants system.

### Glassmorphism Card Component
```typescript
// components/GlassCard.tsx
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean     // enable hover lift effect
  glow?: boolean      // enable accent glow on hover
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        // Base glass effect
        'relative rounded-2xl overflow-hidden',
        'bg-white/70 dark:bg-white/5',
        'backdrop-blur-xl',
        'border border-white/60 dark:border-white/10',
        'shadow-apple',
        // Hover effects
        hover && [
          'transition-all duration-300 ease-out',
          'hover:-translate-y-1',
          'hover:shadow-lg hover:border-white/80',
        ],
        // Glow effect
        glow && 'hover:shadow-accent',
        className
      )}
    >
      {/* Inner highlight line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      {children}
    </div>
  )
}
```

### Gradient Border Card
```typescript
// components/GradientBorderCard.tsx
export function GradientBorderCard({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    // Outer div creates the gradient border
    <div className={cn(
      'relative rounded-2xl p-[1px]',
      'bg-gradient-to-br from-accent-primary/30 via-transparent to-accent-secondary/30',
      'hover:from-accent-primary/60 hover:to-accent-secondary/60',
      'transition-all duration-300',
      className
    )}>
      {/* Inner div is the actual card */}
      <div className="rounded-[calc(1rem-1px)] bg-bg-elevated h-full p-6">
        {children}
      </div>
    </div>
  )
}
```

### Bento Grid (Apple-style feature layout)
```typescript
// components/BentoGrid.tsx
export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
      {children}
    </div>
  )
}

// Bento items can span multiple columns/rows:
// col-span-2  — wide card
// row-span-2  — tall card
// col-span-2 row-span-2 — large feature card
```

### Navbar with Scroll Blur
```typescript
// components/Navbar.tsx
'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20))

  return (
    <motion.nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 h-16',
        'transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border-default shadow-sm'
          : 'bg-transparent'
      )}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <span className="font-display font-semibold text-xl">YourBrand</span>
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
          <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
          <a href="#pricing"  className="hover:text-text-primary transition-colors">Pricing</a>
          <a href="#about"    className="hover:text-text-primary transition-colors">About</a>
        </div>
        {/* CTA */}
        <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium
                            hover:bg-accent-hover transition-all hover:shadow-accent hover:-translate-y-px">
          Get Started
        </button>
      </div>
    </motion.nav>
  )
}
```

---

## 8. WEB3 & MODERN VISUAL EFFECTS

### Noise Texture Overlay (Adds organic grain — used on Apple.com)
```css
/* In globals.css */
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.025;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### Mesh Gradient Background
```typescript
// components/MeshGradient.tsx — Animated gradient blob background
export function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 2 */}
      <motion.div
        className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent-secondary, #6D28D9) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Blob 3 — neutral warm */}
      <motion.div
        className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  )
}
```

### Dot Grid Pattern Background
```css
.dot-grid {
  background-image: radial-gradient(circle, var(--text-muted) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.4;
}

/* Or line grid */
.line-grid {
  background-image:
    linear-gradient(var(--border-default) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-default) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Glowing Accent Line (separator / visual divider)
```typescript
export function GlowLine({ color = 'var(--accent-primary)' }: { color?: string }) {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-border-default" />
      <motion.div
        className="absolute inset-0 h-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
    </div>
  )
}
```

### Badge / Tag Component (Web3 style pill)
```typescript
export function Web3Badge({ children, variant = 'default' }: {
  children: React.ReactNode
  variant?: 'default' | 'glow' | 'outline' | 'glass'
}) {
  const styles = {
    default: 'bg-accent-soft text-accent border border-accent-border/30',
    glow:    'bg-accent text-white shadow-accent',
    outline: 'border border-accent/50 text-accent bg-transparent',
    glass:   'bg-white/60 backdrop-blur-sm border border-white/60 text-text-secondary',
  }
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide',
      styles[variant]
    )}>
      {children}
    </span>
  )
}
```

### Spline 3D Integration (No-code 3D scenes)
```typescript
// Go to spline.design → create a 3D scene → Export → React
import Spline from '@splinetool/react-spline'

export function Hero3DVisual() {
  return (
    <div className="relative w-full h-[500px]">
      <Spline
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}
```

### Shimmer Loading Skeleton
```typescript
export function ShimmerCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl overflow-hidden bg-bg-secondary', className)}>
      <div
        className="w-full h-full animate-shimmer"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}
```

---

## 9. LAYOUT & SPACING SYSTEM

### Container System
```typescript
// Wrap all page sections in this
export function Container({ children, size = 'default', className }: {
  children: React.ReactNode
  size?: 'sm' | 'default' | 'lg' | 'full'
  className?: string
}) {
  const sizes = {
    sm:      'max-w-3xl',
    default: 'max-w-6xl',   // 1152px — sweet spot
    lg:      'max-w-7xl',   // 1280px
    full:    'max-w-none',
  }
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  )
}
```

### Section Spacing
```
Section padding vertical:  py-24 lg:py-32 (top + bottom)
Section gap between items: gap-6 (cards), gap-12 (sections), gap-20 (major sections)
Card padding:              p-6 (standard), p-8 (feature cards), p-10 (hero cards)
```

### Responsive Grid Patterns
```
Features (3 col):  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Bento (mixed):     grid grid-cols-1 md:grid-cols-6 auto-rows-[220px] gap-4
Two column:        grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center
Stats row:         grid grid-cols-2 md:grid-cols-4 gap-6
```

---

## 10. PAGE STRUCTURE BLUEPRINT

### Complete Landing Page Architecture

```
/
├── <ScrollProgressBar />
├── <Navbar />          — sticky, glass on scroll
│
├── <main>
│   │
│   ├── HERO SECTION
│   │   ├── <MeshGradient />         — background blobs
│   │   ├── <Web3Badge>New v2.0</Web3Badge>
│   │   ├── <SplitText> headline </SplitText>
│   │   ├── Subheading (fade in, delay)
│   │   ├── CTA buttons (scale in, delay)
│   │   ├── <MagneticButton> for primary CTA
│   │   ├── Social proof line (logos/avatars)
│   │   └── Hero visual (Spline 3D / screenshot mockup with tilt)
│   │
│   ├── LOGOS MARQUEE SECTION      — "Trusted by teams at..."
│   │   └── Infinite scroll marquee of company logos
│   │
│   ├── STATS SECTION
│   │   └── 4 × <AnimatedCounter> in a grid
│   │
│   ├── FEATURES SECTION (Bento Grid)
│   │   ├── Large feature card (col-span-2 row-span-2)
│   │   ├── 2 medium cards
│   │   └── 3 small cards
│   │
│   ├── HOW IT WORKS (Sticky reveal)
│   │   └── 3 steps that reveal as you scroll
│   │
│   ├── TESTIMONIALS
│   │   └── Masonry grid of quote cards
│   │
│   ├── PRICING
│   │   └── 3-column tier cards
│   │
│   ├── FAQ (Accordion)
│   │
│   └── FINAL CTA SECTION
│       └── Large gradient banner with CTA
│
└── <Footer />
```

---

## 11. COMPONENT PATTERNS

### Infinite Marquee (Logo strip / testimonial scroll)
```typescript
// components/Marquee.tsx
import { motion } from 'framer-motion'

export function Marquee({ items, speed = 25 }: {
  items: React.ReactNode[]
  speed?: number
}) {
  return (
    <div className="flex overflow-hidden gap-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="flex gap-8 flex-shrink-0"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
          aria-hidden={i === 1}
        >
          {items.map((item, j) => (
            <div key={j} className="flex-shrink-0">{item}</div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
```

### Pricing Card
```typescript
export function PricingCard({ plan, price, features, highlight = false }: {
  plan: string
  price: string
  features: string[]
  highlight?: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'relative rounded-2xl p-8 border transition-all duration-300',
        highlight
          ? 'bg-accent text-white border-accent shadow-accent shadow-lg scale-[1.02]'
          : 'bg-bg-elevated border-border-default hover:border-border-strong hover:shadow-lg'
      )}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Web3Badge variant="glow">Most Popular</Web3Badge>
        </div>
      )}
      <div className="text-sm font-medium uppercase tracking-widest mb-4 opacity-70">{plan}</div>
      <div className="font-display text-5xl font-bold mb-2">{price}</div>
      <div className="text-sm opacity-60 mb-8">per month</div>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span className="text-green-500">✓</span> {f}
          </li>
        ))}
      </ul>
      <button className={cn(
        'w-full py-3 rounded-xl font-medium text-sm transition-all',
        highlight
          ? 'bg-white text-accent hover:bg-white/90'
          : 'bg-accent text-white hover:bg-accent-hover hover:shadow-accent'
      )}>
        Get Started
      </button>
    </motion.div>
  )
}
```

### Testimonial Card
```typescript
export function TestimonialCard({ quote, author, role, avatar }: {
  quote: string
  author: string
  role: string
  avatar?: string
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-4">
      {/* Star rating */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm">★</span>
        ))}
      </div>
      <blockquote className="text-sm text-text-secondary leading-relaxed">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
          {author[0]}
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary">{author}</div>
          <div className="text-xs text-text-muted">{role}</div>
        </div>
      </div>
    </GlassCard>
  )
}
```

---

## 12. PERFORMANCE RULES

### Must-Follow Rules for Production Quality

**Images**
```typescript
// ALWAYS use next/image
import Image from 'next/image'
// Use priority for above-fold images
<Image src="..." alt="..." priority width={1200} height={600} />
// Use blur placeholder for below fold
<Image src="..." alt="..." placeholder="blur" blurDataURL="..." />
```

**Fonts — next/font (zero layout shift)**
```typescript
// app/layout.tsx
import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
```

**Heavy Components — Dynamic Import**
```typescript
// Never import heavy components directly
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] animate-pulse bg-bg-secondary rounded-2xl" />,
})
```

**Animation Performance**
```typescript
// GOOD — GPU-accelerated properties only
animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}

// BAD — causes layout reflow (avoid animating these)
// animate={{ width, height, padding, margin, top, left }}

// Add will-change for heavy animations
<motion.div style={{ willChange: 'transform' }} ... />
```

**Reduce Motion Accessibility**
```typescript
import { useReducedMotion } from 'framer-motion'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 13. COMPLETE CODE EXAMPLES

### Hero Section — Full Implementation
```typescript
// app/(marketing)/page.tsx — Hero Section
'use client'
import { motion } from 'framer-motion'
import { MeshGradient } from '@/components/MeshGradient'
import { SplitText } from '@/components/SplitText'
import { Web3Badge } from '@/components/Web3Badge'
import { AnimatePresence } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary pt-16">
      {/* Animated background */}
      <MeshGradient />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <Web3Badge variant="glass">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
            Introducing v2.0 — Now with AI
          </Web3Badge>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-display text-7xl lg:text-8xl font-bold tracking-tight text-text-primary">
          <SplitText text="Build Products" />
          <br />
          <span className="relative">
            <SplitText text="The World Loves" />
            {/* Underline accent */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
              style={{ background: 'var(--gradient-accent)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          className="mt-8 text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          The all-in-one platform that turns your ideas into polished products.
          Design, build, and ship faster than ever before.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button className="px-8 py-4 rounded-xl bg-accent text-white font-semibold text-base
                              hover:bg-accent-hover hover:shadow-accent hover:-translate-y-0.5
                              transition-all duration-200 active:translate-y-0">
            Start for Free →
          </button>
          <button className="px-8 py-4 rounded-xl border border-border-strong text-text-primary
                              font-semibold text-base bg-bg-elevated
                              hover:border-border-strong hover:shadow-md hover:-translate-y-0.5
                              transition-all duration-200">
            Watch Demo ▶
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-3 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex -space-x-2">
            {[0,1,2,3,4].map(i => (
              <div key={i}
                className="w-8 h-8 rounded-full border-2 border-bg-primary bg-accent/10"
                style={{ zIndex: 5 - i }}
              />
            ))}
          </div>
          <span>Join <strong className="text-text-primary">12,000+</strong> teams worldwide</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-9 rounded-full border-2 border-border-strong flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-text-muted"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
```

---

## 14. DEPLOYMENT CHECKLIST

### Before Going Live

```markdown
PERFORMANCE
□ All images use next/image with proper width/height
□ Fonts loaded via next/font (no layout shift)
□ Heavy components use dynamic() imports
□ No animation on layout properties (width, height, padding)
□ Will-change: transform on GPU-animated elements

SEO
□ Metadata in app/layout.tsx (title, description, og:image)
□ Semantic HTML (h1 only once per page, landmarks)
□ Alt text on all images
□ robots.txt and sitemap.xml generated

ACCESSIBILITY
□ useReducedMotion() respected in all animations
□ Focus states visible (not removed with outline: none)
□ Color contrast ratio > 4.5:1 for body text
□ All interactive elements keyboard accessible
□ ARIA labels on icon-only buttons

VERCEL DEPLOYMENT
□ All .env variables added to Vercel project settings
□ Build passes locally (npm run build)
□ No TypeScript errors (npx tsc --noEmit)
□ No ESLint errors (npm run lint)
□ NEXTAUTH_URL set to production domain
□ MongoDB Atlas IP Allowlist: 0.0.0.0/0
□ Cloudinary unsigned upload preset configured

QUALITY CHECKLIST
□ Works on mobile (320px minimum)
□ Works in Safari (test -webkit prefixes)
□ Dark mode toggle works (if implemented)
□ All links go somewhere (no href="#" in production)
□ Loading states for all async operations
□ Error states for all forms and API calls
□ 404 page (app/not-found.tsx)
□ Loading page (app/loading.tsx)
```

---

## QUICK REFERENCE — MOST USED CLASSES

```
BACKGROUNDS
bg-bg-primary       — Main page background
bg-bg-secondary     — Section/card backgrounds
bg-bg-elevated      — Floating cards, modals
bg-white/70         — Glass card base

GLASS EFFECT
backdrop-blur-xl bg-white/70 border border-white/60 shadow-apple

GRADIENT TEXT
bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent

ANIMATED UNDERLINE
relative after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px]
after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform

SMOOTH HOVER CARD
transition-all duration-300 hover:-translate-y-1 hover:shadow-lg

GRADIENT BUTTON
bg-gradient-to-r from-accent-primary to-accent-secondary text-white
hover:opacity-90 hover:-translate-y-px hover:shadow-accent transition-all

BADGE
px-3 py-1 rounded-full text-xs font-medium bg-accent-soft text-accent border border-accent/20

SECTION SPACING
py-24 lg:py-32

CONTAINER
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
```

---

*This skill was crafted for building production-grade, Apple-caliber SaaS websites with
world-class animation, modern typography, and premium light-theme aesthetics.
Follow every section precisely and the result will speak for itself.*