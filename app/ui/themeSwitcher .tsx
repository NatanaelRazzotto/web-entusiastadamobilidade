import * as Switch from '@radix-ui/react-switch'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      root.classList.add('dark')
      setIsDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div >

      
      <label className='hidden sm:block text-orange-700' htmlFor="theme-toggle">Dark Mode</label>
      <Switch.Root
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className="w-10 h-6 bg-orange-700 rounded-full relative"
      >
        <Switch.Thumb className={`w-4 h-4 bg-orange-300 rounded-full transition-transform transform ${isDarkMode ? 'translate-x-4' : ''}`} />
      </Switch.Root>
    </div>
  )
}
