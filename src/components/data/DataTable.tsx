// ─────────────────────────────────────────────────────────────
// Component: DataTable
// Purpose: Generic data table with sorting, responsive design.
// Layer: Data Display
// Used by: Financial summaries, tax breakdowns, scenario comparisons.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

// ─── Types ───
export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
	/** Unique column identifier */
	id: string;
	/** Column header label */
	header: ReactNode;
	/** Accessor function to get cell value */
	accessor: (row: T) => ReactNode;
	/** Enable sorting for this column */
	sortable?: boolean;
	/** Custom sort comparator */
	sortFn?: (a: T, b: T) => number;
	/** Column width (CSS value) */
	width?: string;
	/** Text alignment */
	align?: 'left' | 'center' | 'right';
	/** Additional header cell classes */
	headerClassName?: string;
	/** Additional cell classes */
	cellClassName?: string;
}

export interface DataTableProps<T> {
	/** Column definitions */
	columns: ColumnDef<T>[];
	/** Data rows */
	data: T[];
	/** Unique key accessor for each row */
	getRowKey: (row: T, index: number) => string | number;
	/** Enable zebra striping */
	striped?: boolean;
	/** Enable hover highlighting */
	hoverable?: boolean;
	/** Compact mode */
	compact?: boolean;
	/** Empty state message */
	emptyMessage?: ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Max height with internal scroll */
	maxHeight?: string;
}

// ─── Alignment Styles ───
const alignStyles: Record<'left' | 'center' | 'right', string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
};

// ─── Component ───
export function DataTable<T>({
	columns,
	data,
	getRowKey,
	striped = true,
	hoverable = true,
	compact = false,
	emptyMessage = 'No data available',
	className = '',
	maxHeight,
}: DataTableProps<T>) {
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>(null);

	// ─── Sorting Logic ───
	const handleSort = useCallback((columnId: string) => {
		if (sortColumn === columnId) {
			// Cycle: asc -> desc -> null
			setSortDirection(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
			if (sortDirection === 'desc') {
				setSortColumn(null);
			}
		} else {
			setSortColumn(columnId);
			setSortDirection('asc');
		}
	}, [sortColumn, sortDirection]);

	// ─── Sorted Data ───
	const sortedData = (() => {
		if (!sortColumn || !sortDirection) return data;

		const column = columns.find(c => c.id === sortColumn);
		if (!column) return data;

		return [...data].sort((a, b) => {
			if (column.sortFn) {
				const result = column.sortFn(a, b);
				return sortDirection === 'desc' ? -result : result;
			}

			// Default comparison
			const aVal = column.accessor(a);
			const bVal = column.accessor(b);

			if (typeof aVal === 'number' && typeof bVal === 'number') {
				return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
			}

			const aStr = String(aVal ?? '');
			const bStr = String(bVal ?? '');
			return sortDirection === 'asc'
				? aStr.localeCompare(bStr)
				: bStr.localeCompare(aStr);
		});
	})();

	// ─── Cell Padding ───
	const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3';

	// ─── Sort Icon ───
	const SortIcon = ({ columnId }: { columnId: string }) => {
		const isActive = sortColumn === columnId;
		const Icon = !isActive
			? ChevronsUpDown
			: sortDirection === 'asc'
				? ChevronUp
				: ChevronDown;

		return (
			<Icon
				size={14}
				className={`
          ml-1 inline-block
          ${isActive ? 'text-accent-primary' : 'text-text-muted'}
        `}
			/>
		);
	};

	return (
		<div
			className={`
        w-full overflow-hidden
        border border-border-subtle
        rounded-lg
        ${className}
      `}
		>
			<div
				className="overflow-auto"
				style={maxHeight ? { maxHeight } : undefined}
			>
				<table className="w-full border-collapse">
					{/* Header */}
					<thead className="bg-bg-surface sticky top-0 z-10">
						<tr>
							{columns.map(column => (
								<th
									key={column.id}
									className={`
                    ${cellPadding}
                    text-xs font-semibold uppercase tracking-wider
                    text-text-secondary
                    border-b border-border-subtle
                    ${alignStyles[column.align || 'left']}
                    ${column.sortable ? 'cursor-pointer select-none hover:text-text-primary' : ''}
                    ${column.headerClassName || ''}
                  `}
									style={column.width ? { width: column.width } : undefined}
									onClick={() => column.sortable && handleSort(column.id)}
								>
									<span className="inline-flex items-center">
										{column.header}
										{column.sortable && <SortIcon columnId={column.id} />}
									</span>
								</th>
							))}
						</tr>
					</thead>

					{/* Body */}
					<tbody>
						{sortedData.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length}
									className={`
                    ${cellPadding}
                    text-center text-text-muted
                  `}
								>
									{emptyMessage}
								</td>
							</tr>
						) : (
							sortedData.map((row, index) => (
								<tr
									key={getRowKey(row, index)}
									className={`
                    border-b border-border-subtle
                    last:border-b-0
                    ${striped && index % 2 === 1 ? 'bg-bg-surface/50' : 'bg-transparent'}
                    ${hoverable ? 'hover:bg-bg-hover transition-colors' : ''}
                  `}
								>
									{columns.map(column => (
										<td
											key={column.id}
											className={`
                        ${cellPadding}
                        text-sm text-text-primary
                        ${alignStyles[column.align || 'left']}
                        ${column.cellClassName || ''}
                      `}
										>
											{column.accessor(row)}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
