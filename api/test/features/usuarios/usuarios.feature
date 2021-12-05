@usuarios-service
Feature: Serviço de Usuários
    In order to manage animais
    As a developer
    I want to make sure CRUD operations through REST API works fine

    ## GET ALL USERS

    Scenario Outline: Resposta de erro de url
        Given Caso faça um request do tipo GET para "/this-route-does-not-exist"
        When Recebo resposta de usuarios
        Then A resposta deve retornar status 404

    Scenario Outline: Buscar todos os usuários
        Given Caso faça um request do tipo GET para "/usuarios"
        When Recebo resposta de usuarios
        Then A resposta deve retornar status 200
        And A resposta deve ser um json no padrão <response>

        Examples:
            | response |
            | [{ "id": 1, "nome": "Jon Snow", "passwd": "12345", "cpf": 15321321, "animais": [5, 4] }, { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 }] |


    ## GET USER

    Scenario Outline: Buscar um usuário pelo id
        Given O usuário com id <id> exista
        When Caso faça um request do tipo GET para "/usuarios/{id}"
        When Recebo resposta de usuarios
        Then A resposta deve retornar status 200
        And A resposta deve ser um json no padrão <response>

        Examples:
            | id | response |
            | 1  | { "id": 1, "nome": "Dalila", "raca": "Bulldog", "idade": 15 }    |
            | 5  | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 }     |
    
     Scenario Outline: Erro usuário não existe
        Given O usuário com id 999 não exista
        When Caso faça um request do tipo GET para "/usuarios/{id}"
        When Recebo resposta de usuarios
        Then A resposta deve retornar status 404
        And A resposta deve ser da seguinte forma <response>

        Examples:
            | response |
            | { "success": false, "msg": "Usuário não existe"} |

    ## NEW USER

    Scenario Outline: Criar um novo usuário
        Given Um novo usuário <request>
        When Caso faça um request do tipo POST para "/usuarios"
        When Recebo resposta de usuarios
        Then A resposta deve retornar status 200
        And A resposta deve ser um json no padrão <response>

        Examples:
            | request |
            | { "nome": "Tyrion", "passwd": "123!@#qweQWE", "cpf": "12345678910", "animais": [2,7] } |