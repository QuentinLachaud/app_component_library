// ─────────────────────────────────────────────────────────────
// Component: Select
// Purpose: Dropdown select input with label, helper, and error states.
// Layer: UI Primitive
// Used by: Forms, filters, configuration options throughout the application.
// ─────────────────────────────────────────────────────────────

import type { SelectHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';

// ─── Types ───
export interface SelectOption {
	/** Value of the option */
	value: string;
	/** Display label for the option */
	label: string;
	/** Whether this option is disabled */
	disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
	/** Label displayed above the select */
	label?: string;
	/** Helper text displayed below the select */
	helperText?: string;
	/** Error message - replaces helper text and applies error styling */
	errorText?: string;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
	/** Full width mode */
	fullWidth?: boolean;
	/** Options to display in the dropdown */
	options: SelectOption[];
	/** Placeholder text when no value is selected */
	placeholder?: string;
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'px-3 py-1.5 text-xs',
	md: 'px-3 py-2 text-sm',
	lg: 'px-4 py-3 text-base',
};

// ─── Component ───
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	function Select(
		{
			label,
			helperText,
			errorText,
			size = 'md',
			fullWidth = false,
			disabled,
			className = '',
			id,
			options,
			placeholder,
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

				{/* Select Container */}
				<div className="relative">
					<select
						ref={ref}
						id={inputId}
						disabled={disabled}
						className={`
              w-full
              bg-bg-surface
              border rounded-md
              text-text-primary
              transition-colors duration-[var(--transition-fast)]
              focus:outline-none focus:ring-2 focus:ring-offset-0
              appearance-none
              cursor-pointer
              ${hasError
								? 'border-error focus:ring-error'
								: 'border-border-default focus:ring-accent-primary focus:border-accent-primary'
							}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${sizeStyles[size]}
              pr-10
              ${className}
            `}
						{...props}
					>
						{placeholder && (
							<option value="" disabled>
								{placeholder}
							</option>
						)}
						{options.map((option) => (
							<option
								key={option.value}
								value={option.value}
								disabled={option.disabled}
							>
								{option.label}
							</option>
						))}
					</select>

					{/* Chevron Icon */}
					<div
						className={`
              absolute right-3 top-1/2 -translate-y-1/2
              pointer-events-none
              text-text-muted
              ${disabled ? 'opacity-50' : ''}
            `}
					>
						<ChevronDown size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
					</div>
				</div>

				{/* Helper or Error Text */}
				{(helperText || errorText) && (
					<span
						className={`
              text-xs
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
