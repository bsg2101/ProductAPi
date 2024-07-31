const form = document.getElementById("productForm");
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
        alert("Product added successfully");
        console.log("Product added successfully");
    }
    else {
        alert("Error");
        console.error("Error");
    }
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
        tr.innerHTML = `<td>${name}</td><td>${price}</td><td>${category}</td>`;
        productList.appendChild(tr);
    });

}

//async function fetchProducts() {
//    const response = await fetch('/api/Product');
//    const products = await response.json();
//    const productList = document.getElementById('productsList');
//    //document.getElementById('productTable').style.display = 'none';
//    productList.innerHTML = "";
//    console.log(products);
//    products.forEach(product => {
//        const tr = document.createElement('tr');

//        let name = product.name;
//        let price = product.price;
//        let category = product.category;

//        const productArray = [
//            name, price, category
//        ];

//        for (var i = 0; i < 3; i++) {
//            const td = document.createElement('td');
//            td.textContent = `${ productArray[i]}`;
//            tr.appendChild(td);
//        }
//        productList.appendChild(tr);
//    });
//}



