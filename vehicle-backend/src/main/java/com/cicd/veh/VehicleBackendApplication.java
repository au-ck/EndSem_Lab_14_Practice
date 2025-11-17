package com.cicd.veh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class VehicleBackendApplication{

	public static void main(String[] args) {
		SpringApplication.run(VehicleBackendApplication.class, args);
		System.out.println("Hey vehicle is Running...");
		
	}

}
