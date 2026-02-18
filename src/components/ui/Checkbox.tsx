// ─────────────────────────────────────────────────────────────
// Component: Checkbox
// Purpose: Checkbox input with label and error states.
// Layer: UI Primitive
// Used by: Forms, filters, multi-select options throughout the application.
// ─────────────────────────────────────────────────────────────

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { Check } from 'lucide-react';

// ─── Types ───
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
	/** Label displayed next to the checkbox */
	label?: string;
	/** Helper text displayed below the checkbox */
	helperText?: string;
	/** Error message - replaces helper text and applies error styling */
	errorText?: string;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', { box: string; icon: number }> = {
	sm: { box: 'w-4 h-4', icon: 12 },
	md: { box: 'w-5 h-5', icon: 14 },
	lg: { box: 'w-6 h-6', icon: 16 },
};

// ─── Component ───
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox(
		{
			label,
			helperText,
			errorText,
			size = 'md',
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

		return (
			<div className="flex flex-col gap-1.5">
				<div className="flex items-start gap-2">
					{/* Checkbox Container */}
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

						{/* Custom Checkbox */}
						<label
							htmlFor={inputId}
							className={`
                flex items-center justify-center
                ${sizeStyles[size].box}
                bg-bg-surface
                border-2 rounded
                cursor-pointer
                transition-all duration-[var(--transition-fast)]
                peer-focus:ring-2 peer-focus:ring-offset-0 peer-focus:ring-accent-primary
                ${hasError
									? 'border-error peer-checked:bg-error peer-checked:border-error'
									: 'border-border-default peer-checked:bg-accent-primary peer-checked:border-accent-primary'
								}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent-primary'}
                ${className}
              `}
						>
							{/* Check Icon */}
							{checked && (
								<Check
									size={sizeStyles[size].icon}
									className="text-white"
									strokeWidth={3}
								/>
							)}
						</label>
					</div>

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
              text-xs ml-7
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
