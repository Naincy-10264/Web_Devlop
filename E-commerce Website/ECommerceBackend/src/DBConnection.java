import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    public static Connection connect() {
        Connection conn = null;
        try {
            // Force loading the driver class
            Class.forName("org.sqlite.JDBC");
            // Connect to SQLite database file
            conn = DriverManager.getConnection("jdbc:sqlite:ecommerce.db");
            System.out.println(" Connected to database successfully!");
        } catch (ClassNotFoundException e) {
            System.out.println(" JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println(" SQL Error: " + e.getMessage());
        }
        return conn;
    }
}
