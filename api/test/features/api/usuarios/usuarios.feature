@usuarios-service
Feature: Serviço de Usuários
    Para gerenciar os usuários
    Como um desenvolvedor
    Eu quero ter certeza de que as operações do CRUD funcionem através da REST API

    ## LOAD DUMMY DATA FOR TESTING
    # Scenario Outline: Carregar dados fake para teste
    #     Given Faço uma requisição 'GET' para '/backup/usuarios'
    #     When Recebo uma resposta
    #     Then Espero que a resposta retorne um status 200

    ## GET ALL USUARIOS
    Scenario Outline: Listar todos os usuários
        Given Faço uma requisição 'GET' para '/usuarios'
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | response                                                                                         |
            | { "id": 1, "nome": "Jon Snow", "passwd": "123!@#qweQWE", "cpf": "123456789", "animais": [1, 2] } |

    ## GET USUARIO
    Scenario Outline: Buscar um usuário
        Given Faço uma requisição 'GET' para '/usuarios/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um objeto no formato json: <response>

        Examples:
            | id | response                                                                                     |
            | 1  | { "id": 1, "nome": "Jon Snow", "passwd": "123!@#qweQWE", "cpf": "123456789", "animais": [1]} |
            | 2  | { "id": 2, "nome": "Arya", "passwd": "valarmorghulis", "cpf": "2121321321", "animais": [2] } |

    ## POST NEW USUARIO
    Scenario Outline: Criar um novo usuário
        Given Faço uma requisição 'POST' para '/usuarios'
        Given Adiciono um corpo <body> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | body                                                                                              | response                                                                                         |
            | { "nome": "Tyrion Lannister", "passwd": "123!@#qweQWE", "cpf": "12345678910", "animais": [8, 9] } | { "id": 1, "nome": "Jon Snow", "passwd": "123!@#qweQWE", "cpf": "123456789", "animais": [1, 2] } |

    ## DELETE USUARIO
    Scenario Outline: Deletar um usuário
        Given Faço uma requisição 'DELETE' para '/usuarios/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | id | response                                                                                         |
            | 11 | { "id": 1, "nome": "Jon Snow", "passwd": "123!@#qweQWE", "cpf": "123456789", "animais": [1, 2] } |

    ## UPDATE USUARIO
    Scenario Outline: Atualizar um usuário
        Given Faço uma requisição 'PUT' para '/usuarios/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        Given Adiciono um corpo <body> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um objeto no formato json: <response>

        Examples:
            | id | body                           | response                                                                                         |
            | 16 | { "nome": "Brienne of Tarth" } | { "id": 1, "nome": "Jon Snow", "passwd": "123!@#qweQWE", "cpf": "123456789", "animais": [1, 2] } |
