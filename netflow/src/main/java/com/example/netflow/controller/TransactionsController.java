package com.example.netflow.controller;
import com.example.netflow.service.TransactionsService;

import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.plaid.client.ApiClient;
import retrofit2.Response;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

@RestController
public class TransactionsController {
    private final TransactionsService transactionsService;
    @Autowired
    public TransactionsController(TransactionsService transactionsService){
        this.transactionsService = transactionsService;
    }
    @GetMapping("/transactionsInfo")
    public TransactionsGetResponse getTransactionsInfo() throws IOException {
        // return "Hello"; 
        return transactionsService.getTransactionInfo(); 
        // return transactionsService.getTransactionInfo();
    }
}