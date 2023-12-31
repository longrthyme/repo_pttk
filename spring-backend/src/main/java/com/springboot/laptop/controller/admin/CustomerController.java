package com.springboot.laptop.controller.admin;

import com.springboot.laptop.repository.CustomerRepository;
import com.springboot.laptop.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/customers")
@SecurityRequirement(name = "bearerAuth")
public class CustomerController {

    private final CustomerService customerService;

    @Operation(summary = "Get all customers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok().body(customerService.getAllCustomer());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{customerId}/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable Long customerId, @PathVariable String status) {
        return ResponseEntity.ok().body(customerService.updateStatus(customerId, status));
    }
}
