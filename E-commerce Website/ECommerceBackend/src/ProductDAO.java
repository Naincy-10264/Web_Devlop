import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    // Inner class representing a product
    public static class Product {
        public int id;
        public String name;
        public double price;
        public String category;
        public String imageUrl;

        public Product(int id, String name, double price, String category, String imageUrl) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.category = category;
            this.imageUrl = imageUrl;
        }

        @Override
        public String toString() {
            return id + " | " + name + " | ₹" + price + " | " + category;
        }
    }

    // Add product
    public static boolean addProduct(String name, double price, String category, String imageUrl) {
        String sql = "INSERT INTO products(name, price, category, image_url) VALUES (?, ?, ?, ?)";

        try (Connection conn = DBConnection.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, name);
            pstmt.setDouble(2, price);
            pstmt.setString(3, category);
            pstmt.setString(4, imageUrl);

            pstmt.executeUpdate();
            System.out.println(" Product added: " + name);
            return true;

        } catch (SQLException e) {
            System.out.println("Failed to add product: " + e.getMessage());
            return false;
        }
    }

    // Get all products
    public static List<Product> getAllProducts() {
        List<Product> productList = new ArrayList<>();
        String sql = "SELECT * FROM products";

        try (Connection conn = DBConnection.connect();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Product p = new Product(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getDouble("price"),
                        rs.getString("category"),
                        rs.getString("image_url")
                );
                productList.add(p);
            }

        } catch (SQLException e) {
            System.out.println(" Error fetching products: " + e.getMessage());
        }

        return productList;
    }
}
