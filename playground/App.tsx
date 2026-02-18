// ─────────────────────────────────────────────────────────────
// Playground App
// Imports the Playground page which showcases all library components.
// The playground/vite.config.ts aliases the package name to src/index.ts
// so this validates the same public API that consumers will use.
// ─────────────────────────────────────────────────────────────

import { Playground } from '../src/pages/Playground'

export function App() {
  return <Playground />
}
