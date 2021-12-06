@usuarios-common
Feature: Serviço de Comportamento Comum das Rotas
    Para gerenciar as rotas em comum
    Como um desenvolvedor
    Eu quero ter certeza de que as operações do CRUD funcionem através da REST API

    ## NOT FOUND
    Scenario Outline: Not found
        Given Faço uma requisição 'GET' para '/rota-errada'
        When Recebo uma resposta
        Then Espero que a resposta retorne um status 404