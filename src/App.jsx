import { useState, useCallback, useEffect } from 'react'
import GameSetup from './components/GameSetup'
import GameBoard from './components/GameBoard'
import GameHistory from './components/GameHistory'
import { saveGame } from './utils/history'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [gameConfig, setGameConfig] = useState(null)
  const [lastConfig, setLastConfig] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('mtg-theme') ?? 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('mtg-theme', theme)
  }, [theme])

  const startGame = useCallback((config) => {
    setGameConfig(config)
    setScreen('game')
  }, [])

  const endGame = useCallback((players, winnerId, notes) => {
    saveGame({ config: gameConfig, players, endedAt: Date.now(), winnerId: winnerId ?? null, notes: notes ?? '' })
    setLastConfig(gameConfig)
    setScreen('setup')
    setGameConfig(null)
  }, [gameConfig])

  const discardGame = useCallback(() => {
    setLastConfig(gameConfig)
    setScreen('setup')
    setGameConfig(null)
  }, [gameConfig])

  return (
    <div className="app">
      <header className="app-header">
        <h1>MTG Life Tracker</h1>
        <nav>
          <button
            className={screen !== 'history' ? 'active' : ''}
            onClick={() => { if (screen !== 'game') setScreen('setup') }}
            disabled={screen === 'game'}
          >
            Game
          </button>
          <button
            className={screen === 'history' ? 'active' : ''}
            onClick={() => { if (screen !== 'game') setScreen('history') }}
            disabled={screen === 'game'}
          >
            History
          </button>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
        </nav>
      </header>
      <main>
        {screen === 'setup' && <GameSetup onStart={startGame} lastConfig={lastConfig} />}
        {screen === 'game' && <GameBoard config={gameConfig} onEndGame={endGame} onDiscardGame={discardGame} />}
        {screen === 'history' && <GameHistory />}
      </main>
    </div>
  )
}
