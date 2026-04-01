import { useState } from 'react'
import './DiceRoller.css'

const DICE = [4, 6, 8, 10, 12, 20, 100]

export default function DiceRoller() {
  const [results, setResults]     = useState([])
  const [coin, setCoin]           = useState(null)   // 'H' | 'T' | null
  const [rolling, setRolling]     = useState(false)
  const [flipping, setFlipping]   = useState(false)
  const [animSides, setAnimSides] = useState(null)
  const [animNum, setAnimNum]     = useState(null)
  const [coinPhase, setCoinPhase] = useState('idle') // 'idle' | 'spinning' | 'result'

  function roll(sides) {
    setRolling(true)
    setAnimSides(sides)
    setAnimNum(null)
    let ticks = 0
    const interval = setInterval(() => {
      setAnimNum(Math.floor(Math.random() * sides) + 1)
      ticks++
      if (ticks >= 10) {
        clearInterval(interval)
        const result = Math.floor(Math.random() * sides) + 1
        setResults(prev => [{ sides, result, id: Date.now() }, ...prev.slice(0, 9)])
        setAnimNum(null)
        setAnimSides(null)
        setRolling(false)
      }
    }, 55)
  }

  function flipCoin() {
    setFlipping(true)
    setCoin(null)
    setCoinPhase('spinning')
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'H' : 'T'
      setCoin(result)
      setCoinPhase('result')
      setFlipping(false)
    }, 650)
  }

  return (
    <div className="dice-roller">
      <div className="dice-top-row">
        <div className="dice-buttons">
          {DICE.map(d => (
            <button
              key={d}
              className={`die-btn ${rolling && animSides === d ? 'rolling' : ''}`}
              onClick={() => roll(d)}
              disabled={rolling}
            >
              {rolling && animSides === d
                ? <span className="die-anim-num">{animNum ?? '?'}</span>
                : `d${d}`
              }
            </button>
          ))}
        </div>

        <div className={`coin-wrap ${coinPhase}`}>
          <button
            className="coin-btn"
            onClick={flipCoin}
            disabled={flipping}
            title="Flip a coin"
          >
            <div className={`coin-inner ${coinPhase === 'spinning' ? 'coin-spin' : ''}`}>
              {coinPhase === 'idle'   && 'Flip'}
              {coinPhase === 'spinning' && '?'}
              {coinPhase === 'result' && (coin === 'H' ? 'Heads' : 'Tails')}
            </div>
          </button>
        </div>
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
