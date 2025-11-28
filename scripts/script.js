// Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let update = document.getElementById("create");
let remove = document.getElementById("delete");
let tbody = document.getElementById(`tableBody`);
let removeAll = document.getElementById(`deleteAll`);
let error = document.getElementById(`error`);
let category = document.getElementById(`category`);
let mode = "create";
let temp;
// Total
function getTotal() {
  if ((price.value != ``, taxes.value != ``, ads.value != ``)) {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "rgb(22, 163, 74)";
  } else {
    total.innerHTML = ``;
    total.style.backgroundColor = `rgb(133, 79, 108)`;
  }
}
// Create DATA
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

create.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != `` && total.innerHTML != `` && category.value != `` && newProduct.count <= 100) {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[temp] = newProduct;
      mode = "create";
      create.innerHTML = "create";
      count.style = "display: block";
    }
    clearData();
  } else {
    error.innerHTML = `Enter Valid Data`;
  }

  localStorage.setItem(`product`, JSON.stringify(dataProduct));
  tableData();
};

// Clear Inputs

function clearData() {
  getTotal();
  title.value = ``;
  price.value = ``;
  ads.value = ``;
  taxes.value = ``;
  total.innerHTML = ``;
  category.value = ``;
  count.value = ``;
  discount.value = ``;
  total.style.backgroundColor = `rgb(133, 79, 108)`;
}

// Read Data (Table)

function tableData() {
  let table = ``;
  for (let i = 1; i < dataProduct.length; i++) {
    table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updating(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
  }

  tbody.innerHTML = table;
  if (dataProduct.length > 0) {
    removeAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  } else {
    removeAll.innerHTML = ``;
  }
}

tableData();

// Delete function

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  tableData();
}

// Delete all functions
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  tableData();
}

// Update Function
function updating(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style = "display:none";
  category.value = dataProduct[i].category;
  create.innerHTML = `update`;
  mode = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search function
let searchMode = "title";

function getSearchMode(id) {
  if (id === `searchTitle`) {
    searchMode = "Title";
  } else {
    searchMode = "Category";
  }
  search.placeholder = `Search By ${searchMode}`;
  search.focus();
  search.value = ``;
  tableData();
}

function searchData(value) {
  let table = ``;
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMode == "Title") {
      if (dataProduct[i].title.toLowerCase().includes(value)) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updating(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    } else {
      if (dataProduct[i].category.toLowerCase().includes(value)) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updating(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  }
  tbody.innerHTML = table;
}
