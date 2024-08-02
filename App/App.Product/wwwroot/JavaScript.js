const form = document.getElementById("productForm");
var list = document.getElementById("list");
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);

    const response = await fetch('/api/Product', {
        method: 'POST',
        body: formData
    })
    console.log(response);

    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.includes('application/json')) {
        result = await response.json();
    }
    else {
        console.log("response json değil", response)
        result = await response.text();
    }
    console.log(result);

    if (response.ok) {
        console.log("Product added successfully");
    }
    else {
        alert("Error");
        console.error("Error");
    }
    list.click();

});

// productları listleme işlemi
async function ProductList() {
    var productList = document.getElementById("productsList");

    const response = await fetch('/api/Product');
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const products = await response.json();
    productList.innerHTML = "";
    console.log(products);

    products.forEach(p => {
        const tr = document.createElement("tr");
        let name = p.name;
        const price = p.price;
        const category = p.category;
        console.log(name, price, category);
        tr.innerHTML = `<td>${name}</td><td>${price}</td><td>${category}</td><td> <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Edit</button> <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal1">Delete</button></td>`;
        productList.appendChild(tr);
    });
}

function openInput() {

}

function display() {
    // litele butonuna tıklandığında productları listele bir daha tıklanırsa listeyi kaldır
    var productList = document.getElementById("deneme");
    var listele = document.getElementById("listele");
    if (productList.style.display === "none") {
        productList.style.display = "table";
        listele.innerText = "Gizle";
    } else {
        productList.style.display = "none";
        listele.innerText = "Listele";
    }
}


async function put() {
    alert("put");
    var ProductList = document.getElementById("productsList");
    var form = document.getElementById("productForm");
    var formData = new FormData(form);
    var data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/Product', {
        method: 'PUT',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert("Product updated successfully");
            console.log("Product updated successfully");
        } else {
            alert("Error");
            console.error("Error");
        }
    }).catch(error => {
        console.error("Network error", error);
    });
}




