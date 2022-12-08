package com.example.billingservice.entities;

import com.example.billingservice.model.Customer;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity @AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class Bill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date billingDate;
    @OneToMany(mappedBy = "bill")
    private Collection<ProductItem> productItems = new java.util.ArrayList<>();
    private Long customerId;
    @Transient
    private Customer customer;
}
