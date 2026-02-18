# App Component Library

A comprehensive React component library built with TypeScript, Vite, and Tailwind CSS v4. This library provides a complete set of accessible, themeable UI components for building modern web applications.

![Component Library Playground](https://github.com/user-attachments/assets/c15e1d8d-b2de-4384-afa7-57c396a379bd)

## Features

- 🎨 **Themeable**: Built-in dark/light mode with customizable accent colors
- ♿ **Accessible**: ARIA attributes and keyboard navigation support
- 📦 **Tree-shakeable**: Import only what you need
- 🎯 **TypeScript**: Full type safety with exported types
- 🎪 **Playground**: Interactive component showcase for development
- ⚡ **Fast**: Built with Vite for optimal performance

## Installation

```bash
npm install @quentinlachaud/app-component-library
```

## Usage

```tsx
import { Button, Panel, TextInput } from '@quentinlachaud/app-component-library';

function App() {
  return (
    <Panel title="My Form">
      <TextInput label="Name" placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Panel>
  );
}
```

## Components

### UI Primitives

#### Buttons
- **Button** - Primary interactive element with variants (primary, secondary, ghost)
- **IconButton** - Square icon-only button for toolbars

#### Inputs
- **TextInput** - Single-line text input with label and validation
- **NumberInput** - Numeric input with increment/decrement controls
- **Select** - Dropdown select with customizable options
- **Checkbox** - Checkbox input with label
- **Radio** / **RadioGroup** - Radio button for single-choice selection
- **Toggle** - Switch/toggle for binary on/off states
- **Slider** - Range input with custom styling

#### Display
- **Panel** - Container with title, optional actions, and footer
- **CollapsiblePanel** - Panel with smooth expand/collapse animation
- **Card** - Simple content container with variants (default, elevated, outlined)
- **Badge** - Small label for status indicators and counts
- **Alert** - Notification message with variants (info, success, warning, error)
- **Tooltip** - Contextual help text on hover/focus

#### Navigation
- **SegmentedToggle** - Pill-style toggle group for view switching
- **Tabs** - Tabbed navigation for organizing content
- **Modal** - Dialog overlay for important interactions

### Layout Components

- **PageLayout** - Main page wrapper with top/bottom ribbon slots
- **TwoColumnLayout** - Responsive two-column layout with adjustable widths
- **TopRibbon** - Fixed-height top control bar
- **BottomRibbon** - Contextual bottom bar for actions

### Data Components

- **DataTable** - Sortable table with responsive design

### Hooks

- **useTheme** - Theme mode and accent color management
- **usePanelCollapse** - Smooth collapse animation for panels
- **useSyncedSliderInput** - Sync Slider and NumberInput state
- **useResponsiveBreakpoints** - Responsive breakpoint detection

## Theme Customization

The library uses CSS custom properties for theming. You can customize the accent color:

```tsx
import { useTheme, ACCENT_PRESETS } from '@quentinlachaud/app-component-library';

function ThemeSelector() {
  const { setAccentColor, setMode } = useTheme();

  return (
    <>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
      <button onClick={() => setMode('light')}>Light Mode</button>
      <button onClick={() => setAccentColor(ACCENT_PRESETS.purple)}>
        Purple Accent
      </button>
    </>
  );
}
```

Available accent presets: `cyan`, `blue`, `purple`, `pink`, `rose`, `orange`, `amber`, `green`, `teal`

## Development

### Run Playground

```bash
npm run dev
```

Visit http://localhost:5173 to see all components in action.

### Build Library

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Component Examples

### Modal with Form

```tsx
import { Modal, TextInput, Button, Alert } from '@quentinlachaud/app-component-library';

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Form</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Contact Form"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Submit</Button>
          </>
        }
      >
        <TextInput label="Email" placeholder="your@email.com" />
        <Alert variant="info">
          We'll never share your email with anyone else.
        </Alert>
      </Modal>
    </>
  );
}
```

### Tabs with Icons

```tsx
import { Tabs } from '@quentinlachaud/app-component-library';
import { Home, Settings, User } from 'lucide-react';

function Navigation() {
  return (
    <Tabs
      tabs={[
        {
          id: 'home',
          label: 'Home',
          icon: <Home size={16} />,
          content: <div>Home content</div>,
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: <Settings size={16} />,
          badge: 3,
          content: <div>Settings content</div>,
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: <User size={16} />,
          content: <div>Profile content</div>,
        },
      ]}
    />
  );
}
```

### Form Controls

```tsx
import { 
  Select, 
  Checkbox, 
  RadioGroup, 
  Toggle 
} from '@quentinlachaud/app-component-library';

function SettingsForm() {
  return (
    <form>
      <Select
        label="Country"
        options={[
          { value: 'uk', label: 'United Kingdom' },
          { value: 'us', label: 'United States' },
        ]}
      />
      
      <Checkbox label="Subscribe to newsletter" />
      
      <RadioGroup
        label="Payment Method"
        name="payment"
        options={[
          { value: 'card', label: 'Credit Card' },
          { value: 'paypal', label: 'PayPal' },
        ]}
      />
      
      <Toggle label="Enable notifications" />
    </form>
  );
}
```

## TypeScript

All components export their prop types:

```tsx
import type { 
  ButtonProps, 
  PanelProps, 
  TextInputProps 
} from '@quentinlachaud/app-component-library';

const customButton: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  children: 'Click me',
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
