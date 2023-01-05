package com.example.billingservice.service;

import com.example.billingservice.entities.Bill;

import java.util.List;

public interface BillingService {
    Bill getBillById(Long id);
    List<Bill> getBills();
    List<Bill> getBillByCustomerId(Long customerId);

}
