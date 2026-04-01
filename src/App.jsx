import { useState, useCallback } from 'react'
import GameSetup from './components/GameSetup'
import GameBoard from './components/GameBoard'
import GameHistory from './components/GameHistory'
import { saveGame } from './utils/history'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('setup') // 'setup' | 'game' | 'history'
  const [gameConfig, setGameConfig] = useState(null)

  const startGame = useCallback((config) => {
    setGameConfig(config)
    setScreen('game')
  }, [])

  const endGame = useCallback((players) => {
    saveGame({ config: gameConfig, players, endedAt: Date.now() })
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
        </nav>
      </header>
      <main>
        {screen === 'setup' && <GameSetup onStart={startGame} />}
        {screen === 'game' && <GameBoard config={gameConfig} onEndGame={endGame} />}
        {screen === 'history' && <GameHistory />}
      </main>
    </div>
  )
}
