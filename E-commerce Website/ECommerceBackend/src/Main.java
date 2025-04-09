// src/Main.java

public class Main {
    public static void main(String[] args) {
        // Just test the DB connection
        DBConnection.connect();
        // Register a user
        UserDAO.registerUser("Naincy_Katiyar", "naincy07@gmail.com", "password123");

// Try logging in
        UserDAO.validateLogin("Naincy_Katiyar", "password123");
        UserDAO.validateLogin("Naincy_Katiyar", "wrongpass");

    }
}
