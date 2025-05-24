// Redon Malo
// May 24, 2025
// CSCI 

import { useEffect, useState } from 'react';
import { db, auth, google } from './firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from 'firebase/auth';
import './App.css';

// Reusable fruit counter
function FruitCounter({ fruit, emoji }) {
  // Reference to the Firestore fruit doc
  const fruitRef = doc(db, "inventory", fruit);

  // hold the current stock of the fruit
  const [stock, setStock] = useState(0);

  // Load stock from Firestore
  useEffect(() => {
    getDoc(fruitRef).then((snap) => {
      if (snap.exists()) {
        // If document exists, set state to the stored quantity
        setStock(snap.data().quantity);
      } else {
        // If it doesn't exist, create it with quantity 0
        setDoc(fruitRef, { quantity: 0 });
      }
    });
  }, []);

  // increase fruit stock by 1
  const addFruit = async () => {
    await updateDoc(fruitRef, { quantity: stock + 1 });
    setStock(stock + 1);
  };

  // decrease fruit stock by 1 (if above 0)
  const eatOne = async () => {
    if (stock > 0) {
      await updateDoc(fruitRef, { quantity: stock - 1 });
      setStock(stock - 1);
    }
  };

  // set fruit stock to 0
  const eatAll = async () => {
    await updateDoc(fruitRef, { quantity: 0 });
    setStock(0);
  };

  // buttons
  return (
    <div className="fruit-container">
      <h2>{emoji} {fruit.charAt(0).toUpperCase() + fruit.slice(1)}s in Stock: {stock}</h2>

      <button className="fruit-button purchase" onClick={addFruit}>
        Purchase {fruit}
      </button>

      <button
        className={`fruit-button eat ${stock === 0 ? "disabled" : ""}`}
        onClick={eatOne}
        disabled={stock === 0}
      >
        Eat {fruit}
      </button>

      <button
        className={`fruit-button eat bold ${stock === 0 ? "disabled" : ""}`}
        onClick={eatAll}
        disabled={stock === 0}
      >
        Eat All {fruit}s
      </button>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // user authentication
  const handleAuthClick = () => {
    if (user) {
      // If signed in, sign out
      signOut(auth).catch(console.error);
      setUser(null);
    } else {
      // If not signed in, sign-in popup
      signInWithPopup(auth, google)
        .then((result) => setUser(result.user))
        .catch(console.error);
    }
  };

  // app layout
  return (
    <div className="app-container">
      {/* App header */}
      <div className="header" style={{ width: "100%", textAlign: "center" }}>
        <h1 className="app-title">Fruit Stock Manager</h1>
        <p className="subtitle">Track, stock, and snack on your fruit 🍎🍌🍊</p>

        {/* Auth button */}
        <button className="fruit-button" onClick={handleAuthClick}>
          {user ? `Sign out (${user.displayName})` : "Sign in"}
        </button>
      </div>

      {/* Fruit counters displayed */}
      <FruitCounter fruit="apple" emoji="🍎" />
      <FruitCounter fruit="banana" emoji="🍌" />
      <FruitCounter fruit="orange" emoji="🍊" />
    </div>
  );
}

export default App;
