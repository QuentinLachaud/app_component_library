// ─────────────────────────────────────────────────────────────
// Component: Alert
// Purpose: Notification/alert message for user feedback and information.
// Layer: UI Primitive
// Used by: Form validation, system messages, contextual information.
// ─────────────────────────────────────────────────────────────

import type { HTMLAttributes, ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

// ─── Types ───
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
	/** Visual variant */
	variant?: AlertVariant;
	/** Title of the alert */
	title?: string;
	/** Content of the alert */
	children: ReactNode;
	/** Whether to show an icon */
	showIcon?: boolean;
	/** Whether the alert can be dismissed */
	dismissible?: boolean;
	/** Callback when alert is dismissed */
	onDismiss?: () => void;
}

// ─── Variant Styles ───
const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
	info: {
		bg: 'bg-accent-secondary/10',
		border: 'border-accent-secondary/30',
		text: 'text-text-primary',
		icon: 'text-accent-secondary',
	},
	success: {
		bg: 'bg-success/10',
		border: 'border-success/30',
		text: 'text-text-primary',
		icon: 'text-success',
	},
	warning: {
		bg: 'bg-warning/10',
		border: 'border-warning/30',
		text: 'text-text-primary',
		icon: 'text-warning',
	},
	error: {
		bg: 'bg-error/10',
		border: 'border-error/30',
		text: 'text-text-primary',
		icon: 'text-error',
	},
};

// ─── Icon Map ───
const iconMap: Record<AlertVariant, typeof Info> = {
	info: Info,
	success: CheckCircle,
	warning: AlertTriangle,
	error: AlertCircle,
};

// ─── Component ───
export function Alert({
	variant = 'info',
	title,
	children,
	showIcon = true,
	dismissible = false,
	onDismiss,
	className = '',
	...props
}: AlertProps) {
	const styles = variantStyles[variant];
	const Icon = iconMap[variant];

	return (
		<div
			role="alert"
			className={`
        relative
        flex gap-3
        p-4
        rounded-lg
        border
        ${styles.bg}
        ${styles.border}
        ${styles.text}
        ${className}
      `}
			{...props}
		>
			{/* Icon */}
			{showIcon && (
				<div className={`flex-shrink-0 ${styles.icon}`}>
					<Icon size={20} />
				</div>
			)}

			{/* Content */}
			<div className="flex-1 min-w-0">
				{title && (
					<div className="font-semibold text-sm mb-1">
						{title}
					</div>
				)}
				<div className="text-sm">
					{children}
				</div>
			</div>

			{/* Dismiss Button */}
			{dismissible && (
				<button
					type="button"
					onClick={onDismiss}
					className={`
            flex-shrink-0
            p-1
            -m-1
            rounded
            transition-colors duration-[var(--transition-fast)]
            hover:bg-black/10
            focus:outline-none focus:ring-2 focus:ring-accent-primary
            ${styles.icon}
          `}
					aria-label="Dismiss alert"
				>
					<X size={16} />
				</button>
			)}
		</div>
	);
}
