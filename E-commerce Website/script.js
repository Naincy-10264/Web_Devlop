
document.addEventListener("DOMContentLoaded", function() {
    const cart = [];

    function updateCart() {
        console.log("Cart Items:", cart);
    }

    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", function() {
            const productName = this.parentElement.querySelector("h3").innerText;
            const productPrice = this.parentElement.querySelector("p").innerText;
            
            cart.push({ name: productName, price: productPrice });
            updateCart();
            alert(productName + " has been added to your cart!");
        });
    });
});
