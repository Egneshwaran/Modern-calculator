import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [prevNumber, setPrevNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [newNumber, setNewNumber] = useState(true)
  const [history, setHistory] = useState([])

  const handleNumber = (number) => {
    if (newNumber) {
      setDisplay(number)
      setEquation(equation === '' ? number : equation + number)
      setNewNumber(false)
    } else {
      // Limit the display to 10 digits
      if (display.length < 10) {
        setDisplay(display === '0' ? number : display + number)
        setEquation(equation === '0' ? number : equation + number)
      }
    }
  }

  const handleOperator = (op) => {
    const current = parseFloat(display)
    
    if (!equation.includes('=')) {
      setEquation(equation + op)
    } else {
      setEquation(display + op)
    }
    
    setNewNumber(true)
    setOperator(op)
  }

  const calculate = (expression) => {
    // Replace × and ÷ with * and / for JavaScript evaluation
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/')
    try {
      // Using Function instead of eval for better security
      return new Function('return ' + expression)()
    } catch (e) {
      return 'Error'
    }
  }

  const handleEquals = () => {
    if (equation && !equation.includes('=')) {
      const result = calculate(equation)
      const fullEquation = `${equation} = ${result}`
      setHistory([...history, fullEquation])
      setDisplay(String(result))
      setEquation(fullEquation)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setPrevNumber(null)
    setOperator(null)
    setNewNumber(true)
  }

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.')
      setEquation(equation === '' ? '0.' : equation + '.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
      setEquation(equation + '.')
    }
  }

  const handleDelete = () => {
    if (display !== '0' && !newNumber) {
      const newDisplay = display.slice(0, -1)
      setDisplay(newDisplay === '' ? '0' : newDisplay)
      setEquation(equation.slice(0, -1))
    }
  }

  const handleLastCalculation = () => {
    if (history.length > 0) {
      const lastResult = history[history.length - 1].split(' = ')[1]
      setDisplay(lastResult)
      setEquation(lastResult)
      setNewNumber(true)
    }
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation}</div>
        <div className="result">{display}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear} className="clear">AC</button>
        <button onClick={handleDelete} className="clear">DEL</button>
        <button onClick={handleLastCalculation} className="history">pre</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleNumber('0')} className="zero">0</button>
        <button onClick={handleDecimal}>.</button>
        <div className="operators-column">
          <button onClick={() => handleOperator('÷')} className="operator">÷</button>
          <button onClick={() => handleOperator('×')} className="operator">×</button>
          <button onClick={() => handleOperator('-')} className="operator">-</button>
          <button onClick={() => handleOperator('+')} className="operator">+</button>
          <button onClick={handleEquals} className="operator">=</button>
        </div>
      </div>
    </div>
  )
}

export default App
