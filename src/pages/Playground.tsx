// ─────────────────────────────────────────────────────────────
// Page: Playground
// Purpose: Interactive showcase of all component library components.
// Layer: Documentation
// Used by: Developers to explore and test components in isolation.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import {
	BarChart3,
	Table2,
	FileText,
	Plus,
	Settings,
	Download,
	ArrowRight,
	RefreshCw,
	Sun,
	Moon,
	Monitor,
	Palette,
	Bell,
	Info,
	User
} from 'lucide-react';
import {
	Panel,
	CollapsiblePanel,
	Button,
	IconButton,
	TextInput,
	NumberInput,
	Slider,
	SegmentedToggle,
	Select,
	Checkbox,
	RadioGroup,
	Toggle,
	Badge,
	Card,
	Alert,
	Tooltip,
	Tabs,
	Modal,
} from '../components/ui';
import { PageLayout, TopRibbon, BottomRibbon, TwoColumnLayout } from '../components/layout';
import { DataTable, type ColumnDef } from '../components/data';
import { useSyncedSliderInput, useResponsiveBreakpoints, useTheme, ACCENT_PRESETS, type AccentPreset } from '../hooks';

// ─── Sample Data for Table ───
interface SampleRow {
	id: number;
	name: string;
	value: number;
	change: number;
}

const sampleData: SampleRow[] = [
	{ id: 1, name: 'ISA Allowance', value: 20000, change: 2.5 },
	{ id: 2, name: 'SIPP Contribution', value: 40000, change: 0 },
	{ id: 3, name: 'Capital Gains', value: 12300, change: -5.2 },
	{ id: 4, name: 'Dividend Allowance', value: 1000, change: -50 },
	{ id: 5, name: 'Personal Allowance', value: 12570, change: 0 },
];

const columns: ColumnDef<SampleRow>[] = [
	{ id: 'name', header: 'Category', accessor: (row) => row.name, sortable: true },
	{
		id: 'value',
		header: 'Amount (£)',
		accessor: (row) => `£${row.value.toLocaleString()}`,
		align: 'right',
		sortable: true,
	},
	{
		id: 'change',
		header: 'YoY Change',
		accessor: (row) => (
			<span className={row.change > 0 ? 'text-success' : row.change < 0 ? 'text-error' : 'text-text-muted'}>
				{row.change > 0 ? '+' : ''}{row.change}%
			</span>
		),
		align: 'right',
		sortable: true,
		sortFn: (a, b) => a.change - b.change,
	},
];

// ─── Accent Color Button ───
function AccentColorButton({
	preset,
	isActive,
	onClick
}: {
	preset: AccentPreset;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			title={preset.charAt(0).toUpperCase() + preset.slice(1)}
			className={`
				w-6 h-6 rounded-full
				transition-all duration-[var(--transition-fast)]
				${isActive ? 'ring-2 ring-offset-2 ring-offset-bg-elevated ring-text-primary scale-110' : 'hover:scale-110'}
			`}
			style={{ backgroundColor: `hsl(${ACCENT_PRESETS[preset]})` }}
		/>
	);
}

// ─── Component ───
export function Playground() {
	// Theme and accent
	const { mode, setMode, setAccentColor, accentColor, resolvedTheme } = useTheme();

	// State for interactive demos
	const [viewMode, setViewMode] = useState<'chart' | 'table' | 'summary'>('chart');
	const [textValue, setTextValue] = useState('');
	const [numberValue, setNumberValue] = useState<number>(25000);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Synced slider + input demo
	const { sliderProps, numberInputProps } = useSyncedSliderInput({
		initialValue: 50,
		min: 0,
		max: 100,
		step: 5,
	});

	// Responsive info
	const { breakpoint, isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();

	// Simulate loading
	const handleLoadingDemo = () => {
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 2000);
	};

	// Get current accent preset name
	const currentAccentPreset = Object.entries(ACCENT_PRESETS).find(
		([, value]) => value === accentColor
	)?.[0] as AccentPreset | undefined;

	return (
		<PageLayout
			topRibbon={
				<TopRibbon
					sections={[
						{
							content: (
								<span className="text-sm font-medium text-text-primary">
									React Library Components Playground
								</span>
							)
						},
						{
							content: (
								<div className="flex items-center gap-2">
									<span className="text-xs text-text-muted">
										Breakpoint: <span className="text-accent-primary font-mono">{breakpoint}</span>
									</span>
									<span className="text-xs text-text-muted">
										{isMobile && '📱 Mobile'}
										{isTablet && '📱 Tablet'}
										{isDesktop && '🖥️ Desktop'}
									</span>
								</div>
							)
						},
						{
							content: (
								<SegmentedToggle
									options={[
										{ value: 'chart', label: 'Chart', icon: <BarChart3 size={14} /> },
										{ value: 'table', label: 'Table', icon: <Table2 size={14} /> },
										{ value: 'summary', label: 'Summary', icon: <FileText size={14} /> },
									]}
									value={viewMode}
									onChange={setViewMode}
									size="sm"
								/>
							),
						},
						{
							content: (
								<div className="flex items-center gap-2">
									{/* Theme Toggle */}
									<SegmentedToggle
										options={[
											{ value: 'light', label: '', icon: <Sun size={14} /> },
											{ value: 'dark', label: '', icon: <Moon size={14} /> },
											{ value: 'system', label: '', icon: <Monitor size={14} /> },
										]}
										value={mode}
										onChange={setMode}
										size="sm"
										ariaLabel="Theme mode"
									/>
								</div>
							),
							grow: true,
						},
					]}
				/>
			}
			bottomRibbon={
				<BottomRibbon>
					<div className="flex items-center gap-3 text-sm text-text-secondary">
						<span>💰 Sample Deposit</span>
						<span className="text-accent-primary font-medium">£5,000</span>
						<span className="text-text-muted">→</span>
						<span>ISA</span>
					</div>
					<div className="flex items-center gap-3 text-sm text-text-secondary ml-auto">
						<span>📊 FIRE Target</span>
						<span className="text-accent-secondary font-medium">£1,250,000</span>
					</div>
				</BottomRibbon>
			}
		>
			<TwoColumnLayout
				leftWidth={4}
				left={
					<div className="flex flex-col gap-4">
						{/* Theme & Accent Panel */}
						<CollapsiblePanel title="Theme & Accent Color" defaultExpanded>
							<div className="flex flex-col gap-4">
								{/* Theme Mode */}
								<div className="flex flex-col gap-2">
									<span className="text-sm text-text-secondary">Theme Mode</span>
									<div className="flex items-center gap-3">
										<SegmentedToggle
											options={[
												{ value: 'light', label: 'Light', icon: <Sun size={14} /> },
												{ value: 'dark', label: 'Dark', icon: <Moon size={14} /> },
												{ value: 'system', label: 'System', icon: <Monitor size={14} /> },
											]}
											value={mode}
											onChange={setMode}
											size="md"
										/>
										<span className="text-xs text-text-muted">
											Current: {resolvedTheme}
										</span>
									</div>
								</div>

								{/* Accent Color Picker */}
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<Palette size={14} className="text-text-muted" />
										<span className="text-sm text-text-secondary">Accent Color</span>
									</div>
									<div className="flex flex-wrap gap-2">
										{(Object.keys(ACCENT_PRESETS) as AccentPreset[]).map((preset) => (
											<AccentColorButton
												key={preset}
												preset={preset}
												isActive={currentAccentPreset === preset}
												onClick={() => setAccentColor(ACCENT_PRESETS[preset])}
											/>
										))}
									</div>
									<p className="text-xs text-text-muted mt-1">
										Click to change the app's accent color. This updates all buttons, sliders, and highlights.
									</p>
								</div>
							</div>
						</CollapsiblePanel>

						{/* Buttons Panel */}
						<CollapsiblePanel title="Buttons" defaultExpanded>
							<div className="flex flex-col gap-4">
								{/* Button Variants */}
								<div className="flex flex-wrap gap-2">
									<Button variant="primary" leftIcon={<Plus size={16} />}>
										Primary
									</Button>
									<Button variant="secondary">
										Secondary
									</Button>
									<Button variant="ghost">
										Ghost
									</Button>
								</div>

								{/* Sizes */}
								<div className="flex flex-wrap gap-2 items-center">
									<Button size="sm">Small</Button>
									<Button size="md">Medium</Button>
									<Button size="lg">Large</Button>
								</div>

								{/* States */}
								<div className="flex flex-wrap gap-2">
									<Button disabled>Disabled</Button>
									<Button isLoading onClick={handleLoadingDemo}>
										{isLoading ? 'Loading...' : 'Click Me'}
									</Button>
									<Button
										variant="primary"
										isLoading={isLoading}
										onClick={handleLoadingDemo}
									>
										Test Loading
									</Button>
								</div>

								{/* Icon Buttons */}
								<div className="flex flex-wrap gap-2">
									<IconButton icon={<Settings size={18} />} label="Settings" />
									<IconButton icon={<Download size={18} />} label="Download" variant="secondary" />
									<IconButton icon={<RefreshCw size={18} />} label="Refresh" variant="primary" />
								</div>
							</div>
						</CollapsiblePanel>

						{/* Inputs Panel */}
						<CollapsiblePanel title="Inputs" defaultExpanded={false}>
							<div className="flex flex-col gap-4">
								<TextInput
									label="Text Input"
									placeholder="Enter your name..."
									value={textValue}
									onChange={(e) => setTextValue(e.target.value)}
									helperText="This is helper text"
								/>

								<TextInput
									label="With Error"
									value="Invalid value"
									errorText="This field has an error"
								/>

								<NumberInput
									label="Annual Income"
									value={numberValue}
									onChange={(v) => setNumberValue(v ?? 0)}
									min={0}
									max={500000}
									step={1000}
									helperText="Enter your gross annual income"
								/>

								<NumberInput
									label="With Error"
									value={150}
									max={100}
									errorText="Value exceeds maximum"
								/>
							</div>
						</CollapsiblePanel>

						{/* Slider Panel */}
						<CollapsiblePanel title="Sliders" defaultExpanded={false}>
							<div className="flex flex-col gap-6">
								<Slider
									label="Save Rate"
									value={sliderProps.value}
									onChange={sliderProps.onChange}
									min={0}
									max={100}
									step={5}
									formatValue={(v) => `${v}%`}
								/>

								{/* Synced with NumberInput */}
								<div className="flex flex-col gap-2">
									<span className="text-sm text-text-secondary">Synced Slider + Input</span>
									<div className="flex items-center gap-4">
										<div className="flex-1">
											<Slider {...sliderProps} showValue={false} />
										</div>
										<div className="w-24">
											<NumberInput {...numberInputProps} hideControls />
										</div>
									</div>
								</div>
							</div>
						</CollapsiblePanel>

						{/* Form Controls Panel */}
						<CollapsiblePanel title="Form Controls" defaultExpanded={false}>
							<div className="flex flex-col gap-6">
								{/* Select */}
								<Select
									label="Country"
									placeholder="Select a country"
									options={[
										{ value: 'uk', label: 'United Kingdom' },
										{ value: 'us', label: 'United States' },
										{ value: 'fr', label: 'France' },
										{ value: 'de', label: 'Germany' },
									]}
									helperText="Choose your country"
								/>

								{/* Checkbox */}
								<div className="flex flex-col gap-3">
									<Checkbox label="Subscribe to newsletter" />
									<Checkbox label="I agree to the terms and conditions" checked />
									<Checkbox label="Disabled option" disabled />
								</div>

								{/* Radio Group */}
								<RadioGroup
									label="Payment Method"
									name="payment"
									options={[
										{ value: 'card', label: 'Credit Card' },
										{ value: 'paypal', label: 'PayPal' },
										{ value: 'bank', label: 'Bank Transfer' },
									]}
									helperText="Select your preferred payment method"
								/>

								{/* Toggle */}
								<Toggle label="Enable notifications" />
								<Toggle label="Dark mode" checked />
							</div>
						</CollapsiblePanel>

						{/* Badges & Cards Panel */}
						<CollapsiblePanel title="Badges & Cards" defaultExpanded={false}>
							<div className="flex flex-col gap-6">
								{/* Badges */}
								<div className="flex flex-col gap-3">
									<div className="flex flex-wrap gap-2">
										<Badge>Default</Badge>
										<Badge variant="primary">Primary</Badge>
										<Badge variant="success">Success</Badge>
										<Badge variant="warning">Warning</Badge>
										<Badge variant="error">Error</Badge>
										<Badge variant="info">Info</Badge>
									</div>
									<div className="flex flex-wrap gap-2">
										<Badge outlined>Default</Badge>
										<Badge variant="primary" outlined>Primary</Badge>
										<Badge variant="success" outlined>Success</Badge>
									</div>
								</div>

								{/* Cards */}
								<Card>
									<h3 className="text-sm font-semibold text-text-primary mb-2">Default Card</h3>
									<p className="text-sm text-text-secondary">Simple card component for grouping content.</p>
								</Card>

								<Card variant="elevated" hoverable>
									<h3 className="text-sm font-semibold text-text-primary mb-2">Elevated Card</h3>
									<p className="text-sm text-text-secondary">Card with shadow and hover effect.</p>
								</Card>
							</div>
						</CollapsiblePanel>

						{/* Alerts Panel */}
						<CollapsiblePanel title="Alerts" defaultExpanded={false}>
							<div className="flex flex-col gap-4">
								<Alert variant="info" title="Information">
									This is an informational message for the user.
								</Alert>
								<Alert variant="success" title="Success">
									Your changes have been saved successfully!
								</Alert>
								<Alert variant="warning" title="Warning">
									Please review your input before continuing.
								</Alert>
								<Alert variant="error" title="Error" dismissible>
									An error occurred while processing your request.
								</Alert>
							</div>
						</CollapsiblePanel>

						{/* Tabs Panel */}
						<CollapsiblePanel title="Tabs" defaultExpanded={false}>
							<Tabs
								tabs={[
									{
										id: 'overview',
										label: 'Overview',
										icon: <Info size={14} />,
										content: (
											<div className="text-sm text-text-secondary">
												<p>Overview content goes here. This demonstrates the tabs component.</p>
											</div>
										),
									},
									{
										id: 'notifications',
										label: 'Notifications',
										icon: <Bell size={14} />,
										badge: 3,
										content: (
											<div className="text-sm text-text-secondary">
												<p>You have 3 unread notifications.</p>
											</div>
										),
									},
									{
										id: 'profile',
										label: 'Profile',
										icon: <User size={14} />,
										content: (
											<div className="text-sm text-text-secondary">
												<p>Profile settings and information.</p>
											</div>
										),
									},
								]}
							/>
						</CollapsiblePanel>

						{/* Tooltips Panel */}
						<CollapsiblePanel title="Tooltips" defaultExpanded={false}>
							<div className="flex flex-wrap gap-4 items-center">
								<Tooltip content="This is a tooltip" position="top">
									<Button size="sm">Hover me (top)</Button>
								</Tooltip>
								<Tooltip content="Tooltip on the right" position="right">
									<Button size="sm">Hover me (right)</Button>
								</Tooltip>
								<Tooltip content="Tooltip at bottom" position="bottom">
									<Button size="sm">Hover me (bottom)</Button>
								</Tooltip>
								<Tooltip content="Tooltip on the left" position="left">
									<Button size="sm">Hover me (left)</Button>
								</Tooltip>
							</div>
						</CollapsiblePanel>
					</div>
				}
				right={
					<div className="flex flex-col gap-4">
						{/* Data Panel with View Toggle */}
						<Panel
							title="Tax Allowances 2024/25"
							headerActions={
								<SegmentedToggle
									options={[
										{ value: 'chart', label: 'Chart', icon: <BarChart3 size={14} /> },
										{ value: 'table', label: 'Table', icon: <Table2 size={14} /> },
									]}
									value={viewMode === 'summary' ? 'table' : viewMode}
									onChange={(v) => setViewMode(v as 'chart' | 'table')}
									size="sm"
								/>
							}
						>
							{viewMode === 'chart' ? (
								/* Chart Placeholder */
								<div className="
                  h-64 
                  flex items-center justify-center
                  bg-bg-surface
                  rounded-md
                  border border-border-subtle
                  text-text-muted
                ">
									<div className="text-center">
										<BarChart3 size={48} className="mx-auto mb-2 text-accent-primary/50" />
										<p className="text-sm">Chart visualization would go here</p>
										<p className="text-xs text-text-muted">Using Recharts or similar</p>
									</div>
								</div>
							) : (
								/* Data Table */
								<DataTable
									columns={columns}
									data={sampleData}
									getRowKey={(row) => row.id}
									maxHeight="300px"
								/>
							)}
						</Panel>

						{/* Collapsible Demo */}
						<CollapsiblePanel
							title="Collapsible Section"
							defaultExpanded={false}
							headerActions={
								<Button size="sm" variant="ghost" rightIcon={<ArrowRight size={14} />}>
									Details
								</Button>
							}
						>
							<div className="space-y-3">
								<p className="text-sm text-text-secondary">
									This panel demonstrates the smooth collapse animation using the CSS
									grid-template-rows technique. Click the header to toggle.
								</p>
								<div className="p-4 bg-bg-surface rounded-md border border-border-subtle">
									<code className="text-xs text-accent-primary">
										grid-rows-[1fr] → grid-rows-[0fr]
									</code>
								</div>
							</div>
						</CollapsiblePanel>

						{/* Simple Panel */}
						<Panel title="Simple Panel">
							<p className="text-sm text-text-secondary">
								A basic panel without collapse functionality. Use this for
								static content areas that don't need to be hidden.
							</p>
						</Panel>

						{/* Panel with Footer */}
						<Panel
							title="Panel with Footer"
							footer={
								<div className="flex justify-end gap-2">
									<Button variant="ghost" size="sm">Cancel</Button>
									<Button variant="primary" size="sm">Save Changes</Button>
								</div>
							}
						>
							<p className="text-sm text-text-secondary">
								This panel has a footer area for actions or summary info.
							</p>
						</Panel>

						{/* Modal Demo */}
						<Panel title="Modal">
							<div className="flex flex-col gap-3">
								<p className="text-sm text-text-secondary">
									Click the button below to open a modal dialog.
								</p>
								<Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
							</div>
						</Panel>
					</div>
				}
			/>

			{/* Modal Component */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Example Modal"
				size="md"
				footer={
					<>
						<Button variant="ghost" onClick={() => setIsModalOpen(false)}>
							Cancel
						</Button>
						<Button variant="primary" onClick={() => setIsModalOpen(false)}>
							Confirm
						</Button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm text-text-secondary">
						This is a modal dialog component. It can be used for confirmations,
						forms, or detailed views.
					</p>
					<TextInput
						label="Email"
						placeholder="Enter your email"
					/>
					<Alert variant="info">
						Modal content is fully customizable with any components.
					</Alert>
				</div>
			</Modal>
		</PageLayout>
	);
}
