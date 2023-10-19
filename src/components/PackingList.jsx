import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onItemDelete,
  onItemToggle,
  onListClear,
}) {
  const [sortBy, setSortBy] = useState('input');

  let filteredItems;

  switch (sortBy) {
    case 'description': {
      filteredItems = [...items].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    }

    case 'packed': {
      filteredItems = [...items].sort(
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      break;
    }

    default: {
      filteredItems = items;
      break;
    }
  }

  return (
    <div className="list">
      <ul>
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            {...item}
            onItemDelete={onItemDelete}
            onItemToggle={onItemToggle}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onListClear}>Clear list</button>
      </div>
    </div>
  );
}
