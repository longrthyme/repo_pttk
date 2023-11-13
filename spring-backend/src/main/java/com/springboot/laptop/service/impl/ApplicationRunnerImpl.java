package com.springboot.laptop.service.impl;

import com.springboot.laptop.model.Account;
import com.springboot.laptop.model.UserRoleEntity;
import com.springboot.laptop.model.enums.UserRoleEnum;
import com.springboot.laptop.repository.AccountRepository;
import com.springboot.laptop.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ApplicationRunnerImpl{

    private final UserRoleRepository roleRepository;

    private final AccountRepository accountRepository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Component
    @Order(1)
    class CommandLineRunner implements org.springframework.boot.CommandLineRunner {
        @Override
        public void run(String... args) throws Exception {
            if(!roleRepository.findByName(UserRoleEnum.ROLE_ADMIN).isPresent())
            {
                UserRoleEntity role = new UserRoleEntity();
                role.setName(UserRoleEnum.valueOf("ROLE_ADMIN"));
                role.setDescription("Quan tri vien");
                roleRepository.save(role);
            }
        }
    }

    @Component
    @Order(2)
    class CommandLineRunner1 implements org.springframework.boot.CommandLineRunner {
        @Override
        public void run(String... args) throws Exception {
            if(!accountRepository.findByUsernameIgnoreCase("admin").isPresent())
            {
                Account appClient = new Account();
                List<UserRoleEntity> listRoles = new ArrayList<>();
                UserRoleEntity role = roleRepository.findByName(UserRoleEnum.ROLE_ADMIN).get();
                listRoles.add(role);
                appClient.setRoles(listRoles);
                appClient.setUsername("admin");
                appClient.setEmail("admin2001@gmail.com");
                appClient.setEnabled(true);
                appClient.setPassword(passwordEncoder.encode("123456"));
                accountRepository.save(appClient);
            }
        }
    }
}
