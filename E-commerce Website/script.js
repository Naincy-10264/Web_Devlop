function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signinForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Simple validation
        if (!email || !password) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                alert("Sign-in successful!");

                // Optional: Save userId or session (if needed)
                // localStorage.setItem("userId", result.userId);

                // Optional: Redirect to another page
                // window.location.href = "dashboard.html";
            } else {
                alert("Sign-in failed: " + (result.error || "Invalid credentials."));
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
