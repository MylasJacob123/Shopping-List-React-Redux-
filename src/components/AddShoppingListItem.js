import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addShoppingItem } from "../redux/ShoppingListReducer";
import "./AddShoppingListItem.css";
import Search from "./SearchShoppingItem";
import ShoppingList from "./ShoppingList";

const categories = ["Hats", "T-Shirts", "Trousers", "Shoes", "Custom"];

function AddShoppingListItem() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [optionalNotes, setOptionalNotes] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingListItems"));
    if (storedItems) {
      storedItems.forEach((storedItem) => {
        dispatch(addShoppingItem(storedItem));
      });
    }
  }, [dispatch]);

  const AddItem = () => {
    setError("");

    if (!item) {
      setError("Item name is required.");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    dispatch(
      addShoppingItem({
        id: Date.now(),
        ShoppingItem: item,
        quantity,
        category,
        optionalNotes,
      })
    );

    setItem("");
    setQuantity(1);
    setCategory("");
    setOptionalNotes("");
  };

  return (
    <div className="container">
      <div className="add">
        <h1 className="add-heading">CLOTHING SHOPPING LIST</h1>
        <div className="add-form">
          <div className="add-item-inputs">
            <div>
              <input
                type="text"
                placeholder="Enter Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div>
              <input
                type="number"
                placeholder="Insert Quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div>
              <textarea
                name="optional-notes"
                placeholder="Add an optional note..."
                value={optionalNotes}
                onChange={(e) => setOptionalNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <button className="add-button" onClick={AddItem}>
              Add Item
            </button>
          </div>
        </div>
      </div>
      <Search />
      <ShoppingList />
    </div>
  );
}

export default AddShoppingListItem;
