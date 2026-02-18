// ─────────────────────────────────────────────────────────────
// Component: Tabs
// Purpose: Tabbed navigation for organizing content into sections.
// Layer: UI Primitive
// Used by: Settings pages, multi-section forms, content organization.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { useState } from 'react';

// ─── Types ───
export interface Tab {
	/** Unique identifier for the tab */
	id: string;
	/** Display label for the tab */
	label: string;
	/** Content to display when tab is active */
	content: ReactNode;
	/** Optional icon to display before label */
	icon?: ReactNode;
	/** Whether this tab is disabled */
	disabled?: boolean;
	/** Optional badge count to display */
	badge?: number;
}

export interface TabsProps {
	/** Array of tab configurations */
	tabs: Tab[];
	/** Currently active tab ID */
	activeTab?: string;
	/** Callback when tab changes */
	onTabChange?: (tabId: string) => void;
	/** Variant style */
	variant?: 'default' | 'pills' | 'underline';
	/** Size preset */
	size?: 'sm' | 'md' | 'lg';
	/** Whether tabs should take full width */
	fullWidth?: boolean;
}

// ─── Size Styles ───
const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'px-3 py-1.5 text-xs',
	md: 'px-4 py-2 text-sm',
	lg: 'px-5 py-3 text-base',
};

// ─── Variant Styles ───
const variantStyles = {
	default: {
		container: 'border-b border-border-default',
		tab: 'border-b-2 border-transparent',
		active: 'border-accent-primary text-accent-primary',
		inactive: 'text-text-secondary hover:text-text-primary hover:border-border-hover',
	},
	pills: {
		container: 'bg-bg-muted rounded-lg p-1 gap-1',
		tab: 'rounded-md',
		active: 'bg-bg-surface text-accent-primary shadow-sm',
		inactive: 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/50',
	},
	underline: {
		container: 'gap-6',
		tab: 'border-b-2 border-transparent',
		active: 'border-accent-primary text-accent-primary',
		inactive: 'text-text-secondary hover:text-text-primary',
	},
};

// ─── Component ───
export function Tabs({
	tabs,
	activeTab: controlledActiveTab,
	onTabChange,
	variant = 'default',
	size = 'md',
	fullWidth = false,
}: TabsProps) {
	const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
	const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

	const handleTabClick = (tabId: string) => {
		if (controlledActiveTab === undefined) {
			setInternalActiveTab(tabId);
		}
		onTabChange?.(tabId);
	};

	const styles = variantStyles[variant];
	const activeTabData = tabs.find((tab) => tab.id === activeTab);

	return (
		<div className="flex flex-col">
			{/* Tab List */}
			<div
				role="tablist"
				className={`
          flex
          ${styles.container}
          ${fullWidth ? 'w-full' : ''}
        `}
			>
				{tabs.map((tab) => {
					const isActive = tab.id === activeTab;
					const isDisabled = tab.disabled;

					return (
						<button
							key={tab.id}
							role="tab"
							aria-selected={isActive}
							aria-disabled={isDisabled}
							disabled={isDisabled}
							onClick={() => !isDisabled && handleTabClick(tab.id)}
							className={`
                flex items-center gap-2
                font-medium
                transition-all duration-[var(--transition-fast)]
                focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2
                ${sizeStyles[size]}
                ${styles.tab}
                ${isActive ? styles.active : styles.inactive}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${fullWidth ? 'flex-1 justify-center' : ''}
              `}
						>
							{/* Icon */}
							{tab.icon && (
								<span className="flex-shrink-0">
									{tab.icon}
								</span>
							)}

							{/* Label */}
							<span>{tab.label}</span>

							{/* Badge */}
							{tab.badge !== undefined && (
								<span
									className={`
                    inline-flex items-center justify-center
                    min-w-[20px] h-5
                    px-1.5
                    text-[10px] font-semibold
                    rounded-full
                    ${isActive ? 'bg-accent-primary text-white' : 'bg-bg-muted text-text-muted'}
                  `}
								>
									{tab.badge}
								</span>
							)}
						</button>
					);
				})}
			</div>

			{/* Tab Content */}
			<div
				role="tabpanel"
				className="mt-4"
				aria-labelledby={activeTab}
			>
				{activeTabData?.content}
			</div>
		</div>
	);
}
