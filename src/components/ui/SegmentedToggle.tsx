// ─────────────────────────────────────────────────────────────
// Component: SegmentedToggle
// Purpose: Multi-option toggle for switching between related views.
// Layer: UI Primitive
// Used by: Panel view switchers (Chart/Table/Summary), mode toggles.
// Features: Sliding pill indicator when multiple options present.
// ─────────────────────────────────────────────────────────────

import type { ReactNode, KeyboardEvent } from 'react';
import { useCallback, useRef, useState, useEffect, useLayoutEffect } from 'react';

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

// ─── Sliding Pill Position ───
interface PillPosition {
	left: number;
	width: number;
}

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
	const buttonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
	const styles = sizeStyles[size];

	// Track pill position for sliding animation
	const [pillPosition, setPillPosition] = useState<PillPosition | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	// Calculate pill position based on active button
	const updatePillPosition = useCallback(() => {
		const activeButton = buttonsRef.current.get(value);
		const container = containerRef.current;

		if (activeButton && container) {
			const containerRect = container.getBoundingClientRect();
			const buttonRect = activeButton.getBoundingClientRect();

			setPillPosition({
				left: buttonRect.left - containerRect.left,
				width: buttonRect.width,
			});
		}
	}, [value]);

	// Use layout effect for initial position (no animation)
	useLayoutEffect(() => {
		updatePillPosition();
		// Small delay to ensure DOM is ready, then enable animations
		const timer = setTimeout(() => setIsInitialized(true), 50);
		return () => clearTimeout(timer);
	}, [updatePillPosition]);

	// Update position when value changes (with animation)
	useEffect(() => {
		updatePillPosition();
	}, [value, updatePillPosition]);

	// Update on resize
	useEffect(() => {
		const handleResize = () => updatePillPosition();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [updatePillPosition]);

	// Store button ref
	const setButtonRef = useCallback((value: string, el: HTMLButtonElement | null) => {
		if (el) {
			buttonsRef.current.set(value, el);
		} else {
			buttonsRef.current.delete(value);
		}
	}, []);

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
			const targetButton = buttonsRef.current.get(nextOption.value);
			targetButton?.focus();
		}
	}, [options, onChange]);

	// Determine if we should show the sliding pill (only for multiple options)
	const showSlidingPill = options.length > 1 && pillPosition !== null;

	return (
		<div
			ref={containerRef}
			role="tablist"
			aria-label={ariaLabel}
			className={`
        relative
        inline-flex items-center
        bg-bg-surface
        border border-border-subtle
        rounded-md
        ${styles.container}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
		>
			{/* Sliding Pill Indicator (only for multiple options) */}
			{showSlidingPill && (
				<div
					className={`
            absolute
            bg-accent-primary
            rounded
            shadow-sm
            pointer-events-none
            ${isInitialized ? 'transition-all duration-200 ease-out' : ''}
          `}
					style={{
						left: pillPosition.left,
						width: pillPosition.width,
						top: size === 'sm' ? '2px' : '4px',
						bottom: size === 'sm' ? '2px' : '4px',
					}}
				/>
			)}

			{options.map((option, index) => {
				const isActive = option.value === value;
				const isDisabled = option.disabled;

				return (
					<button
						key={option.value}
						ref={(el) => setButtonRef(option.value, el)}
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
              relative z-10
              inline-flex items-center justify-center
              font-medium
              rounded
              transition-colors duration-[var(--transition-fast)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus
              ${styles.segment}
              ${fullWidth ? 'flex-1' : ''}
              ${isActive
								? 'text-accent-on-primary'
								: 'text-text-secondary hover:text-text-primary'
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
