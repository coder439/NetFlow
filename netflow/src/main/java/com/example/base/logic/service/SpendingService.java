package com.example.base.restservice.service;

import com.example.base.restservice.model.Spending;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SpendingService {

    public List<Spending> getAllSpendings() {
        return Arrays.asList(
            new Spending(1L, "Groceries", 44.0),
            new Spending(2L, "Rent", 1000.0),
            new Spending(3L, "Utilities", 150.0)
        );
    }
}