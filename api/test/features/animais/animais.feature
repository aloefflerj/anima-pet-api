@animais-service
Feature: Animais Service
    In order to manage animais
    As a developer
    I want to make sure CRUD operations through REST API works fine

    Scenario Outline: get all animais
        Given An animais request without id
        When I send GET request to /animais
        Then I receive from animais <response>

        Examples:
            | response |
            | [{ "id": 1, "nome": "Dalila", "raca": "Bulldog", "idade": 15 },{ "id": 20, "nome": "Melanie", "raca": "Shitzu", "idade": 6 }] |

    Scenario Outline: get animal
        Given The animal with <id> exists
        When I send GET request to /animais
        Then I receive from animais <response>

        Examples:
            | id | response |
            | 1  | { "id": 1, "nome": "Dalila", "raca": "Bulldog", "idade": 15 }    |
            | 5  | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 }     |