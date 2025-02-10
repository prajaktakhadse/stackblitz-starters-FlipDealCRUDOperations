const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));
let cors = require('cors');

app.use(cors());


let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
//Endpoint 1: Add an Item to the Cart
function addItem(productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return { cartItems: cart };
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let addCart = addItem(productId, name, price, quantity);
  res.json(addCart);
});

//Endpoint 2: Edit Quantity of an Item in the Cart
function updateQuantity(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return { cartItems: cart };
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let editedCart = updateQuantity(productId, quantity);
  res.json(editedCart);
});

//Endpoint 3: Delete an Item from the Cart
function deltItem(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  return { cartItems: cart };
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let deleteItem = deltItem(productId);
  res.json(deleteItem);
});

//Endpoint 4: Read Items in the Cart
function getallItems() {
  return { cartItems: cart };
}
app.get('/cart', (req, res) => {
  let result = getallItems();
  res.json(result);
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
function getTotalQuantity(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].quantity;
  }
  return total;
}
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = getTotalQuantity(cart);
  res.json({ totalQuantity });
});

//Endpoint 6: Calculate Total Price of Items in the Cart
function getTotalPrice(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].quantity;
  }
  return total;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = getTotalPrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
