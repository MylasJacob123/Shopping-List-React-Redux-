import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addShoppingItem, shareShoppingList } from "../redux/ShoppingListReducer";
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
  const [shareEmail, setShareEmail] = useState("");
  const [shareMessage, setShareMessage] = useState(""); 
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingListItems"));
    if (storedItems) {
      storedItems.forEach((storedItem) => {
        dispatch(addShoppingItem(storedItem));
      });
    }
  }, [dispatch]);

  const AddItem = (e) => {
    e.preventDefault();
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

    const newItem = {
      id: Date.now(),
      ShoppingItem: item,
      quantity,
      category,
      optionalNotes,
    };

    dispatch(addShoppingItem(newItem));

    setItem("");
    setQuantity(1);
    setCategory("");
    setOptionalNotes("");
  };

  const shareItem = (itemId) => {
    if (!shareEmail) {
      setError("Please enter an email to share with.");
      return;
    }
    dispatch(shareShoppingList({ itemId, userEmail: shareEmail }));
    
    const shareData = {
      title: `Shopping List Item: ${item}`,
      text: `Item: ${item}, Quantity: ${quantity}, Category: ${category}, Notes: ${optionalNotes}`,
      url: `http://localhost:3000/shopping-list`,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => {
          setShareMessage('Item shared successfully!');
          setTimeout(() => {
            setShareMessage('');
          }, 3000);
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      console.error('Web Share API is not supported in this browser.');
    }

    setShareEmail("");
  };

  return (
    <div className="container">
      <div className="add">
        <h3 className="shopping-list-title">CLOTHING SHOPPING LIST</h3>
        <form className="shopping-list-form">
          <div className="shopping-list-inputs">
            <div className="form-div">
              <label htmlFor="item">Item:</label>
              <input
                className="shopping-list-inputs"
                type="text"
                id="item"
                placeholder="Enter Item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
              {error && <div className="error-message">{error}</div>}
            </div>
            <div className="form-div">
              <label htmlFor="quantity">Quantity:</label>
              <input
                className="shopping-list-inputs"
                type="number"
                id="quantity"
                placeholder="Insert Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="form-div">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-div">
              <label htmlFor="optional-notes">Optional Notes:</label>
              <textarea
                id="optional-notes"
                name="optional-notes"
                placeholder="Add an optional note..."
                value={optionalNotes}
                onChange={(e) => setOptionalNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button className="shopping-list-submit-btn" onClick={AddItem}>
            Add Item
          </button>
          {/* <div className="form-div">
            <input
              className="shopping-list-inputs"
              type="email"
              id="share-email"
              placeholder="Enter email to share"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
            <button onClick={() => shareItem(Date.now())}>Share Item</button>
            {shareMessage && <div className="share-message">{shareMessage}</div>}
          </div> */}
        </form>
      </div>

      <Search />
      <ShoppingList />
    </div>
  );
}

export default AddShoppingListItem;
