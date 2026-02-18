// ─────────────────────────────────────────────────────────────
// Hook: useTheme
// Purpose: Manages light/dark theme state and accent color customization.
// Layer: Hooks
// Used by: Theme toggle buttons, settings panels.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useMemo } from 'react';

// ─── Types ───
export type ThemeMode = 'light' | 'dark' | 'system';

export interface UseThemeOptions {
	/** Default theme mode */
	defaultMode?: ThemeMode;
	/** Storage key for persisting theme */
	storageKey?: string;
}

export interface UseThemeReturn {
	/** Current theme mode setting */
	mode: ThemeMode;
	/** Resolved theme (always 'light' or 'dark') */
	resolvedTheme: 'light' | 'dark';
	/** Set theme mode */
	setMode: (mode: ThemeMode) => void;
	/** Toggle between light and dark */
	toggle: () => void;
	/** Set custom accent color (HSL values: "h s% l%") */
	setAccentColor: (hsl: string) => void;
	/** Current accent color HSL */
	accentColor: string;
}

// ─── Default Accent ───
const DEFAULT_ACCENT = '186 100% 54%'; // Cyan

// ─── Hook ───
export function useTheme({
	defaultMode = 'system',
	storageKey = 'theme-mode',
}: UseThemeOptions = {}): UseThemeReturn {
	// Initialize from localStorage or default
	const [mode, setModeState] = useState<ThemeMode>(() => {
		if (typeof window === 'undefined') return defaultMode;
		const stored = localStorage.getItem(storageKey);
		return (stored as ThemeMode) || defaultMode;
	});

	const [accentColor, setAccentColorState] = useState<string>(() => {
		if (typeof window === 'undefined') return DEFAULT_ACCENT;
		return localStorage.getItem('accent-color') || DEFAULT_ACCENT;
	});

	// Resolve system preference
	const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
		if (typeof window === 'undefined') return 'dark';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	});

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handler = (e: MediaQueryListEvent) => {
			setSystemTheme(e.matches ? 'dark' : 'light');
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	// Compute resolved theme
	const resolvedTheme = mode === 'system' ? systemTheme : mode;

	// Apply theme to document
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', resolvedTheme);
	}, [resolvedTheme]);

	// Apply accent color
	useEffect(() => {
		document.documentElement.style.setProperty('--accent-highlight', accentColor);
	}, [accentColor]);

	// ─── Actions ───
	const setMode = useCallback((newMode: ThemeMode) => {
		setModeState(newMode);
		localStorage.setItem(storageKey, newMode);
	}, [storageKey]);

	const toggle = useCallback(() => {
		const next = resolvedTheme === 'dark' ? 'light' : 'dark';
		setMode(next);
	}, [resolvedTheme, setMode]);

	const setAccentColor = useCallback((hsl: string) => {
		setAccentColorState(hsl);
		localStorage.setItem('accent-color', hsl);
	}, []);

	return useMemo(() => ({
		mode,
		resolvedTheme,
		setMode,
		toggle,
		setAccentColor,
		accentColor,
	}), [mode, resolvedTheme, setMode, toggle, setAccentColor, accentColor]);
}

// ─── Preset Accent Colors ───
export const ACCENT_PRESETS = {
	cyan: '186 100% 54%',
	blue: '217 91% 60%',
	purple: '262 83% 58%',
	pink: '330 81% 60%',
	rose: '350 89% 60%',
	orange: '25 95% 53%',
	amber: '38 92% 50%',
	green: '142 71% 45%',
	teal: '168 76% 42%',
} as const;

export type AccentPreset = keyof typeof ACCENT_PRESETS;
