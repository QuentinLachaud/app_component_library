// ─────────────────────────────────────────────────────────────
// Hook: useSyncedSliderInput
// Purpose: Syncs a Slider and NumberInput to share state.
// Layer: Hooks
// Used by: Financial input forms where both slider and direct input are needed.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useMemo } from 'react';

// ─── Types ───
export interface UseSyncedSliderInputOptions {
	/** Initial value */
	initialValue?: number;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Step increment */
	step?: number;
	/** Controlled value */
	value?: number;
	/** Change handler */
	onChange?: (value: number) => void;
}

export interface UseSyncedSliderInputReturn {
	/** Current value */
	value: number;
	/** Update the value (clamps to min/max) */
	setValue: (value: number) => void;
	/** Props to spread on Slider component */
	sliderProps: {
		value: number;
		onChange: (value: number) => void;
		min: number;
		max: number;
		step: number;
	};
	/** Props to spread on NumberInput component */
	numberInputProps: {
		value: number;
		onChange: (value: number | undefined) => void;
		min: number;
		max: number;
		step: number;
	};
}

// ─── Hook ───
export function useSyncedSliderInput({
	initialValue = 0,
	min = 0,
	max = 100,
	step = 1,
	value: controlledValue,
	onChange,
}: UseSyncedSliderInputOptions = {}): UseSyncedSliderInputReturn {
	const [internalValue, setInternalValue] = useState(initialValue);

	// Use controlled value if provided
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;

	// ─── Clamp Helper ───
	const clamp = useCallback((val: number) => {
		return Math.min(max, Math.max(min, val));
	}, [min, max]);

	// ─── Set Value Handler ───
	const setValue = useCallback((newValue: number) => {
		const clamped = clamp(newValue);

		if (!isControlled) {
			setInternalValue(clamped);
		}

		onChange?.(clamped);
	}, [clamp, isControlled, onChange]);

	// ─── Number Input Handler (handles undefined for empty input) ───
	const handleNumberInputChange = useCallback((newValue: number | undefined) => {
		if (newValue === undefined) {
			// Keep current value when input is cleared
			return;
		}
		setValue(newValue);
	}, [setValue]);

	return useMemo(() => ({
		value,
		setValue,
		sliderProps: {
			value,
			onChange: setValue,
			min,
			max,
			step,
		},
		numberInputProps: {
			value,
			onChange: handleNumberInputChange,
			min,
			max,
			step,
		},
	}), [value, setValue, handleNumberInputChange, min, max, step]);
}
