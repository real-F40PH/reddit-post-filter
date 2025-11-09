import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app'

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}

function main() {
  const container = document.createElement('div')
  container.id = 'reddit-post-filter'
  document.body.appendChild(container)

  setTimeout(() => {
    const root = createRoot(container)
    root.render(<App />)
  }, 10)
}
