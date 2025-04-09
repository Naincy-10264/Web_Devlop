public class Main {
    public static void main(String[] args) {
        // Just test the DB connection
        DBConnection.connect();

        // Register a user
        UserDAO.registerUser("Naincy_Katiyar", "naincy07@gmail.com", "password123");

        // Try logging in
        UserDAO.validateLogin("Naincy_Katiyar", "password123");
        UserDAO.validateLogin("Naincy_Katiyar", "wrongpass");

        // -----------------------------
        // 💼 Product operations below:
        // -----------------------------

        // Add products
        ProductDAO.addProduct("Smartphone", 19999.99, "Electronics", "images/smartphone.jpg");
        ProductDAO.addProduct("Jeans", 999.50, "Clothing", "images/jeans.jpg");

        // Display products
        System.out.println("\n📦 All Products:");
        for (ProductDAO.Product p : ProductDAO.getAllProducts()) {
            System.out.println("→ " + p);
        }
    }
}
