package com.springboot.laptop;

import com.springboot.laptop.controller.ProductController;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(title = "Shop Electronic API", version = "1.0.0"),
		servers = {@Server(url = "/") },
		tags = {@Tag(name = "Electronic store", description = "Free shipping - Best quality")}
)
public class LaptopApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(LaptopApplication.class, args);
	}



}
