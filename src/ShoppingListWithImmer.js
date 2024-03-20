import React from 'react';
import { useImmer } from 'use-immer';

const ShoppingListWithImmer = () => {
  const [shoppingList, updateShoppingList] = useImmer([
    { id: 1, name: "Apples", quantity: 5, details: { category: "Fruit", notes: "Red Delicious" } },
    { id: 2, name: "Milk", quantity: 1, details: { category: "Dairy", notes: "Whole Milk" } }
  ]);

  const addItem = newItem => {
    updateShoppingList(draft => {
      draft.push(newItem);
    });
  };

  const updateItem = (id, updatedItem) => {
    updateShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) {
        draft[index] = updatedItem;
      }
    });
  };

  const removeItem = id => {
    updateShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            <div>Name: {item.name}</div>
            <div>Quantity: {item.quantity}</div>
            <div>Category: {item.details.category}</div>
            <div>Notes: {item.details.notes}</div>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem({ id: 3, name: "Bread", quantity: 2, details: { category: "Bakery", notes: "Whole Wheat" } })}>Add Item</button>
      <button onClick={() => updateItem(1, { id: 1, name: "Oranges", quantity: 3, details: { category: "Fruit", notes: "Navel Oranges" } })}>Update Item</button>
    </div>
  );
}

export default ShoppingListWithImmer;