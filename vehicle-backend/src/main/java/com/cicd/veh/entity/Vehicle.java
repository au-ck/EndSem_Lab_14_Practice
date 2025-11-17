package com.cicd.veh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicle_table")
public class Vehicle {

    @Id
    @Column(name = "vehicle_id")
    private int id;

    @Column(name = "vehicle_number", nullable = false, unique = true, length = 20)
    private String number;

    @Column(name = "vehicle_model", nullable = false, length = 50)
    private String model;

    @Column(name = "vehicle_brand", nullable = false, length = 50)
    private String brand;

    @Column(name = "vehicle_type", nullable = false, length = 30)
    private String type; // e.g., Car, Bike, Truck

    @Column(name = "vehicle_color", length = 30)
    private String color;

    @Column(name = "vehicle_owner", nullable = false, length = 50)
    private String ownerName;

    @Column(name = "vehicle_registration_date", length = 20)
    private String registrationDate;

    // Getters and Setters
    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
        this.id = id; 
    }

    public String getNumber() { 
        return number; 
    }
    public void setNumber(String number) { 
        this.number = number; 
    }

    public String getModel() { 
        return model; 
    }
    public void setModel(String model) { 
        this.model = model; 
    }

    public String getBrand() { 
        return brand; 
    }
    public void setBrand(String brand) { 
        this.brand = brand; 
    }

    public String getType() { 
        return type; 
    }
    public void setType(String type) { 
        this.type = type; 
    }

    public String getColor() { 
        return color; 
    }
    public void setColor(String color) { 
        this.color = color; 
    }

    public String getOwnerName() { 
        return ownerName; 
    }
    public void setOwnerName(String ownerName) { 
        this.ownerName = ownerName; 
    }

    public String getRegistrationDate() { 
        return registrationDate; 
    }
    public void setRegistrationDate(String registrationDate) { 
        this.registrationDate = registrationDate; 
    }

    @Override
    public String toString() {
        return "Vehicle [id=" + id + ", number=" + number + ", model=" + model + 
               ", brand=" + brand + ", type=" + type + ", color=" + color +
               ", ownerName=" + ownerName + ", registrationDate=" + registrationDate + "]";
    }
}
