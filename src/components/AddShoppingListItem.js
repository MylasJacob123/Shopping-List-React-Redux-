import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addShoppingItem } from "../redux/ShoppingListReducer";
import "./AddShoppingListItem.css";
import Search from "./SearchShoppingItem";
import ShoppingList from "./ShoppingList";

function AddShoppingListItem() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [optionalNotes, setOptionalNotes] = useState("");
  const dispatch = useDispatch();

  const AddItem = () => {
    dispatch(addShoppingItem({
      id: Date.now(),
      ShoppingItem: item,
      quantity,
      category,
      optionalNotes
    }));
    setItem("");
    setQuantity(1);
    setCategory("");
    setOptionalNotes("");
  };

  return (
    <div className="container">
      <div className="add">
        <h1 className="add-heading">SHOPPING LIST</h1>
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
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Hats">Hats</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Trousers">Trousers</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
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