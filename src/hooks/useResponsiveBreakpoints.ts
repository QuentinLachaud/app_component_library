// ─────────────────────────────────────────────────────────────
// Hook: useResponsiveBreakpoints
// Purpose: Returns current viewport breakpoint for responsive decisions.
// Layer: Hooks
// Used by: Layout components, conditional rendering based on screen size.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from 'react';

// ─── Types ───
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface UseResponsiveBreakpointsReturn {
	/** Current breakpoint name */
	breakpoint: Breakpoint;
	/** Current viewport width */
	width: number;
	/** Is viewport at least 'sm' (640px) */
	isSm: boolean;
	/** Is viewport at least 'md' (768px) */
	isMd: boolean;
	/** Is viewport at least 'lg' (1024px) */
	isLg: boolean;
	/** Is viewport at least 'xl' (1280px) */
	isXl: boolean;
	/** Is viewport at least '2xl' (1536px) */
	is2Xl: boolean;
	/** Is mobile (less than 'md') */
	isMobile: boolean;
	/** Is tablet (between 'md' and 'lg') */
	isTablet: boolean;
	/** Is desktop ('lg' and above) */
	isDesktop: boolean;
}

// ─── Breakpoint Thresholds (Tailwind defaults) ───
const BREAKPOINTS: Record<Breakpoint, number> = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
};

// ─── Get Breakpoint from Width ───
function getBreakpoint(width: number): Breakpoint {
	if (width >= BREAKPOINTS['2xl']) return '2xl';
	if (width >= BREAKPOINTS.xl) return 'xl';
	if (width >= BREAKPOINTS.lg) return 'lg';
	if (width >= BREAKPOINTS.md) return 'md';
	if (width >= BREAKPOINTS.sm) return 'sm';
	return 'xs';
}

// ─── Hook ───
export function useResponsiveBreakpoints(): UseResponsiveBreakpointsReturn {
	const [width, setWidth] = useState(() =>
		typeof window !== 'undefined' ? window.innerWidth : 1024
	);

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		// Debounce resize for performance
		let timeoutId: number;
		const debouncedResize = () => {
			clearTimeout(timeoutId);
			timeoutId = window.setTimeout(handleResize, 100);
		};

		window.addEventListener('resize', debouncedResize);

		// Initial call
		handleResize();

		return () => {
			window.removeEventListener('resize', debouncedResize);
			clearTimeout(timeoutId);
		};
	}, []);

	return useMemo(() => {
		const breakpoint = getBreakpoint(width);

		return {
			breakpoint,
			width,
			isSm: width >= BREAKPOINTS.sm,
			isMd: width >= BREAKPOINTS.md,
			isLg: width >= BREAKPOINTS.lg,
			isXl: width >= BREAKPOINTS.xl,
			is2Xl: width >= BREAKPOINTS['2xl'],
			isMobile: width < BREAKPOINTS.md,
			isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
			isDesktop: width >= BREAKPOINTS.lg,
		};
	}, [width]);
}
