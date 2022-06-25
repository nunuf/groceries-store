loadProducts();

function loadProducts() {
  const allProducts = getProductsFromStorage();
  displayProducts(allProducts);
}



function groceries() {

  const isValid = validate();
  if (!isValid) {
    return;
  }

  const allProducts = getProductsFromStorage();
  const product = getProduct();

  allProducts.push(product);
  saveProductsToStorage(allProducts);
  displayProducts(allProducts);
  clearForm();
}

function validate() {
  const name = nameBox.value;
  const price = priceBox.value;
  const category = categoryBox.value;
  const photo = linkBox.value;

  if (name === "") {
    alert("Please enter product name");
    return false;
  }
  if (price === "") {
    alert("Please enter price");
    return false;
  }
  if (price < 0) {
    alert("Price cannot be negative");
    return false;
  }
  if (category === "") {
    alert("Please select product category");
    return false;
  }
  if (photo === "") {
    alert("Please enter link to product's photo");
    return false;
  }
  return true;
}

function getProduct() {
  const name = nameBox.value;
  const price = priceBox.value;
  const category = categoryBox.value;
  const photo = linkBox.value;

  const product = {
    name,
    price,
    category,
    photo
  }
  return product;
}

function getProductsFromStorage() {
  const str = localStorage.getItem("products");
  const products = str === null ? [] : JSON.parse(str);
  return products;
}

function saveProductsToStorage(allProducts) {
  const str = JSON.stringify(allProducts);
  localStorage.setItem("products", str);
}

function displayProducts(allProducts) {
  const allTBodies = document.getElementsByTagName("tbody");
  const tbody = allTBodies[0];
  tbody.innerHTML = "";

  for (let i = 0; i < allProducts.length; i++) {
    const row = `
      <tr id="${i}">
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td><img src="${allProducts[i].photo}"></td>
        <td><div class="remove-btn" id="delete${i}" onclick="deleteItem(this)">❌</div></td>
      </tr>`;
    tbody.innerHTML += row;
  }
}

function clearForm() {
  nameBox.value = "";
  priceBox.value = "";
  categoryBox.value = "";
  linkBox.value = "";
  nameBox.focus();
}

function deleteItem(button) {
  const index = button.id.replace('delete', '');
  const allProducts = getProductsFromStorage();
  allProducts.splice(index, 1);
  saveProductsToStorage(allProducts);
  displayProducts(allProducts);
}