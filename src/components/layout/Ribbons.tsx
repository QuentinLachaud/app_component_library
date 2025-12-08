// ─────────────────────────────────────────────────────────────
// Component: TopRibbon
// Purpose: Fixed-height top control bar spanning page width.
// Layer: Layout
// Used by: Page headers, main navigation, global controls.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';

// ─── Types ───
export interface RibbonSection {
	/** Section content */
	content: ReactNode;
	/** Optional section key */
	key?: string;
	/** Flex grow/shrink behavior */
	grow?: boolean;
}

export interface TopRibbonProps {
	/** Sections to display, separated by dividers */
	sections?: RibbonSection[];
	/** Alternative: simple children (no sections/dividers) */
	children?: ReactNode;
	/** Additional CSS classes */
	className?: string;
}

// ─── Component ───
export function TopRibbon({
	sections,
	children,
	className = '',
}: TopRibbonProps) {
	return (
		<div
			className={`
        w-full
        bg-bg-elevated
        border border-border-subtle
        rounded-lg
        px-4 py-3
        ${className}
      `}
		>
			{sections ? (
				/* Sectioned layout with dividers */
				<div className="flex items-center gap-4 flex-wrap">
					{sections.map((section, index) => (
						<div
							key={section.key || index}
							className={`
                flex items-center gap-3
                ${section.grow ? 'flex-1' : ''}
              `}
						>
							{/* Divider (not before first section) */}
							{index > 0 && (
								<div className="
                  h-6 w-px
                  bg-border-subtle
                  -ml-2
                " />
							)}
							{section.content}
						</div>
					))}
				</div>
			) : (
				/* Simple content */
				<div className="flex items-center gap-4 flex-wrap">
					{children}
				</div>
			)}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────
// Component: BottomRibbon
// Purpose: Contextual bottom bar for tickets, actions, markers.
// Layer: Layout
// Used by: Deposit tickets, drawdown markers, scenario controls.
// ─────────────────────────────────────────────────────────────

export interface BottomRibbonProps {
	/** Ribbon content */
	children: ReactNode;
	/** Additional CSS classes */
	className?: string;
}

export function BottomRibbon({
	children,
	className = '',
}: BottomRibbonProps) {
	return (
		<div
			className={`
        w-full
        bg-bg-elevated
        border border-border-subtle
        rounded-lg
        px-4 py-3
        ${className}
      `}
		>
			<div className="flex items-center gap-4 flex-wrap">
				{children}
			</div>
		</div>
	);
}
