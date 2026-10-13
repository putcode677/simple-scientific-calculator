import React, { useState } from 'react';
import { Delete, Percent } from 'lucide-react';

export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [isDegree, setIsDegree] = useState(true);

  const evaluateExpression = (expr) => {
    try {
      if (!expr) return '';
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `Math.PI`)
        .replace(/e/g, `Math.E`);

      const angleMultiplier = isDegree ? `* (Math.PI / 180)` : '';

      sanitized = sanitized.replace(/sin\(([^)]+)\)/g, (_, p1) => `Math.sin(${p1} ${angleMultiplier})`);
      sanitized = sanitized.replace(/cos\(([^)]+)\)/g, (_, p1) => `Math.cos(${p1} ${angleMultiplier})`);
      sanitized = sanitized.replace(/tan\(([^)]+)\)/g, (_, p1) => `Math.tan(${p1} ${angleMultiplier})`);
      sanitized = sanitized.replace(/log\(([^)]+)\)/g, 'Math.log10(\$1)');
      sanitized = sanitized.replace(/ln\(([^)]+)\)/g, 'Math.log(\$1)');
      sanitized = sanitized.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt(\$1)');
      
      while (sanitized.includes('^')) {
        sanitized = sanitized.replace(/([0-9.]+|Math\.[A-Z]+)\^([0-9.]+|Math\.[A-Z]+|\([^)]+\))/g, 'Math.pow(\$1, \$2)');
      }

      const compute = new Function(`return ${sanitized}`);
      const evalResult = compute();

      if (isNaN(evalResult) || !isFinite(evalResult)) return 'Error';
      return Number(evalResult.toFixed(8)).toString();
    } catch (err) {
      return 'Error';
    }
  };

  const handleKeyPress = (value) => {
    if (value === 'AC') {
      setDisplay('');
      setResult('');
    } else if (value === 'DEL') {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (value === '=') {
      setResult(evaluateExpression(display));
    } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) {
      setDisplay((prev) => prev + value + '(');
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  const buttons = [
    { label: isDegree ? 'DEG' : 'RAD', action: () => setIsDegree(!isDegree), style: 'bg-[var(--accent)] text-white font-bold' },
    { label: 'sin', action: () => handleKeyPress('sin'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: 'cos', action: () => handleKeyPress('cos'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: 'tan', action: () => handleKeyPress('tan'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },

    { label: 'π', action: () => handleKeyPress('π'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-serif' },
    { label: 'log', action: () => handleKeyPress('log'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: 'ln', action: () => handleKeyPress('ln'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: '^', action: () => handleKeyPress('^'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },

    { label: 'e', action: () => handleKeyPress('e'), style: 'bg-[var(--code-bg)] text-[var(--text-h)] font-serif' },
    { label: 'sqrt', action: () => handleKeyPress('sqrt'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: '(', action: () => handleKeyPress('('), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: ')', action: () => handleKeyPress(')'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },

    { label: 'AC', action: () => handleKeyPress('AC'), style: 'bg-rose-500 text-white font-bold' },
    { label: <Delete className="w-5 h-5 mx-auto" />, action: () => handleKeyPress('DEL'), style: 'bg-amber-500 text-white' },
    { label: <Percent className="w-4 h-4 mx-auto" />, action: () => handleKeyPress('%'), style: 'bg-[var(--code-bg)] text-[var(--text-h)]' },
    { label: '÷', action: () => handleKeyPress('÷'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-lg' },

    { label: '7', action: () => handleKeyPress('7'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '8', action: () => handleKeyPress('8'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '9', action: () => handleKeyPress('9'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '×', action: () => handleKeyPress('×'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-lg' },

    { label: '4', action: () => handleKeyPress('4'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '5', action: () => handleKeyPress('5'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '6', action: () => handleKeyPress('6'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '-', action: () => handleKeyPress('-'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-lg' },

    { label: '1', action: () => handleKeyPress('1'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '2', action: () => handleKeyPress('2'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '3', action: () => handleKeyPress('3'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '+', action: () => handleKeyPress('+'), style: 'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] font-bold text-lg' },

    { label: '0', action: () => handleKeyPress('0'), style: 'col-span-2 bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)]' },
    { label: '.', action: () => handleKeyPress('.'), style: 'bg-[var(--bg)] text-[var(--text-h)] border border-[var(--border)] font-bold' },
    { label: '=', action: () => handleKeyPress('='), style: 'bg-[var(--accent)] text-white font-bold text-lg' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 w-full mx-auto max-w-xl">
      <h1>Scientific Calculator</h1>
      
      <div 
        className="w-full p-6 rounded-2xl border border-[var(--border)] transition-colors duration-200"
        style={{ boxShadow: 'var(--shadow)', backgroundColor: 'var(--bg)' }}
      >
        {/* State/Mode Indicator */}
        <div className="flex justify-between items-center mb-4 text-xs font-mono tracking-widest text-[var(--text)]">
          <span>MATHEMATICAL PARSER</span>
          <span className="px-2 py-0.5 rounded font-bold bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]">
            {isDegree ? 'DEG' : 'RAD'}
          </span>
        </div>

        {/* Display Screens */}
        <div className="w-full p-4 mb-6 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] flex flex-col justify-between min-h-[110px] text-right font-mono overflow-x-auto break-all">
          <div className="text-[var(--text)] text-sm tracking-wide h-6 overflow-hidden">
            {display || '0'}
          </div>
          <div className="text-[var(--text-h)] text-3xl font-semibold mt-2 tracking-tight">
            {result ? `= ${result}` : ''}
          </div>
        </div>

        {/* Action Button Grid */}
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
    </div>
  );
}
