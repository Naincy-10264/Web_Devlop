document.addEventListener("DOMContentLoaded", function () {
    let authRequiredButtons = document.querySelectorAll(".auth-required");

    if (!authRequiredButtons.length) {
        console.warn("No elements with class 'auth-required' found.");
        return;
    }

    authRequiredButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            let isAuthenticated = localStorage.getItem("userLoggedIn");

            if (!isAuthenticated) {
                event.preventDefault(); // Prevent default action
                alert("You must sign in first!");
                window.location.href = "./signup.js"; // Redirect to sign-in page
            }
        });
    });
});
