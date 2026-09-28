import { useState } from 'react'
import './App.css'

const isSupported = typeof window !== 'undefined' && 'getScreenDetails' in window

function App() {
  const [screens, setScreens] = useState<ScreenDetailed[]>([])
  const [error, setError] = useState<string | null>(null)

  const detectScreens = async () => {
    setError(null)
    try {
      const details = await window.getScreenDetails!()
      setScreens(details.screens)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect screens')
    }
  }

  const openOnScreen = (screen: ScreenDetailed) => {
    window.open(
      '/',
      '_blank',
      `left=${screen.left},top=${screen.top},width=${screen.width},height=${screen.height}`,
    )
  }

  return (
    <section id="center">
      <h1>Screen Detection Sample</h1>
      <p>
        Detect the screens connected to this device, then pop open a new
        window on whichever one you pick.
      </p>

      {!isSupported && (
        <p className="warning">
          Your browser doesn't support the Window Management API. Try a
          Chromium-based browser (Chrome, Edge) served over HTTPS or
          localhost.
        </p>
      )}

      <button type="button" className="counter" onClick={detectScreens} disabled={!isSupported}>
        Detect Screens
      </button>

      {error && <p className="warning">{error}</p>}

      {screens.length > 0 && (
        <ul className="screen-list">
          {screens.map((screen, index) => (
            <li key={index} className="screen-item">
              <div>
                <strong>{screen.label || `Screen ${index + 1}`}</strong>
                {screen.isPrimary && <span> (primary)</span>}
                <div>
                  {screen.width}×{screen.height} at ({screen.left}, {screen.top})
                </div>
              </div>
              <button type="button" onClick={() => openOnScreen(screen)}>
                Open window here
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default App
