function Get() {
    var id = document.getElementById("id").value;
    $.ajax({
        url: "https://localhost:44373/api/Products/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (result) {
            document.getElementById("name").value = result.name;
            document.getElementById("price").value = result.price;
            document.getElementById("category").value = result.category;
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
    
}
