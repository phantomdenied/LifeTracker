import { useState } from 'react'
import './DiceRoller.css'

const DICE = [4, 6, 8, 10, 12, 20, 100]

export default function DiceRoller() {
  const [results, setResults] = useState([])
  const [rolling, setRolling] = useState(false)

  function roll(sides) {
    setRolling(true)
    setTimeout(() => {
      const result = Math.floor(Math.random() * sides) + 1
      setResults(prev => [{ sides, result, id: Date.now() }, ...prev.slice(0, 9)])
      setRolling(false)
    }, 120)
  }

  return (
    <div className="dice-roller">
      <div className="dice-buttons">
        {DICE.map(d => (
          <button
            key={d}
            className="die-btn"
            onClick={() => roll(d)}
            disabled={rolling}
            title={`Roll d${d}`}
          >
            d{d}
          </button>
        ))}
      </div>

      {results.length > 0 && (
        <div className="dice-results">
          {results.map((r, i) => (
            <span
              key={r.id}
              className={`dice-result ${i === 0 ? 'latest' : 'old'} ${r.result === r.sides ? 'nat-max' : ''} ${r.result === 1 ? 'nat-one' : ''}`}
              title={`d${r.sides}`}
            >
              {r.result}
              <sub>d{r.sides}</sub>
            </span>
          ))}
          <button className="clear-dice" onClick={() => setResults([])}>✕</button>
        </div>
      )}
    </div>
  )
}
