package com.example.billingservice;

import com.example.billingservice.entities.Bill;
import com.example.billingservice.entities.ProductItem;
import com.example.billingservice.feign.CustomerRestClient;
import com.example.billingservice.feign.ProductItemRestClient;
import com.example.billingservice.model.Customer;
import com.example.billingservice.model.Product;
import com.example.billingservice.repositories.BillRepository;
import com.example.billingservice.repositories.ProductItemRepository;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.components(new Components())
				.info(new Info().title("Billing Service")
						.description("Test Description")
						.version("1.0.0"));
	}
	@Bean
	CommandLineRunner start(BillRepository billRepository,
							ProductItemRepository productItemRepository,
							CustomerRestClient customerRestClient,
							ProductItemRestClient productItemRestClient){
		return args -> {
			Customer customer = customerRestClient.getCustomerById(1L);
			Bill bill = billRepository.save(new Bill(null, new Date(), null, customer.getId(), 0.0, null));
			List<ProductItem> productItems = new ArrayList<>();
			PagedModel<Product> products = productItemRestClient.getProducts();
			products.forEach(product -> {
				Integer quantity= 1+ new Random().nextInt(100);
				ProductItem productItem = new ProductItem();
				productItem.setId(product.getId());
				productItem.setBill(bill);
				productItem.setPrice(product.getPrice()*quantity);
				bill.setTotalToPay(bill.getTotalToPay()+ (product.getPrice()*quantity));
				productItem.setProductId(product.getId());
				productItem.setQuantity(quantity);
				productItemRepository.save(productItem);
				productItems.add(productItem);
			});
			bill.setProductItems(productItems);
			billRepository.save(bill);
		};
	}
}
