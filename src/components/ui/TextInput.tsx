// ─────────────────────────────────────────────────────────────
// Component: TextInput
// Purpose: Single-line text input with label, helper, and error states.
// Layer: UI Primitive
// Used by: Forms, search, text entry throughout the application.
// ─────────────────────────────────────────────────────────────

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';

// ─── Types ───
export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/** Label displayed above the input */
	label?: string;
	/** Helper text displayed below the input */
	helperText?: string;
	/** Error message - replaces helper text and applies error styling */
	errorText?: string;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
	/** Full width mode */
	fullWidth?: boolean;
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'px-3 py-1.5 text-xs',
	md: 'px-3 py-2 text-sm',
	lg: 'px-4 py-3 text-base',
};

// ─── Component ───
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	function TextInput(
		{
			label,
			helperText,
			errorText,
			size = 'md',
			fullWidth = false,
			disabled,
			className = '',
			id,
			...props
		},
		ref
	) {
		// Generate unique ID if not provided
		const generatedId = useId();
		const inputId = id || generatedId;
		const hasError = Boolean(errorText);

		return (
			<div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
				{/* Label */}
				{label && (
					<label
						htmlFor={inputId}
						className="
              text-sm font-medium
              text-text-secondary
            "
					>
						{label}
					</label>
				)}

				{/* Input */}
				<input
					ref={ref}
					id={inputId}
					disabled={disabled}
					className={`
            w-full
            bg-bg-surface
            border rounded-md
            text-text-primary
            placeholder:text-text-muted
            transition-colors duration-[var(--transition-fast)]
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-overlay
            ${hasError
							? 'border-error focus:ring-error/30 focus:border-error'
							: 'border-border-subtle hover:border-border-default focus:ring-accent-primary/30 focus:border-accent-primary'
						}
            ${sizeStyles[size]}
            ${className}
          `}
					{...props}
				/>

				{/* Helper/Error Text */}
				{(helperText || errorText) && (
					<p className={`
            text-xs
            ${hasError ? 'text-error' : 'text-text-muted'}
          `}>
						{errorText || helperText}
					</p>
				)}
			</div>
		);
	}
);
