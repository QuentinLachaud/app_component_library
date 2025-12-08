// ─────────────────────────────────────────────────────────────
// Component: PageLayout
// Purpose: Main page shell with responsive grid layout.
// Layer: Layout
// Used by: All page-level components.
// Layout Map:
//   [TopRibbon]
//   [MainContent: single column or two-column grid]
//   [BottomRibbon]
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';

// ─── Types ───
export interface PageLayoutProps {
	/** Top ribbon content */
	topRibbon?: ReactNode;
	/** Bottom ribbon content */
	bottomRibbon?: ReactNode;
	/** Main content area */
	children: ReactNode;
	/** Max width constraint */
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	/** Additional CSS classes */
	className?: string;
}

// ─── Max Width Styles ───
const maxWidthStyles: Record<string, string> = {
	sm: 'max-w-screen-sm',
	md: 'max-w-screen-md',
	lg: 'max-w-screen-lg',
	xl: 'max-w-screen-xl',
	'2xl': 'max-w-screen-2xl',
	full: 'max-w-full',
};

// ─── Component ───
export function PageLayout({
	topRibbon,
	bottomRibbon,
	children,
	maxWidth = '2xl',
	className = '',
}: PageLayoutProps) {
	return (
		<div
			className={`
        min-h-screen
        bg-bg-base
        p-4 md:p-6 lg:p-8
        ${className}
      `}
		>
			<div
				className={`
          mx-auto
          w-full
          ${maxWidthStyles[maxWidth]}
          flex flex-col gap-4 md:gap-6
        `}
			>
				{/* Top Ribbon Slot */}
				{topRibbon && (
					<div className="flex-shrink-0">
						{topRibbon}
					</div>
				)}

				{/* Main Content Area */}
				<main className="flex-1 min-h-0">
					{children}
				</main>

				{/* Bottom Ribbon Slot */}
				{bottomRibbon && (
					<div className="flex-shrink-0">
						{bottomRibbon}
					</div>
				)}
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────
// Component: TwoColumnLayout
// Purpose: Responsive two-column grid for main content areas.
// Layer: Layout
// Used by: Dashboard views with sidebar + main content.
// ─────────────────────────────────────────────────────────────

export interface TwoColumnLayoutProps {
	/** Left/sidebar content */
	left: ReactNode;
	/** Right/main content */
	right: ReactNode;
	/** Left column width ratio (out of 12) */
	leftWidth?: 3 | 4 | 5;
	/** Stack on mobile */
	stackOnMobile?: boolean;
	/** Gap between columns */
	gap?: 'sm' | 'md' | 'lg';
	/** Additional CSS classes */
	className?: string;
}

// ─── Gap Styles ───
const gapStyles: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'gap-3',
	md: 'gap-4 md:gap-6',
	lg: 'gap-6 md:gap-8',
};

// ─── Component ───
export function TwoColumnLayout({
	left,
	right,
	leftWidth = 4,
	stackOnMobile = true,
	gap = 'md',
	className = '',
}: TwoColumnLayoutProps) {
	// Calculate grid columns based on leftWidth
	const gridCols = {
		3: 'lg:grid-cols-[1fr_3fr]',
		4: 'lg:grid-cols-[1fr_2fr]',
		5: 'lg:grid-cols-[1fr_1.4fr]',
	};

	return (
		<div
			className={`
        w-full
        grid
        ${stackOnMobile ? 'grid-cols-1' : ''}
        ${gridCols[leftWidth]}
        ${gapStyles[gap]}
        ${className}
      `}
		>
			{/* Left Column */}
			<div className="min-w-0">
				{left}
			</div>

			{/* Right Column */}
			<div className="min-w-0">
				{right}
			</div>
		</div>
	);
}
