// ─────────────────────────────────────────────────────────────
// Component: Modal
// Purpose: Modal dialog for important interactions and content overlays.
// Layer: UI Primitive
// Used by: Confirmations, forms, detailed views throughout the application.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

// ─── Types ───
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
	/** Whether the modal is open */
	isOpen: boolean;
	/** Callback when modal should close */
	onClose: () => void;
	/** Modal title */
	title?: string;
	/** Modal content */
	children: ReactNode;
	/** Footer content (typically action buttons) */
	footer?: ReactNode;
	/** Size preset */
	size?: ModalSize;
	/** Whether clicking backdrop closes modal */
	closeOnBackdropClick?: boolean;
	/** Whether pressing Escape closes modal */
	closeOnEscape?: boolean;
	/** Whether to show close button */
	showCloseButton?: boolean;
}

// ─── Size Styles ───
const sizeStyles: Record<ModalSize, string> = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	xl: 'max-w-xl',
	full: 'max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)]',
};

// ─── Component ───
export function Modal({
	isOpen,
	onClose,
	title,
	children,
	footer,
	size = 'md',
	closeOnBackdropClick = true,
	closeOnEscape = true,
	showCloseButton = true,
}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	// Handle Escape key
	useEffect(() => {
		if (!isOpen || !closeOnEscape) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, closeOnEscape, onClose]);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	// Focus trap
	useEffect(() => {
		if (!isOpen) return;

		const modal = modalRef.current;
		if (!modal) return;

		const focusableElements = modal.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleTab = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		document.addEventListener('keydown', handleTab);
		firstElement?.focus();

		return () => document.removeEventListener('keydown', handleTab);
	}, [isOpen]);

	// Handle backdrop click
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (closeOnBackdropClick && e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? 'modal-title' : undefined}
		>
			{/* Modal Container */}
			<div
				ref={modalRef}
				className={`
          relative
          w-full
          ${sizeStyles[size]}
          bg-bg-surface
          rounded-lg
          shadow-xl
          flex flex-col
          max-h-[90vh]
          animate-in zoom-in-95 slide-in-from-bottom-4
        `}
			>
				{/* Header */}
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between p-4 border-b border-border-default">
						{title && (
							<h2
								id="modal-title"
								className="text-lg font-semibold text-text-primary"
							>
								{title}
							</h2>
						)}
						{showCloseButton && (
							<IconButton
								icon={<X size={20} />}
								onClick={onClose}
								variant="ghost"
								size="sm"
								label="Close modal"
								className="ml-auto"
							/>
						)}
					</div>
				)}

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-4">
					{children}
				</div>

				{/* Footer */}
				{footer && (
					<div className="flex items-center justify-end gap-3 p-4 border-t border-border-default">
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}
