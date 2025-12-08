import './index.css'
import { Playground } from './pages/Playground'

// ─────────────────────────────────────────────────────────────
// App Entry Point
// Purpose: Root application component.
// For development: renders the Playground component showcase.
// For production: replace with your actual app routes/structure.
// ─────────────────────────────────────────────────────────────

function App() {
  return <Playground />
}

export default App
