// ─────────────────────────────────────────────────────────────
// Hook: usePanelCollapse
// Purpose: Manages expand/collapse state with controlled/uncontrolled support.
// Layer: Hooks
// Used by: CollapsiblePanel, any collapsible containers.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useMemo } from 'react';

// ─── Types ───
export interface UsePanelCollapseOptions {
	/** Default expanded state for uncontrolled usage */
	defaultExpanded?: boolean;
	/** Controlled expanded state - overrides internal state */
	isExpanded?: boolean;
	/** Callback when toggle is triggered */
	onToggle?: (isExpanded: boolean) => void;
}

export interface UsePanelCollapseReturn {
	/** Current expanded state */
	expanded: boolean;
	/** Toggle the expanded state */
	toggle: () => void;
	/** Expand the panel */
	expand: () => void;
	/** Collapse the panel */
	collapse: () => void;
	/** Whether the component is controlled externally */
	isControlled: boolean;
}

// ─── Hook ───
export function usePanelCollapse({
	defaultExpanded = true,
	isExpanded,
	onToggle,
}: UsePanelCollapseOptions = {}): UsePanelCollapseReturn {
	// Track internal state for uncontrolled usage
	const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

	// Determine if we're in controlled mode
	const isControlled = isExpanded !== undefined;

	// Use controlled value if provided, otherwise internal
	const expanded = isControlled ? isExpanded : internalExpanded;

	// ─── Actions ───
	const toggle = useCallback(() => {
		const nextValue = !expanded;

		if (!isControlled) {
			setInternalExpanded(nextValue);
		}

		onToggle?.(nextValue);
	}, [expanded, isControlled, onToggle]);

	const expand = useCallback(() => {
		if (!expanded) {
			if (!isControlled) {
				setInternalExpanded(true);
			}
			onToggle?.(true);
		}
	}, [expanded, isControlled, onToggle]);

	const collapse = useCallback(() => {
		if (expanded) {
			if (!isControlled) {
				setInternalExpanded(false);
			}
			onToggle?.(false);
		}
	}, [expanded, isControlled, onToggle]);

	return useMemo(() => ({
		expanded,
		toggle,
		expand,
		collapse,
		isControlled,
	}), [expanded, toggle, expand, collapse, isControlled]);
}
