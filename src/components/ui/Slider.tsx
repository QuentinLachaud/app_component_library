// ─────────────────────────────────────────────────────────────
// Component: Slider
// Purpose: Range input with custom styling and optional value display.
// Layer: UI Primitive
// Used by: Percentage inputs, amount adjustments, configuration.
// ─────────────────────────────────────────────────────────────

import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId, useCallback } from 'react';

// ─── Types ───
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
	/** Current value */
	value?: number;
	/** Change handler */
	onChange?: (value: number) => void;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Step increment */
	step?: number;
	/** Label displayed above the slider */
	label?: string;
	/** Show current value badge */
	showValue?: boolean;
	/** Format function for displayed value */
	formatValue?: (value: number) => string;
	/** Orientation */
	orientation?: 'horizontal' | 'vertical';
	/** Full width mode */
	fullWidth?: boolean;
}

// ─── Component ───
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
	function Slider(
		{
			value = 0,
			onChange,
			min = 0,
			max = 100,
			step = 1,
			label,
			showValue = true,
			formatValue = (v) => String(v),
			orientation = 'horizontal',
			fullWidth = true,
			disabled,
			className = '',
			id,
			...props
		},
		ref
	) {
		const generatedId = useId();
		const inputId = id || generatedId;

		// Calculate fill percentage for the track
		const fillPercent = ((value - min) / (max - min)) * 100;

		const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(parseFloat(e.target.value));
		}, [onChange]);

		const isVertical = orientation === 'vertical';

		return (
			<div
				className={`
          flex gap-3
          ${isVertical ? 'flex-col h-full' : 'flex-col'}
          ${fullWidth && !isVertical ? 'w-full' : ''}
        `}
			>
				{/* Label and Value Row */}
				{(label || showValue) && (
					<div className="flex items-center justify-between">
						{label && (
							<label
								htmlFor={inputId}
								className="text-sm font-medium text-text-secondary"
							>
								{label}
							</label>
						)}
						{showValue && (
							<span className="
                text-sm font-medium
                text-accent-primary
                tabular-nums
              ">
								{formatValue(value)}
							</span>
						)}
					</div>
				)}

				{/* Slider Track */}
				<div className={`relative ${isVertical ? 'flex-1 w-2' : 'h-2 w-full'}`}>
					<input
						ref={ref}
						id={inputId}
						type="range"
						value={value}
						onChange={handleChange}
						min={min}
						max={max}
						step={step}
						disabled={disabled}
						className={`
              absolute inset-0
              w-full h-full
              appearance-none
              bg-transparent
              cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-50
              
              /* Track styling */
              [&::-webkit-slider-runnable-track]:h-2
              [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-runnable-track]:bg-bg-overlay
              
              /* Thumb styling */
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-accent-primary
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-bg-base
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-[var(--transition-fast)]
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:-mt-1
              
              /* Firefox */
              [&::-moz-range-track]:h-2
              [&::-moz-range-track]:rounded-full
              [&::-moz-range-track]:bg-bg-overlay
              
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-accent-primary
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-bg-base
              [&::-moz-range-thumb]:cursor-pointer
              
              /* Focus styles */
              focus:outline-none
              focus-visible:[&::-webkit-slider-thumb]:ring-2
              focus-visible:[&::-webkit-slider-thumb]:ring-accent-primary/50
              
              ${className}
            `}
						style={{
							// Custom property for the fill gradient
							background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${fillPercent}%, var(--bg-overlay) ${fillPercent}%, var(--bg-overlay) 100%)`,
							borderRadius: 'var(--radius-full)',
							height: '0.5rem',
						}}
						{...props}
					/>
				</div>
			</div>
		);
	}
);
