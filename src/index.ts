// ─────────────────────────────────────────────────────────────
// Library Entry Point
// All public exports for consumers of this package.
// ─────────────────────────────────────────────────────────────

// ─── Styles ───
import './index.css';

// ─── UI Components ───
export {
  Panel,
  type PanelProps,
  CollapsiblePanel,
  type CollapsiblePanelProps,
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  IconButton,
  type IconButtonProps,
  type IconButtonVariant,
  type IconButtonSize,
  TextInput,
  type TextInputProps,
  NumberInput,
  type NumberInputProps,
  Slider,
  type SliderProps,
  SegmentedToggle,
  type SegmentedToggleProps,
  type SegmentOption,
} from './components/ui';

// ─── Layout Components ───
export {
  PageLayout,
  TwoColumnLayout,
  type PageLayoutProps,
  type TwoColumnLayoutProps,
  TopRibbon,
  BottomRibbon,
  type TopRibbonProps,
  type BottomRibbonProps,
  type RibbonSection,
} from './components/layout';

// ─── Data Components ───
export {
  DataTable,
  type DataTableProps,
  type ColumnDef,
  type SortDirection,
} from './components/data';

// ─── Hooks ───
export {
  usePanelCollapse,
  type UsePanelCollapseOptions,
  type UsePanelCollapseReturn,
  useResponsiveBreakpoints,
  type Breakpoint,
  type UseResponsiveBreakpointsReturn,
  useSyncedSliderInput,
  type UseSyncedSliderInputOptions,
  type UseSyncedSliderInputReturn,
  useTheme,
  ACCENT_PRESETS,
  type UseThemeOptions,
  type UseThemeReturn,
  type ThemeMode,
  type AccentPreset,
} from './hooks';
