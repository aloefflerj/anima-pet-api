@doacoes-service
Feature: Serviço de Doações
    Para gerenciar as doacoes
    Como um desenvolvedor
    Eu quero ter certeza de que as operações do CRUD funcionem através da REST API

    ## LOAD DUMMY DATA FOR TESTING
    # Scenario Outline: Carregar dados fake para teste
    #     Given Faço uma requisição 'GET' para '/backup/doacoes'
    #     When Recebo uma resposta
    #     Then Espero que a resposta retorne um status 200

    ## GET ALL DOACOES
    Scenario Outline: Listar todas as doações
        Given Faço uma requisição 'GET' para '/doacoes'
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | response |
            | { "id": 1, "doador": 1, "donatario": 2, "tipo": "ração" } |

    # GET ANIMAL
    Scenario Outline: Buscar uma doação
        Given Faço uma requisição 'GET' para '/doacoes/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um objeto no formato json: <response>

        Examples:
            | id | response |
            | 1  | { "id": 1, "doador": 1, "donatario": 2, "tipo": "ração" }        |
            | 2  | { "id": 2, "doador": 3, "donatario": 4, "tipo": "banho e tosa" } |

    # ## POST NEW ANMAL
    Scenario Outline: Criar uma nova doação
        Given Faço uma requisição 'POST' para '/doacoes'
        Given Adiciono um corpo <body> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | body                                               | response                                                  |
            | { "doador": 5, "donatario": 6, "tipo": "remédio" } | { "id": 1, "doador": 1, "donatario": 2, "tipo": "ração" } |

    # ## DELETE ANIMAL
    Scenario Outline: Deletar uma doacao
        Given Faço uma requisição 'DELETE' para '/doacoes/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | id | response                                                     |
            | 3  | { "id": 1, "doador": 1, "donatario": 2, "tipo": "ração" }    |

    # ## UPDATE ANIMAL
    Scenario Outline: Atualizar um doador
        Given Faço uma requisição 'PUT' para '/doacoes/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        Given Adiciono um corpo <body> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um objeto no formato json: <response>

        Examples:
            | id | body                       | response                                                                                         |
            | 1  | { "tipo": "Banho e tosa" } | { "id": 1, "doador": 1, "donatario": 2, "tipo": "ração" } |
