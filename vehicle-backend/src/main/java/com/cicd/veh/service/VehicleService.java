package com.cicd.veh.service;

import java.util.List;
import com.cicd.veh.entity.Vehicle;

public interface VehicleService {
    Vehicle addVehicle(Vehicle vehicle);
    List<Vehicle> getAllVehicles();
    Vehicle getVehicleById(int id);
    Vehicle updateVehicle(Vehicle vehicle);
    void deleteVehicleById(int id);
}
