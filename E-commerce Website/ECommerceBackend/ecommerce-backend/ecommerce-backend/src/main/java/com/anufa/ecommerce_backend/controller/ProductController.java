package com.anufa.ecommerce_backend.controller;

import com.anufa.ecommerce_backend.model.Product;
import com.anufa.ecommerce_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")  // Allows CORS for the frontend (if needed)
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productRepo.save(product);
        return ResponseEntity.ok(savedProduct);
    }
}
