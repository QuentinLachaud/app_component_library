// ─────────────────────────────────────────────────────────────
// Component: Radio & RadioGroup
// Purpose: Radio button input with label and error states.
// Layer: UI Primitive
// Used by: Forms, single-choice options throughout the application.
// ─────────────────────────────────────────────────────────────

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';

// ─── Types ───
export interface RadioOption {
	/** Value of the radio option */
	value: string;
	/** Display label for the option */
	label: string;
	/** Whether this option is disabled */
	disabled?: boolean;
	/** Optional helper text for this option */
	helperText?: string;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
	/** Label displayed next to the radio button */
	label?: string;
	/** Helper text displayed below the radio button */
	helperText?: string;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
}

export interface RadioGroupProps {
	/** Legend/label for the group */
	label?: string;
	/** Helper text displayed below the group */
	helperText?: string;
	/** Error message - replaces helper text and applies error styling */
	errorText?: string;
	/** Currently selected value */
	value?: string;
	/** Callback when value changes */
	onChange?: (value: string) => void;
	/** Radio options to display */
	options: RadioOption[];
	/** Name attribute for the radio group */
	name: string;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
	/** Whether the entire group is disabled */
	disabled?: boolean;
	/** Layout direction */
	direction?: 'vertical' | 'horizontal';
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
};

// ─── Radio Component ───
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	function Radio(
		{
			label,
			helperText,
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

		return (
			<div className="flex flex-col gap-1.5">
				<div className="flex items-start gap-2">
					{/* Radio Container */}
					<div className="relative flex items-center">
						{/* Hidden Native Radio */}
						<input
							ref={ref}
							type="radio"
							id={inputId}
							disabled={disabled}
							checked={checked}
							className="sr-only peer"
							{...props}
						/>

						{/* Custom Radio */}
						<label
							htmlFor={inputId}
							className={`
                flex items-center justify-center
                ${sizeStyles[size]}
                bg-bg-surface
                border-2 rounded-full
                cursor-pointer
                transition-all duration-[var(--transition-fast)]
                peer-focus:ring-2 peer-focus:ring-offset-0 peer-focus:ring-accent-primary
                border-border-default
                peer-checked:border-accent-primary
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent-primary'}
                ${className}
              `}
						>
							{/* Inner Dot */}
							{checked && (
								<div
									className={`
                    rounded-full
                    bg-accent-primary
                    ${size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}
                  `}
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

				{/* Helper Text */}
				{helperText && (
					<span className="text-xs ml-7 text-text-muted">
						{helperText}
					</span>
				)}
			</div>
		);
	}
);

// ─── RadioGroup Component ───
export function RadioGroup({
	label,
	helperText,
	errorText,
	value,
	onChange,
	options,
	name,
	size = 'md',
	disabled,
	direction = 'vertical',
}: RadioGroupProps) {
	const hasError = Boolean(errorText);

	return (
		<fieldset className="flex flex-col gap-3">
			{/* Legend/Label */}
			{label && (
				<legend className="text-sm font-medium text-text-secondary mb-1">
					{label}
				</legend>
			)}

			{/* Radio Options */}
			<div
				className={`
          flex gap-4
          ${direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
        `}
			>
				{options.map((option) => (
					<Radio
						key={option.value}
						name={name}
						value={option.value}
						label={option.label}
						helperText={option.helperText}
						size={size}
						checked={value === option.value}
						onChange={() => onChange?.(option.value)}
						disabled={disabled || option.disabled}
					/>
				))}
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
		</fieldset>
	);
}
