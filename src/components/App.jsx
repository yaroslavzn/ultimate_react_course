import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

function App() {
  const [items, setItems] = useState([]);

  function handleItemAdding(item) {
    setItems((oldItems) => [...oldItems, item]);
  }

  function handleItemDeleting(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleItemToggling(id) {
    setItems((items) => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            packed: !item.packed,
          };
        }

        return item;
      });
    });
  }

  function handleListClearing() {
    const confirmed = window.confirm(
      'Are you sure? Please confirm your action.'
    );

    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItemAdding} />
      <PackingList
        items={items}
        onItemDelete={handleItemDeleting}
        onItemToggle={handleItemToggling}
        onListClear={() => handleListClearing()}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
