package com.example.netflow.controller;

import com.example.netflow.service.AccountsService;
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
public class AccountsController {
    private final AccountsService accountsService;

    @Autowired
    public AccountsController(AccountsService accountsService){
        this.accountsService = accountsService;
    }

    @GetMapping("/accountInfo")
    public AccountsGetResponse index() throws IOException {
        return accountsService.getAccountInfo();



    }

}