import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CartDAO {

    public static class CartItem {
        public int id;
        public String productName;
        public int quantity;
        public double price;

        public CartItem(int id, String productName, int quantity, double price) {
            this.id = id;
            this.productName = productName;
            this.quantity = quantity;
            this.price = price;
        }

        @Override
        public String toString() {
            return id + " | " + productName + " | Qty: " + quantity + " | ₹" + (price * quantity);
        }
    }

    // Add item to cart
    public static boolean addToCart(int userId, int productId, int quantity) {
        String sql = "INSERT INTO cart(user_id, product_id, quantity) VALUES (?, ?, ?)";

        try (Connection conn = DBConnection.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            pstmt.setInt(2, productId);
            pstmt.setInt(3, quantity);

            pstmt.executeUpdate();
            System.out.println("🛒 Item added to cart");
            return true;

        } catch (SQLException e) {
            System.out.println(" Failed to add to cart: " + e.getMessage());
            return false;
        }
    }

    // Get cart items for a user
    public static List<CartItem> getCartItems(int userId) {
        List<CartItem> items = new ArrayList<>();
        String sql = """
            SELECT c.id, p.name, c.quantity, p.price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        """;

        try (Connection conn = DBConnection.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                CartItem item = new CartItem(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getInt("quantity"),
                    rs.getDouble("price")
                );
                items.add(item);
            }

        } catch (SQLException e) {
            System.out.println(" Failed to retrieve cart: " + e.getMessage());
        }

        return items;
    }
}
