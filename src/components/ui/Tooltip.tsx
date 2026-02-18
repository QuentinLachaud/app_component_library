// ─────────────────────────────────────────────────────────────
// Component: Tooltip
// Purpose: Contextual help text that appears on hover/focus.
// Layer: UI Primitive
// Used by: Icons, buttons, labels throughout the application for additional context.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';

// ─── Types ───
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
	/** Content to display in the tooltip */
	content: ReactNode;
	/** Element that triggers the tooltip */
	children: ReactNode;
	/** Position of the tooltip relative to the trigger */
	position?: TooltipPosition;
	/** Delay before showing tooltip in milliseconds */
	delay?: number;
	/** Whether the tooltip is disabled */
	disabled?: boolean;
}

// ─── Position Styles ───
const positionStyles: Record<TooltipPosition, { tooltip: string; arrow: string }> = {
	top: {
		tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		arrow: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-bg-tooltip',
	},
	bottom: {
		tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
		arrow: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-bg-tooltip',
	},
	left: {
		tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
		arrow: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-bg-tooltip',
	},
	right: {
		tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
		arrow: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-bg-tooltip',
	},
};

// ─── Component ───
export function Tooltip({
	content,
	children,
	position = 'top',
	delay = 300,
	disabled = false,
}: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const showTooltip = () => {
		if (disabled) return;
		timeoutRef.current = window.setTimeout(() => {
			setIsVisible(true);
		}, delay);
	};

	const hideTooltip = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsVisible(false);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<div
			className="relative inline-block"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onFocus={showTooltip}
			onBlur={hideTooltip}
		>
			{/* Trigger Element */}
			{children}

			{/* Tooltip */}
			{isVisible && !disabled && (
				<div
					role="tooltip"
					className={`
            absolute z-50
            px-2.5 py-1.5
            text-xs text-white
            bg-bg-tooltip
            rounded-md
            shadow-lg
            pointer-events-none
            whitespace-nowrap
            animate-in fade-in-0 zoom-in-95
            ${positionStyles[position].tooltip}
          `}
				>
					{content}

					{/* Arrow */}
					<div
						className={`
              absolute
              w-0 h-0
              border-4
              ${positionStyles[position].arrow}
            `}
					/>
				</div>
			)}
		</div>
	);
}
