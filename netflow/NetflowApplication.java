package com.example.netflow;

import com.example.netflow.service.MongoConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
public class NetflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(NetflowApplication.class, args);
	}

}
