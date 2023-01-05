package com.example.billingservice.controllers;

import com.example.billingservice.entities.Bill;
import com.example.billingservice.service.BillingService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController @AllArgsConstructor @CrossOrigin("*")
public class BillController {
    BillingService billingService;
    @GetMapping(path = "/fullBill/{id}")
    public Bill getBill(@PathVariable Long id){
        return billingService.getBillById(id);
    }
    @GetMapping(path = "/fullBills")
    public List<Bill> getBills(){
        System.out.println("hi");
        return billingService.getBills();
    }
}
