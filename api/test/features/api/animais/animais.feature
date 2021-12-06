@usuarios-service
Feature: Serviço de Animais
    Para gerenciar os animais
    Como um desenvolvedor
    Eu quero ter certeza de que as operações do CRUD funcionem através da REST API

    ## LOAD DUMMY DATA FOR TESTING
    # Scenario Outline: Carregar dados fake para teste
    #     Given Faço uma requisição 'GET' para '/backup/animais'
    #     When Recebo uma resposta
    #     Then Espero que a resposta retorne um status 200

    ## GET ALL ANIMAIS
    Scenario Outline: Listar todos os animais
        Given Faço uma requisição 'GET' para '/animais'
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | response |
            | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 } |

    # GET ANIMAL
    Scenario Outline: Buscar um animal
        Given Faço uma requisição 'GET' para '/animais/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um objeto no formato json: <response>

        Examples:
            | id | response |
            | 1  | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 }   |
            | 2  | { "id": 6, "nome": "Nymeria", "raca": "Direwolf", "idade": 5 } |

    # ## POST NEW ANMAL
    Scenario Outline: Criar um novo animal
        Given Faço uma requisição 'POST' para '/animais'
        Given Adiciono um corpo <body> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | body                                                    | response                                                     |
            | { "nome": "Grey Wind", "raca": "Direwolf", "idade": 5 } | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 } |

    # ## DELETE ANIMAL
    Scenario Outline: Deletar um animal
        Given Faço uma requisição 'DELETE' para '/animais/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um array no formato json: <response>

        Examples:
            | id | response                                                     |
            | 3  | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 } |

    # ## UPDATE ANIMAL
    Scenario Outline: Atualizar um animal
        Given Faço uma requisição 'PUT' para '/animais/{id}'
        Given Adiciono um parâmetro <id> para a rota em questão
        Given Adiciono um corpo <body> para a rota em questão
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 200
        Then Espero que a resposta retorne um objeto no formato json: <response>

        Examples:
            | id | body                    | response                                                                                         |
            | 8  | { "nome": "Grey Wind" } | { "id": 5, "nome": "Ghost", "raca": "Direwolf", "idade": 5 } |
