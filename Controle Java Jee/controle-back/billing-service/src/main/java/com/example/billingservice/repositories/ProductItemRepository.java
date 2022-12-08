package com.example.billingservice.repositories;

import com.example.billingservice.entities.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
    Collection<ProductItem> findByBillId(Long id);
}