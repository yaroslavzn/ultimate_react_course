import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function FriendsList({ friends, onFriendSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((item) => (
        <Friend
          {...item}
          key={item.id}
          onFriendSelect={onFriendSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ id, name, image, balance, onFriendSelect, selectedFriend }) {
  const isSelected = id === selectedFriend?.id;

  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You owe {name} {balance}€
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} ows you {balance}€
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}

      <Button onClick={() => onFriendSelect({ id, name, image, balance })}>
        {!isSelected ? 'Select' : 'Close'}
      </Button>
    </li>
  );
}

const DEFAULT_IMAGE_URL = 'https://i.pravatar.cc/48';

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(DEFAULT_IMAGE_URL);

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!name || !image) {
      return;
    }

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    resetForm();
  }

  function resetForm() {
    setName('');
    setImage(DEFAULT_IMAGE_URL);
  }

  return (
    <form className="form-add-friend" onSubmit={formSubmitHandler}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend: { name }, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [payedByUser, setPayedByUser] = useState('');
  const [payedBy, setPayedBy] = useState('user');
  const payedByFriend = payedByUser ? bill - payedByUser : '';

  function submitHandler(e) {
    e.preventDefault();

    if (!bill || !payedByUser) {
      return;
    }

    const result = payedBy === 'user' ? payedByFriend : -payedByUser;

    onSplitBill(result);
  }

  return (
    <form className="form-split-bill" onSubmit={submitHandler}>
      <h2>Split a bill with {name}</h2>

      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="number"
        value={payedByUser}
        onChange={(e) => {
          if (e.target.value > bill) return;

          setPayedByUser(Number(e.target.value));
        }}
      />

      <label>👫 {name}'s expense</label>
      <input type="number" disabled value={payedByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select value={payedBy} onChange={(e) => setPayedBy(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

function Button(props) {
  return <button className="button" {...props} />;
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([...initialFriends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function addFriendHandler(friend) {
    setFriends((friends) => [...friends, friend]);

    toggleAddFriendForm();
  }

  function toggleAddFriendForm() {
    setShowAddFriend(!showAddFriend);
  }

  function selectFriendHandler(friend) {
    if (friend.id === selectedFriend?.id) {
      return setSelectedFriend(null);
    }

    setSelectedFriend(friend);
    setShowAddFriend(false);
  }

  function splitBillHandler(balanceChanges) {
    setFriends((friends) => {
      return friends.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return {
            ...friend,
            balance: friend.balance + balanceChanges,
          };
        }

        return friend;
      });
    });

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onFriendSelect={selectFriendHandler}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <AddFriendForm onAddFriend={addFriendHandler} />}

        <Button onClick={() => toggleAddFriendForm()}>
          {!showAddFriend ? 'Add friend' : 'Close'}
        </Button>
      </div>

      {selectedFriend && (
        <SplitBillForm
          key={selectedFriend?.id}
          selectedFriend={selectedFriend}
          onSplitBill={splitBillHandler}
        />
      )}
    </div>
  );
}

export default App;
