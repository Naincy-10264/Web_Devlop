import java.sql.*;

public class UserDAO {
    
    // Register new user
    public static boolean registerUser(String username, String email, String password) {
        String sql = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.connect(); 
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.setString(3, password);

            pstmt.executeUpdate();
            System.out.println(" User registered: " + username);
            return true;

        } catch (SQLException e) {
            System.out.println(" Registration failed: " + e.getMessage());
            return false;
        }
    }

    // Login validation
    public static boolean validateLogin(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection conn = DBConnection.connect(); 
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            pstmt.setString(2, password);

            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                System.out.println(" Login successful: " + username);
                return true;
            } else {
                System.out.println(" Invalid credentials");
                return false;
            }

        } catch (SQLException e) {
            System.out.println(" Login error: " + e.getMessage());
            return false;
        }
    }
}
