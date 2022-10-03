import React from 'react';

export default function Radiobox({ name, value, handleChange, hidden }) {
    return (
        <input
            type="radio"
            name={name}
            value={value}
            className={hidden == true ? 'hidden' : 'border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' }
            onChange={(e) => handleChange(e)}
        />
    );
}
