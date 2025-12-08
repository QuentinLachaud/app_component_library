// ─────────────────────────────────────────────────────────────
// Component: CollapsiblePanel
// Purpose: Panel with smooth expand/collapse animation.
// Layer: UI Primitive
// Used by: Config sections, filter areas, expandable content.
// Dependencies: Panel, usePanelCollapse, lucide-react icons.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePanelCollapse } from '../../hooks/usePanelCollapse';

// ─── Types ───
export interface CollapsiblePanelProps {
	/** Panel title - required for collapsible panels */
	title: ReactNode;
	/** Optional actions/controls for the header right side */
	headerActions?: ReactNode;
	/** Optional footer content (only visible when expanded) */
	footer?: ReactNode;
	/** Panel content */
	children: ReactNode;
	/** Default expanded state for uncontrolled usage */
	defaultExpanded?: boolean;
	/** Controlled expanded state */
	isExpanded?: boolean;
	/** Callback when toggle is triggered */
	onToggle?: (isExpanded: boolean) => void;
	/** Additional CSS classes */
	className?: string;
	/** Test ID for automated testing */
	testId?: string;
}

// ─── Component ───
export function CollapsiblePanel({
	title,
	headerActions,
	footer,
	children,
	defaultExpanded = true,
	isExpanded,
	onToggle,
	className = '',
	testId,
}: CollapsiblePanelProps) {
	const { expanded, toggle } = usePanelCollapse({
		defaultExpanded,
		isExpanded,
		onToggle,
	});

	return (
		<div
			data-testid={testId}
			className={`
        bg-bg-elevated
        border border-border-subtle
        rounded-lg
        overflow-hidden
        ${className}
      `}
		>
			{/* Header with Toggle Button */}
			<button
				type="button"
				onClick={toggle}
				className="
          w-full
          flex items-center justify-between
          px-4 py-3
          border-b border-border-subtle
          bg-bg-surface
          cursor-pointer
          transition-colors duration-[var(--transition-fast)]
          hover:bg-bg-hover
          focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus
        "
				aria-expanded={expanded}
			>
				{/* Title */}
				<h3 className="
          text-sm font-semibold
          text-text-primary
          m-0
        ">
					{title}
				</h3>

				{/* Right side: Actions + Chevron */}
				<div className="flex items-center gap-2">
					{/* Header Actions - stop propagation to prevent toggle */}
					{headerActions && (
						<div
							className="flex items-center gap-2"
							onClick={(e) => e.stopPropagation()}
						>
							{headerActions}
						</div>
					)}

					{/* Chevron Indicator */}
					<ChevronDown
						size={18}
						className={`
              text-text-muted
              transition-transform duration-[var(--transition-normal)]
              ${expanded ? 'rotate-0' : '-rotate-90'}
            `}
					/>
				</div>
			</button>

			{/* Collapsible Content - uses grid for smooth height animation */}
			<div
				className={`
          grid
          transition-[grid-template-rows] duration-[var(--transition-normal)] ease-out
          ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
			>
				<div className="overflow-hidden">
					{/* Content Section */}
					<div className="p-4">
						{children}
					</div>

					{/* Footer Section */}
					{footer && (
						<div className="
              px-4 py-3
              border-t border-border-subtle
              bg-bg-surface
            ">
							{footer}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
