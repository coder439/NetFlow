package com.example.base.restservice.controller;

import com.example.base.restservice.model.Spending;
import com.example.base.restservice.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SpendingController {

    private final SpendingService spendingService;

    @Autowired
    public SpendingController(SpendingService spendingService) {
        this.spendingService = spendingService;
    }

    @GetMapping("/spendings")
    public List<Spending> getAllSpendings() {
        return spendingService.getAllSpendings();
    }
}