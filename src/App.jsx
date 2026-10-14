import React, { useState, useEffect } from 'react';
import { Delete, Percent, History, Trash2, Sun, Moon } from 'lucide-react';
import { evaluateExpression } from './utils/engine';

export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [isDegree, setIsDegree] = useState(true);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  const handleKeyPress = (value) => {
    if (value === 'AC') {
      setDisplay('');
      setResult('');
    } else if (value === 'DEL') {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (value === '=') {
      const finalRes = evaluateExpression(display, isDegree);
      setResult(finalRes);
      if (finalRes !== 'Error' && finalRes !== '') {
        setHistory((prev) => [{ expression: display, result: finalRes }, ...prev]);
      }
    } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) {
      setDisplay((prev) => prev + value + '(');
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  useEffect(() => {
    const handlePhysicalKeyDown = (event) => {
      const { key } = event;
      if (/[0-9.\+\-\(\)\^%]/.test(key)) {
        event.preventDefault();
        handleKeyPress(key);
      } else if (key === '*') {
        event.preventDefault();
        handleKeyPress('×');
      } else if (key === '/') {
        event.preventDefault();
        handleKeyPress('÷');
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleKeyPress('=');
      } else if (key === 'Backspace') {
        event.preventDefault();
        handleKeyPress('DEL');
      } else if (key === 'Escape') {
        event.preventDefault();
        handleKeyPress('AC');
      }
    };
    window.addEventListener('keydown', handlePhysicalKeyDown);
    return () => window.removeEventListener('keydown', handlePhysicalKeyDown);
  }, [display, isDegree]);
  const buttons = [
    { label: isDegree ? 'DEG' : 'RAD', action: () => setIsDegree(!isDegree), style: 'bg-[var(--accent)] text-white font-bold' },
    { label: 'sin', action: () => handleKeyPress('sin'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-semibold' },
    { label: 'cos', action: () => handleKeyPress('cos'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-semibold' },
    { label: 'tan', action: () => handleKeyPress('tan'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-semibold' },
    { label: 'π', action: () => handleKeyPress('π'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-serif font-bold' },
    { label: 'log', action: () => handleKeyPress('log'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-semibold' },
    { label: 'ln', action: () => handleKeyPress('ln'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-semibold' },
    { label: '^', action: () => handleKeyPress('^'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-bold' },
    { label: 'e', action: () => handleKeyPress('e'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-serif font-bold' },
    { label: 'sqrt', action: () => handleKeyPress('sqrt'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-semibold' },
    { label: '(', action: () => handleKeyPress('('), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-bold' },
    { label: ')', action: () => handleKeyPress(')'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-bold' },
    { label: 'AC', action: () => handleKeyPress('AC'), style: 'bg-rose-500 text-white font-bold' },
    { label: <Delete className="w-5 h-5 mx-auto" />, action: () => handleKeyPress('DEL'), style: 'bg-amber-500 text-white' },
    { label: <Percent className="w-4 h-4 mx-auto" />, action: () => handleKeyPress('%'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-bold' },
    { label: '÷', action: () => handleKeyPress('÷'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-xl' },
    { label: '7', action: () => handleKeyPress('7'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '8', action: () => handleKeyPress('8'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '9', action: () => handleKeyPress('9'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '×', action: () => handleKeyPress('×'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-xl' },
    { label: '4', action: () => handleKeyPress('4'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '5', action: () => handleKeyPress('5'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '6', action: () => handleKeyPress('6'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '-', action: () => handleKeyPress('-'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-xl' },
    { label: '1', action: () => handleKeyPress('1'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '2', action: () => handleKeyPress('2'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '3', action: () => handleKeyPress('3'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '+', action: () => handleKeyPress('+'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-xl' },
    { label: '0', action: () => handleKeyPress('0'), style: 'col-span-2 bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '.', action: () => handleKeyPress('.'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)] font-bold' },
    { label: '=', action: () => handleKeyPress('='), style: 'bg-[var(--accent)] text-white font-bold text-xl' },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 w-full mx-auto max-w-xl gap-6">
      
      <div className="w-full flex justify-between items-center px-2">
        <h1 className="!my-0">Scientific Calculator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] cursor-pointer hover:border-[var(--accent)] transition-all shadow-sm"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
        </button>
      </div>
      
      <div 
        className="w-full p-6 rounded-2xl border border-[var(--border)] transition-colors duration-200"
        style={{ boxShadow: 'var(--shadow)', backgroundColor: 'var(--bg)' }}
      >
        <div className="flex justify-between items-center mb-4 text-xs font-mono tracking-widest text-[var(--text)]">
          <span>MATHEMATICAL PARSER</span>
          <span className="px-2 py-0.5 rounded font-bold bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]">
            {isDegree ? 'DEG' : 'RAD'}
          </span>
        </div>

        <div className="w-full p-4 mb-6 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] flex flex-col justify-between min-h-[110px] text-right font-mono overflow-x-auto break-all">
          <div className="text-[var(--text)] text-sm tracking-wide h-6 overflow-hidden">
            {display || '0'}
          </div>
          <div className="text-[var(--text-h)] text-3xl font-semibold mt-2 tracking-tight">
            {result ? `= ${result}` : ''}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className={`p-3.5 rounded-xl transition-all duration-150 active:scale-95 text-base font-medium select-none cursor-pointer shadow-sm ${btn.style}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="w-full p-5 rounded-2xl border border-[var(--border)] text-left"
        style={{ boxShadow: 'var(--shadow)', backgroundColor: 'var(--bg)' }}
      >
        <div className="flex justify-between items-center mb-3 border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-2 text-[var(--text-h)] font-medium">
            <History className="w-4 h-4 text-[var(--accent)]" />
            <h2>Calculation History</h2>
          </div>
          {history.length > 0 && (
            <button 
              onClick={() => setHistory([])}
              className="text-xs text-rose-500 flex items-center gap-1 hover:underline cursor-pointer select-none"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        <div className="max-h-48 overflow-y-auto font-mono text-sm space-y-2.5 pr-1">
          {history.length === 0 ? (
            <p className="text-[var(--text)] text-xs italic py-2 text-center">No recent calculations yet.</p>
          ) : (
            history.map((item, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setDisplay(item.expression);
                  setResult(item.result);
                }}
                className="p-2 rounded-lg bg-[var(--code-bg)] hover:border-[var(--accent-border)] border border-transparent cursor-pointer transition-all flex flex-col items-end gap-0.5 group"
              >
                <span className="text-[var(--text)] text-xs group-hover:text-[var(--accent)] transition-colors">{item.expression}</span>
                <span className="text-[var(--text-h)] font-semibold text-base">= {item.result}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
