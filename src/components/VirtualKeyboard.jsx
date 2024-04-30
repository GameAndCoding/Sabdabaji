import React, { useState } from 'react';

function VirtualKeyboard() {
  const [input, setInput] = useState('');

  const keys = ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', '়', 'ঽ', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', '্', 'ৎ'];

  const handleKeyPress = (key) => {
    setInput(current => current + key);
  };

  const handleBackspace = () => {
    setInput(current => current.slice(0, -1));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input type="text" value={input} readOnly className="w-full mb-4 p-2 border-2 border-gray-300 focus:outline-none" />
      <div className="grid grid-cols-9 gap-1">
        {keys.map(key => (
          <button key={key} onClick={() => handleKeyPress(key)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {key}
          </button>
        ))}
        <button onClick={handleBackspace} className="col-span-9 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Backspace
        </button>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
