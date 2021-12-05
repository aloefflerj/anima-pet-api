@animais-service
Feature: Animais Service
    In order to manage animais
    As a developer
    I want to make sure CRUD operations through REST API works fine

    Scenario Outline: get animal
        Given The animal with <id> exists
        When I send GET request to /animais
        Then I receive <response>

        Examples:
            | id | response
            | 1  | { "id": 1, "nome": "Dalila", "raca": "Bulldog", "idade": 15 }
            | 5 | { "id": 20, "nome": "Melanie", "raca": "Shitzu", "idade": 6 }