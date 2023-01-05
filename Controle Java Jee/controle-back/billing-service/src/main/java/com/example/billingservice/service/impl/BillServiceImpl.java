package com.example.billingservice.service.impl;

import com.example.billingservice.entities.Bill;
import com.example.billingservice.feign.CustomerRestClient;
import com.example.billingservice.feign.ProductItemRestClient;
import com.example.billingservice.model.Customer;
import com.example.billingservice.model.Product;
import com.example.billingservice.repositories.BillRepository;
import com.example.billingservice.repositories.ProductItemRepository;
import com.example.billingservice.service.BillingService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @AllArgsConstructor
public class BillServiceImpl implements BillingService {
    BillRepository billRepository;
    ProductItemRepository productItemRepository;
    CustomerRestClient customerRestClient;
    ProductItemRestClient productItemRestClient;

    @Override
    public Bill getBillById(Long id) {
        Bill bill = billRepository.findById(id).get();
        Customer customer = customerRestClient.getCustomerById(bill.getCustomerId());
        bill.setCustomer(customer);
        bill.getProductItems().forEach(productItem -> {
            Product product = productItemRestClient.getProductById(productItem.getProductId());
            productItem.setProduct(product);
        });
        return bill;
    }

    @Override
    public List<Bill> getBills() {
        List<Bill> bills= billRepository.findAll();
        bills.forEach(bill -> {
            Customer customer = customerRestClient.getCustomerById(bill.getCustomerId());
            bill.setCustomer(customer);
            bill.getProductItems().forEach(productItem -> {
                Product product = productItemRestClient.getProductById(productItem.getProductId());
                productItem.setProduct(product);
            });
        });
        return bills;
    }

    @Override
    public List<Bill> getBillByCustomerId(Long customerId) {
        List<Bill> bills= billRepository.getBillByCustomerId(customerId);
        bills.forEach(bill -> {
            Customer customer = customerRestClient.getCustomerById(bill.getCustomerId());
            bill.setCustomer(customer);
            bill.getProductItems().forEach(productItem -> {
                Product product = productItemRestClient.getProductById(productItem.getProductId());
                productItem.setProduct(product);
            });
        });
        return bills;
    }
}
