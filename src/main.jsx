import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { TPV } from './TPV.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <TPV />

  </StrictMode>,
)
