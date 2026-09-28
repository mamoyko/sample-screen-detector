// Ambient types for the Window Management API (getScreenDetails).
// Not yet included in TypeScript's built-in DOM lib.
// https://developer.chrome.com/docs/capabilities/web-apis/multi-screen-window-placement

interface ScreenDetailed extends Screen {
  availLeft: number
  availTop: number
  left: number
  top: number
  isPrimary: boolean
  isInternal: boolean
  devicePixelRatio: number
  label: string
}

interface ScreenDetails extends EventTarget {
  screens: ScreenDetailed[]
  currentScreen: ScreenDetailed
  onscreenschange: ((this: ScreenDetails, ev: Event) => unknown) | null
}

interface Window {
  getScreenDetails?: () => Promise<ScreenDetails>
}
