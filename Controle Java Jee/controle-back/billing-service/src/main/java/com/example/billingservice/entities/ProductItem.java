package com.example.billingservice.entities;

import com.example.billingservice.model.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity @AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class ProductItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private Double price;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Bill bill;
    private Long productId;
    @Transient
    private Product product;
}