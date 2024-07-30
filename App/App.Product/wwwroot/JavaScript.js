//function Get() {
//    var id = document.getElementById("id").value;
//    $.ajax({
//        url: "https://localhost:44373/api/Products/" + id,
//        type: "GET",
//        contentType: "application/json",
//        success: function (result) {
//            document.getElementById("name").value = result.name;
//            document.getElementById("price").value = result.price;
//            document.getElementById("category").value = result.category;
//        },
//        error: function (xhr, status, error) {
//            alert(xhr.responseText);
//        }
//    });

//}


var Form = document.getElementById("formPost");
Form.addEventListener('submit', async  (e) => {
    e.preventDefault();
    const formData = new FormData(Form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);

    const response = await fetch('https://localhost:7135/api/Products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
        console.success("Product added successfully");
    }
    else {
        alert("Error");
        console.error("Error");
    }
});
