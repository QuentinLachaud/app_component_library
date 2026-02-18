// ─────────────────────────────────────────────────────────────
// Component: Toggle
// Purpose: Toggle/Switch component for binary on/off states.
// Layer: UI Primitive
// Used by: Settings, feature flags, enable/disable options.
// ─────────────────────────────────────────────────────────────

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';

// ─── Types ───
export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
	/** Label displayed next to the toggle */
	label?: string;
	/** Helper text displayed below the toggle */
	helperText?: string;
	/** Error message - replaces helper text and applies error styling */
	errorText?: string;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
	/** Label position relative to toggle */
	labelPosition?: 'left' | 'right';
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', { track: string; thumb: string; translate: string }> = {
	sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
	md: { track: 'w-11 h-6', thumb: 'w-4 h-4', translate: 'translate-x-5' },
	lg: { track: 'w-14 h-7', thumb: 'w-5 h-5', translate: 'translate-x-7' },
};

// ─── Component ───
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
	function Toggle(
		{
			label,
			helperText,
			errorText,
			size = 'md',
			labelPosition = 'right',
			disabled,
			className = '',
			id,
			checked,
			...props
		},
		ref
	) {
		// Generate unique ID if not provided
		const generatedId = useId();
		const inputId = id || generatedId;
		const hasError = Boolean(errorText);

		const toggleElement = (
			<div className="relative flex items-center">
				{/* Hidden Native Checkbox */}
				<input
					ref={ref}
					type="checkbox"
					id={inputId}
					disabled={disabled}
					checked={checked}
					className="sr-only peer"
					{...props}
				/>

				{/* Custom Toggle Track */}
				<label
					htmlFor={inputId}
					className={`
            relative
            ${sizeStyles[size].track}
            rounded-full
            cursor-pointer
            transition-all duration-[var(--transition-normal)]
            peer-focus:ring-2 peer-focus:ring-offset-0 peer-focus:ring-accent-primary
            ${hasError
							? 'bg-error/20 peer-checked:bg-error'
							: 'bg-bg-muted peer-checked:bg-accent-primary'
						}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
				>
					{/* Toggle Thumb */}
					<span
						className={`
              absolute top-1/2 -translate-y-1/2 left-1
              ${sizeStyles[size].thumb}
              bg-white
              rounded-full
              shadow-sm
              transition-transform duration-[var(--transition-normal)]
              ${checked ? sizeStyles[size].translate : ''}
            `}
					/>
				</label>
			</div>
		);

		return (
			<div className="flex flex-col gap-1.5">
				<div
					className={`
            flex items-center gap-3
            ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : ''}
          `}
				>
					{toggleElement}

					{/* Label */}
					{label && (
						<label
							htmlFor={inputId}
							className={`
                text-sm font-medium
                text-text-primary
                cursor-pointer
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
						>
							{label}
						</label>
					)}
				</div>

				{/* Helper or Error Text */}
				{(helperText || errorText) && (
					<span
						className={`
              text-xs
              ${labelPosition === 'left' ? 'text-right' : ''}
              ${hasError ? 'text-error' : 'text-text-muted'}
            `}
					>
						{errorText || helperText}
					</span>
				)}
			</div>
		);
	}
);
