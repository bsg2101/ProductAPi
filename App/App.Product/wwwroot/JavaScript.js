const form = document.getElementById("productForm");
form.addEventListener('submit', async  (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);

    const response = await fetch('/api/Product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
    console.log(response);

    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.includes('application/json')) {
        result = await response.json();
    }
    else {
        console.log("response json değil",response)
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


//const form = document.getElementById('productForm')

//form.addEventListener('submit', async (event) => {
//    event.preventDefault();

//    const formData = new FormData(form);
//    const data = {};
//    formData.forEach((value, key) => {
//        data[key] = value;
//    });

//    console.log(data);


//    const response = await fetch('/api/Product', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: formData
//    })

//    const contentType = response.headers.get("content-type");



//    if (response.ok) {
//        alert("Product added successfully");
//        console.log("Product added successfully");
//    }
//    else {
//        alert("Error");
//        console.error("Error", response.status);
//    }
//})
