package com.example.base.restservice.model;

public class Spending {
    
    private Long id;
    private String description;
    private double amount;

    // Default constructor
    public Spending() {}

    // Parameterized constructor
    public Spending(Long id, String description, double amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}