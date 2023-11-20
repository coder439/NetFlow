package com.example.netflow.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "plaid_accounts")
public class PlaidAccount {
    @Id
    private String id;
    private String accessToken;
    private String itemId;
    // Add other fields as needed

    // Constructors
    public PlaidAccount() {
    }

    public PlaidAccount(String accessToken, String itemId) {
        this.accessToken = accessToken;
        this.itemId = itemId;
        // Initialize other fields as needed
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    // Add getters and setters for other fields as needed
}
