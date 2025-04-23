public class Main {
    public static void main(String[] args) {
        // Just test the DB connection
        DBConnection.connect();

        // Register a user
        UserDAO.registerUser("Naincy_Katiyar", "naincy07@gmail.com", "password123");

        // Try logging in
        UserDAO.validateLogin("Naincy_Katiyar", "password123");
        UserDAO.validateLogin("Naincy_Katiyar", "wrongpass");


        // ProductDAO.addProduct("Smartphone", 19999.99, "Electronics", "images/smartphone.jpg");
        // ProductDAO.addProduct("Jeans", 999.50, "Clothing", "images/jeans.jpg");
        // ProductDAO.addProduct("Trending Jeans", 1999.50, "Clothing", "images/jeans.jpg");
        ProductDAO.addProduct("Trending Jeans", 1999.50, "Clothing", "images/jeans.jpg");



        System.out.println("\n📦 All Products:");
        for (ProductDAO.Product p : ProductDAO.getAllProducts()) {
            System.out.println("→ " + p);
        }

        CartDAO.addToCart(1, 1, 2);  // 2 Smartphones
        CartDAO.addToCart(1, 2, 1);  // 1 Jeans

// Display cart items
        System.out.println("\n🛒 Cart for user ID 1:");
        for (CartDAO.CartItem item : CartDAO.getCartItems(1)) {
            System.out.println("→ " + item);
        }
    }
}
