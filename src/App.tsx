import React, { useState } from 'react';
import { Equal, Plus, Minus, X, Divide, Delete } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (number: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(number);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    const fullEquation = equation + display;
    try {
      // Replace × with * and ÷ with / for evaluation
      const result = eval(fullEquation.replace('×', '*').replace('÷', '/'));
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6">
        <div className="mb-4">
          <div className="text-gray-500 text-right text-sm h-6">{equation}</div>
          <div className="text-3xl font-bold text-right h-12 overflow-hidden">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button onClick={handleClear} className="col-span-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg p-4 transition-colors">
            AC
          </button>
          <button onClick={handleDelete} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 flex items-center justify-center transition-colors">
            <Delete size={20} />
          </button>
          <button onClick={() => handleOperator('÷')} className="bg-purple-100 hover:bg-purple-200 rounded-lg p-4 flex items-center justify-center transition-colors">
            <Divide size={20} />
          </button>

          {['7', '8', '9'].map((num) => (
            <button key={num} onClick={() => handleNumber(num)} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('×')} className="bg-purple-100 hover:bg-purple-200 rounded-lg p-4 flex items-center justify-center transition-colors">
            <X size={20} />
          </button>

          {['4', '5', '6'].map((num) => (
            <button key={num} onClick={() => handleNumber(num)} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('-')} className="bg-purple-100 hover:bg-purple-200 rounded-lg p-4 flex items-center justify-center transition-colors">
            <Minus size={20} />
          </button>

          {['1', '2', '3'].map((num) => (
            <button key={num} onClick={() => handleNumber(num)} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('+')} className="bg-purple-100 hover:bg-purple-200 rounded-lg p-4 flex items-center justify-center transition-colors">
            <Plus size={20} />
          </button>

          <button onClick={() => handleNumber('0')} className="col-span-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors">
            0
          </button>
          <button onClick={() => handleNumber('.')} className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors">
            .
          </button>
          <button onClick={handleEqual} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 flex items-center justify-center transition-colors">
            <Equal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;