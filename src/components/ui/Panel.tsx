// ─────────────────────────────────────────────────────────────
// Component: Panel
// Purpose: Generic container with optional header and footer.
// Layer: UI Primitive
// Used by: All higher level layout and domain components.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';

// ─── Types ───
export interface PanelProps {
	/** Panel title - displays in header if provided */
	title?: ReactNode;
	/** Optional actions/controls for the header right side */
	headerActions?: ReactNode;
	/** Optional footer content */
	footer?: ReactNode;
	/** Panel content */
	children: ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Test ID for automated testing */
	testId?: string;
}

// ─── Component ───
export function Panel({
	title,
	headerActions,
	footer,
	children,
	className = '',
	testId,
}: PanelProps) {
	const hasHeader = title || headerActions;

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
			{/* Header Section */}
			{hasHeader && (
				<div className="
          flex items-center justify-between
          px-4 py-3
          border-b border-border-subtle
          bg-bg-surface
        ">
					{/* Title */}
					{title && (
						<h3 className="
              text-sm font-semibold
              text-text-primary
              m-0
            ">
							{title}
						</h3>
					)}

					{/* Header Actions */}
					{headerActions && (
						<div className="flex items-center gap-2">
							{headerActions}
						</div>
					)}
				</div>
			)}

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
	);
}
