package com.example.productservice;

import com.example.productservice.entites.Product;
import com.example.productservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(ProductRepository productRepository, RepositoryRestConfiguration restConfiguration){
        restConfiguration.exposeIdsFor(Product.class);
        return args -> {
            productRepository.save(new Product(null, "lapTop", 152, 12));
            productRepository.save(new Product(null, "smartPhone", 1582, 152));
            productRepository.save(new Product(null, "Speaker", 15, 1245));

            productRepository.findAll().forEach(product -> {
                System.out.println(product.toString());
            });
        };
    }

}
