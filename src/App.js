import React from 'react';
import './index.css';
const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];
const OPEN_FROM = 10;
const OPEN_TO = 22;

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const hasMenuItems = pizzaData.length > 0;

  return (
    <div className="menu">
      <h2>Our menu</h2>

      {hasMenuItems ? (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza key={pizza.name} {...pizza} />
          ))}
        </ul>
      ) : (
        <p>We are still working on our menu. Please come back later :)</p>
      )}
    </div>
  );
}

function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={`pizza ${soldOut ? 'sold-out' : null}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? 'SOLD OUT' : price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const currentHourValue = new Date().getHours();
  const isCurrentlyOpen =
    currentHourValue >= OPEN_FROM && currentHourValue <= OPEN_TO;

  return (
    <footer className="footer">
      {isCurrentlyOpen ? (
        <Order openTo={OPEN_TO} />
      ) : (
        <p>
          We are happy to welcome you between `${OPEN_FROM}:00` and `${OPEN_TO}
          `:00
        </p>
      )}
    </footer>
  );
}

function Order({ openTo }) {
  return (
    <div className="order">
      <p>{`We're open until ${openTo}:00. Come visit or order online.`}</p>
      <button className="btn">Order</button>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <Header />

      <Menu />

      <Footer />
    </div>
  );
}

export default App;
