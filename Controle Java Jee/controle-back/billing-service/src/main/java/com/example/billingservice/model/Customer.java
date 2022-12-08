package com.example.billingservice.model;

import lombok.*;

import javax.persistence.Entity;

@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Customer {
    private Long id;
    private String name;
    private String email;
}