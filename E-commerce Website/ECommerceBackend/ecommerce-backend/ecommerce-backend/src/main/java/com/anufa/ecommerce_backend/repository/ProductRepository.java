package com.anufa.ecommerce_backend.repository;

import com.anufa.ecommerce_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
