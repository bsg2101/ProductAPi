// Örnek ürün listesi
let products = [];

// productları listleme işlemi
async function ProductList() {
    var productList = document.getElementById("productsList");

    const response = await fetch('/api/Product');
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    products = await response.json(); // Global değişkeni güncelleyin
    productList.innerHTML = "";
    console.log(products);

    products.forEach(p => {
        const tr = document.createElement("tr");
        let name = p.name;
        const price = p.price;
        const category = p.category;
        console.log(name, price, category);
        tr.innerHTML = `<td>${name}</td><td>${price}</td><td>${category}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="openEditModal(${p.id})">Edit</button>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal1" onclick="openDeleteModal(${p.id})">Delete</button>
                        </td>`;
        productList.appendChild(tr);
    });
}

// litele butonuna tıklandığında productları listele bir daha tıklanırsa listeyi kaldır
function display() {
    var productList = document.getElementById("deneme");
    var listele = document.getElementById("listele");
    if (productList.style.display === "none") {
        productList.style.display = "table";
        listele.innerText = "Gizle";
    } else {
        productList.style.display = "none";
        listele.innerText = "List";
    }
}
async function post() {
    const form = document.getElementById("productForm");
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/Product', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log("Product added successfully");
            // Optionally, reset the form or display a success message
            form.reset();

            // Refresh the product list
            ProductList();
        } else {
            console.error("Error adding product", await response.text());
        }
    } catch (error) {
        console.error("Network error", error);
    }
}

// Open the modal and set the current product details for editing
function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.querySelector("#updateForm #name").value = product.name;
        document.querySelector("#updateForm #price").value = product.price;

        const selectItem = document.querySelector("#updateForm #selectItemUpdate");
        if (product.category) {
            selectItem.value = product.category;
        } else {
            selectItem.value = ""; //   If there is no category value, leave it blank
        }

        document.querySelector("#updateForm").dataset.id = id;
    }
}

// Update product details
async function put() {
    const form = document.getElementById("updateForm");
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const id = form.dataset.id;

    try {
        const response = await fetch('/api/Product/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Product updated successfully");
            // Close the modal
            var myModalEl = document.querySelector('#exampleModal');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();

            // Refresh the product list
            ProductList();
        } else {
            console.error("Error updating product", await response.text());
        }
    } catch (error) {
        console.error("Network error", error);
    }
}


// Open the modal and set the current product ID for deletion
function openDeleteModal(id) {
    document.querySelector("#deleteProduct").dataset.id = id;
}

// Delete product
async function deleteProduct() {
    const id = document.querySelector("#deleteProduct").dataset.id;

    try {
        const response = await fetch('/api/Product/' + id, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log("Product deleted successfully");
            // Close the modal
            var myModalEl = document.querySelector('#exampleModal1');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
            // Refresh the product list
            ProductList();
        } else {
            console.error("Error deleting product", await response.text());
        }
    } catch (error) {
        console.error("Network error", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("productForm");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await post();
    });
});