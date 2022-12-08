package com.example.billingservice.model;

import lombok.*;

@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Product {
    private Long id;
    private String name;
    private double price;
    private double quantity;
}
