package com.springboot.laptop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;
import java.util.Objects;

@Configuration
public class FileUploadConfig implements EnvironmentAware {

    private Environment environment;

    private Long fileSize;

    @Override
    public void setEnvironment(final Environment environment) {
        this.environment = environment;
        fileSize = Long.valueOf(environment.getProperty("image.upload.file-size"));
    }




    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofBytes(fileSize));
        factory.setMaxRequestSize(DataSize.ofBytes(fileSize));
        return factory.createMultipartConfig();
    }
}
