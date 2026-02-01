import "../styles/Wishlist.css";
import { useState } from "react";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Add item
  const addItem = () => {
    if (input.trim() === "") return;
    setItems([...items, input]);
    setInput("");
  };

  // Delete item
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Close wishlist page (like login tab)
  const closeWishlist = () => {
    window.close();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Wishlist</h2>
        <button onClick={closeWishlist}>Close ✖</button>
      </div>

      <hr />

      {/* ADD ITEM */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Add item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addItem} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      {/* LIST */}
      <ul style={{ marginTop: "20px" }}>
        {items.length === 0 && <p>No items in wishlist</p>}

        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {item}
            <button
              onClick={() => deleteItem(index)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
