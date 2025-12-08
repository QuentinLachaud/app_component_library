// ─────────────────────────────────────────────────────────────
// Component: SegmentedToggle
// Purpose: Multi-option toggle for switching between related views.
// Layer: UI Primitive
// Used by: Panel view switchers (Chart/Table/Summary), mode toggles.
// ─────────────────────────────────────────────────────────────

import type { ReactNode, KeyboardEvent } from 'react';
import { useCallback, useRef } from 'react';

// ─── Types ───
export interface SegmentOption<T extends string = string> {
	/** Unique value identifier */
	value: T;
	/** Display label */
	label: ReactNode;
	/** Optional icon */
	icon?: ReactNode;
	/** Disabled state for this option */
	disabled?: boolean;
}

export interface SegmentedToggleProps<T extends string = string> {
	/** Available options */
	options: SegmentOption<T>[];
	/** Currently selected value */
	value: T;
	/** Change handler */
	onChange: (value: T) => void;
	/** Size variant */
	size?: 'sm' | 'md';
	/** Full width - segments expand equally */
	fullWidth?: boolean;
	/** Additional CSS classes */
	className?: string;
	/** Accessible label for the toggle group */
	ariaLabel?: string;
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md', { container: string; segment: string }> = {
	sm: {
		container: 'p-0.5 gap-0.5',
		segment: 'px-2.5 py-1 text-xs gap-1',
	},
	md: {
		container: 'p-1 gap-1',
		segment: 'px-3 py-1.5 text-sm gap-1.5',
	},
};

// ─── Component ───
export function SegmentedToggle<T extends string = string>({
	options,
	value,
	onChange,
	size = 'md',
	fullWidth = false,
	className = '',
	ariaLabel = 'Toggle options',
}: SegmentedToggleProps<T>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const styles = sizeStyles[size];

	// ─── Keyboard Navigation ───
	const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
		const enabledOptions = options.filter(o => !o.disabled);
		const currentEnabledIndex = enabledOptions.findIndex(o => o.value === options[currentIndex].value);

		let nextIndex = -1;

		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				e.preventDefault();
				nextIndex = (currentEnabledIndex + 1) % enabledOptions.length;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				e.preventDefault();
				nextIndex = (currentEnabledIndex - 1 + enabledOptions.length) % enabledOptions.length;
				break;
			case 'Home':
				e.preventDefault();
				nextIndex = 0;
				break;
			case 'End':
				e.preventDefault();
				nextIndex = enabledOptions.length - 1;
				break;
			default:
				return;
		}

		if (nextIndex >= 0) {
			const nextOption = enabledOptions[nextIndex];
			onChange(nextOption.value);

			// Focus the button
			const buttons = containerRef.current?.querySelectorAll('button');
			const targetButton = Array.from(buttons || []).find(
				btn => btn.getAttribute('data-value') === nextOption.value
			);
			(targetButton as HTMLButtonElement)?.focus();
		}
	}, [options, onChange]);

	return (
		<div
			ref={containerRef}
			role="tablist"
			aria-label={ariaLabel}
			className={`
        inline-flex items-center
        bg-bg-surface
        border border-border-subtle
        rounded-md
        ${styles.container}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
		>
			{options.map((option, index) => {
				const isActive = option.value === value;
				const isDisabled = option.disabled;

				return (
					<button
						key={option.value}
						type="button"
						role="tab"
						data-value={option.value}
						aria-selected={isActive}
						aria-disabled={isDisabled}
						tabIndex={isActive ? 0 : -1}
						disabled={isDisabled}
						onClick={() => !isDisabled && onChange(option.value)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						className={`
              inline-flex items-center justify-center
              font-medium
              rounded
              transition-all duration-[var(--transition-fast)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus
              ${styles.segment}
              ${fullWidth ? 'flex-1' : ''}
              ${isActive
								? 'bg-accent-primary text-bg-base shadow-sm'
								: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'
							}
              ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
					>
						{/* Icon */}
						{option.icon && (
							<span className="flex-shrink-0">{option.icon}</span>
						)}
						{/* Label */}
						<span>{option.label}</span>
					</button>
				);
			})}
		</div>
	);
}
