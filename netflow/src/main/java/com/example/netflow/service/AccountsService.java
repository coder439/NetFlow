package com.example.netflow.service;

import com.plaid.client.ApiClient;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

@Service
public class AccountsService {
    public AccountsGetResponse getAccountInfo() throws IOException {
        PlaidApi plaidClient;
        HashMap<String, String> apiKeys = new HashMap<String, String>();
        apiKeys.put("clientId", "6521df56008d6a001ddd4c5a");
        apiKeys.put("secret", "1fd2f0f2f74d22a875c3ee3779aa8a");
        ApiClient apiClient = new ApiClient(apiKeys);
        apiClient.setPlaidAdapter(ApiClient.Sandbox); // or equivalent, depending on which environment you're calling into
        plaidClient = apiClient.createService(PlaidApi.class);

        SandboxPublicTokenCreateRequest createRequest = new SandboxPublicTokenCreateRequest()
                .institutionId("ins_109511")
                .initialProducts(Arrays.asList(Products.AUTH));

        Response<SandboxPublicTokenCreateResponse> createResponse = plaidClient
                .sandboxPublicTokenCreate(createRequest)
                .execute();

        ItemPublicTokenExchangeRequest exchangeRequest = new ItemPublicTokenExchangeRequest()
                .publicToken(createResponse.body().getPublicToken());
        Response<ItemPublicTokenExchangeResponse> response = plaidClient
                .itemPublicTokenExchange(exchangeRequest)
                .execute();
//
        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        String accessToken = response.body().getAccessToken();
        String itemId      = response.body().getItemId();
        AccountsGetRequest request = new AccountsGetRequest()
                .accessToken(accessToken);
        Response<AccountsGetResponse> accountsResponse = plaidClient
                .accountsGet(request)
                .execute();
        return accountsResponse.body();

        
    }
}
