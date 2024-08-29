import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteShoppingItem,
  updateShoppingItem,
  checkoutShoppingItem,
} from "../redux/ShoppingListReducer";
import "./ShoppingList.css";

function ShoppingList() {
  const shoppingList = useSelector((state) => state.shoppingList.items);
  const searchShoppingItem = useSelector((state) => state.shoppingList.searchShoppingItem.toLowerCase());
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [newValue, setNewValue] = useState({});

  const update = (item) => {
    if (editId === item.id) {
      dispatch(updateShoppingItem({ id: item.id, ...newValue }));
      setEditId(null);
      setNewValue({});
    } else {
      setEditId(item.id);
      setNewValue({
        ShoppingItem: item.ShoppingItem,
        category: item.category,
        quantity: item.quantity,
        optionalNotes: item.optionalNotes,
      });
    }
  };

  const checkout = (id) => {
    dispatch(checkoutShoppingItem(id));
  };

  const filteredShoppingList = shoppingList.filter((item) =>
    item.ShoppingItem.toLowerCase().includes(searchShoppingItem)
  );

  return (
    <div className="display-container">
      <ul className="display">
        {filteredShoppingList.map((item) => (
          <div className="display-box" key={item.id}>
            <div
              className="item-details"
              style={{
                textDecoration: item.checkedOut ? "line-through" : "none",
              }}
            >
              {editId === item.id ? (
                <div className="edit-fields">
                  <input
                    className="shopping-list-input"
                    type="text"
                    value={newValue.ShoppingItem}
                    onChange={(e) =>
                      setNewValue({ ...newValue, ShoppingItem: e.target.value })
                    }
                    placeholder="Item"
                  />
                  <input
                    className="shopping-list-input"
                    type="text"
                    value={newValue.category}
                    onChange={(e) =>
                      setNewValue({ ...newValue, category: e.target.value })
                    }
                    placeholder="Category"
                  />
                  <input
                    className="shopping-list-input"
                    type="number"
                    value={newValue.quantity}
                    onChange={(e) =>
                      setNewValue({ ...newValue, quantity: e.target.value })
                    }
                    placeholder="Quantity"
                  />
                  <input
                    className="shopping-list-input"
                    type="text"
                    value={newValue.optionalNotes}
                    onChange={(e) =>
                      setNewValue({
                        ...newValue,
                        optionalNotes: e.target.value,
                      })
                    }
                    placeholder="Note"
                  />
                </div>
              ) : (
                <li>
                  <strong>{item.ShoppingItem}</strong> - {item.category},{" "}
                  {item.quantity} {item.quantity > 1 ? "items" : "item"}
                  {item.optionalNotes && <div>Note: {item.optionalNotes}</div>}
                </li>
              )}
            </div>
            <div className="functional-button">
              <button className="update-btn" onClick={() => update(item)}>
                {editId === item.id ? "Save" : "Update"}
              </button>
              <button
                className="checkout-btn"
                onClick={() => checkout(item.id)}
              >
                {item.checkedOut ? "Undo Checkout" : "Checkout"}
              </button>
              <button
                className="delete-btn"
                onClick={() => dispatch(deleteShoppingItem(item.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;