# **Controle-Jee**

## **Description**  

>### Objectif :  
>Creation of an application based on a micro-service architecture that allows to manage invoices containing products and belonging to a customer.

### **Steps :**

1. Creation of customer-service micro-service which allows to manage customers

2. Creation of customer-service micro-service which allows to manage products

3. Creating the Spring cloud Gateway with a Static Routing System Configuration

4. Creation of the Eureka Discovery Service directory

5. The dynamic configuration of gateway routes

6. Creation of Billing-Service billing service using Open Feign

7. Creation of an Angular web client (Clients, Products, Inventory)

8. Deploy keycloak server :
     - Create a Realm
     - Create a client to secure
     - Creation des utilisateurs
     - Creation of users
     - Assign roles to users
     - Test the different authentication modes with Postman by showing the contents of Access-Token, Refresh Token

9. Securing Microservices and the Angular Frontend by Deploying Keycloak Adapters

10. Adding New Features

### **Realization :**

1. Creation of customer-service micro-service which allows to manage customers
     - Code Demo
![Code Demonstration](/assets/customer4.png)
     - Swagger Demo
![Swagger Demonstration](/assets/customer5.png)

2. Creation of customer-service micro-service which allows to manage products
     - Code Demo
![Code Demonstration](/assets/Product4.png)
     - Swagger Demo
![Swagger Demonstration](/assets/Product5.png)

3. Creating the Spring cloud Gateway with a Static Routing System Configuration
     - Code Demo
![Code Demonstration](/assets/GetwayStatic1.png)

4. Creation of the Eureka Discovery Service directory
     - Code Demo
![Code Demonstration](/assets/Eureka2.png)

5. The dynamic configuration of gateway routes
     - Code Demo
![Code Demonstration](/assets/GetwayDynamic1.png)

6. Creation of Billing-Service billing service using Open Feign
     - Code Demo
![Code Demonstration](/assets/Bill4.png)
     - Code Fiegn Demo
![Code Demonstration](/assets/Bill5.png)
     - Swagger Demo
![Swagger Demonstration](/assets/Bill10.png)


7. Creation of an Angular web client (Clients, Products, Inventory)
     - Clients
          - List of Clients
![Code Demonstration](/assets/CustomerList.png)
          - Edit Client
![Code Demonstration](/assets/CustomerEdit.png)
          - New Client
![Code Demonstration](/assets/CustomerNew.png)
     - Products
          - List of Products
![Code Demonstration](/assets/ProductList.png)
          - Edit Product
![Code Demonstration](/assets/ProductEdit.png)
          - New Product
![Code Demonstration](/assets/ProductNew.png)
     - Inventories
          - List of Inventories
![Code Demonstration](/assets/BillList.png)
          - Inventory Information
![Code Demonstration](/assets/BillInformations.png)