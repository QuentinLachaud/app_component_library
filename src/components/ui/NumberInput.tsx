// ─────────────────────────────────────────────────────────────
// Component: NumberInput
// Purpose: Numeric input with custom increment/decrement controls.
// Layer: UI Primitive
// Used by: Financial inputs, age, percentages, amounts.
// ─────────────────────────────────────────────────────────────

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';

// ─── Types ───
export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
	/** Current value (controlled) */
	value?: number | string;
	/** Change handler */
	onChange?: (value: number | undefined) => void;
	/** Label displayed above the input */
	label?: string;
	/** Helper text displayed below the input */
	helperText?: string;
	/** Error message */
	errorText?: string;
	/** Minimum allowed value */
	min?: number;
	/** Maximum allowed value */
	max?: number;
	/** Increment step for controls */
	step?: number;
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
	/** Full width mode */
	fullWidth?: boolean;
	/** Hide the increment/decrement controls */
	hideControls?: boolean;
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', { input: string; control: string; icon: number }> = {
	sm: { input: 'px-3 py-1.5 text-xs', control: 'w-7 h-7', icon: 12 },
	md: { input: 'px-3 py-2 text-sm', control: 'w-8 h-8', icon: 14 },
	lg: { input: 'px-4 py-3 text-base', control: 'w-10 h-10', icon: 16 },
};

// ─── Component ───
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	function NumberInput(
		{
			value,
			onChange,
			label,
			helperText,
			errorText,
			min,
			max,
			step = 1,
			size = 'md',
			fullWidth = false,
			hideControls = false,
			disabled,
			className = '',
			id,
			...props
		},
		ref
	) {
		const generatedId = useId();
		const inputId = id || generatedId;
		const hasError = Boolean(errorText);
		const styles = sizeStyles[size];

		// Parse current value
		const numericValue = typeof value === 'string' ? parseFloat(value) : value;

		// ─── Handlers ───
		const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value;
			if (rawValue === '' || rawValue === '-') {
				onChange?.(undefined);
				return;
			}
			const parsed = parseFloat(rawValue);
			if (!isNaN(parsed)) {
				onChange?.(parsed);
			}
		}, [onChange]);

		const handleIncrement = useCallback(() => {
			const current = numericValue ?? min ?? 0;
			const next = current + step;
			if (max === undefined || next <= max) {
				onChange?.(next);
			}
		}, [numericValue, min, max, step, onChange]);

		const handleDecrement = useCallback(() => {
			const current = numericValue ?? max ?? 0;
			const next = current - step;
			if (min === undefined || next >= min) {
				onChange?.(next);
			}
		}, [numericValue, min, max, step, onChange]);

		// ─── Control Disabled States ───
		const isDecrementDisabled = disabled || (min !== undefined && numericValue !== undefined && numericValue <= min);
		const isIncrementDisabled = disabled || (max !== undefined && numericValue !== undefined && numericValue >= max);

		return (
			<div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
				{/* Label */}
				{label && (
					<label
						htmlFor={inputId}
						className="text-sm font-medium text-text-secondary"
					>
						{label}
					</label>
				)}

				{/* Input with Controls */}
				<div className="relative flex items-center">
					{/* Input */}
					<input
						ref={ref}
						id={inputId}
						type="text"
						inputMode="decimal"
						value={value ?? ''}
						onChange={handleInputChange}
						disabled={disabled}
						className={`
              w-full
              bg-bg-surface
              border rounded-md
              text-text-primary text-right
              placeholder:text-text-muted
              transition-colors duration-[var(--transition-fast)]
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-overlay
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
              ${hasError
								? 'border-error focus:ring-error/30 focus:border-error'
								: 'border-border-subtle hover:border-border-default focus:ring-accent-primary/30 focus:border-accent-primary'
							}
              ${styles.input}
              ${!hideControls ? 'pr-20' : ''}
              ${className}
            `}
						{...props}
					/>

					{/* Increment/Decrement Controls */}
					{!hideControls && (
						<div className="absolute right-1 flex items-center gap-0.5">
							<button
								type="button"
								onClick={handleDecrement}
								disabled={isDecrementDisabled}
								className={`
                  flex items-center justify-center
                  rounded
                  text-text-muted
                  transition-colors duration-[var(--transition-fast)]
                  hover:bg-bg-hover hover:text-text-primary
                  disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                  ${styles.control}
                `}
								aria-label="Decrease value"
							>
								<Minus size={styles.icon} />
							</button>
							<button
								type="button"
								onClick={handleIncrement}
								disabled={isIncrementDisabled}
								className={`
                  flex items-center justify-center
                  rounded
                  text-text-muted
                  transition-colors duration-[var(--transition-fast)]
                  hover:bg-bg-hover hover:text-text-primary
                  disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                  ${styles.control}
                `}
								aria-label="Increase value"
							>
								<Plus size={styles.icon} />
							</button>
						</div>
					)}
				</div>

				{/* Helper/Error Text */}
				{(helperText || errorText) && (
					<p className={`text-xs ${hasError ? 'text-error' : 'text-text-muted'}`}>
						{errorText || helperText}
					</p>
				)}
			</div>
		);
	}
);
