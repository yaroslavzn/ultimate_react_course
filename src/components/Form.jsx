import { useState } from 'react';

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem = {
      description,
      quantity: count,
      packed: false,
      id: Date.now(),
    };
    onAddItem(newItem);

    setDescription('');
    setCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
