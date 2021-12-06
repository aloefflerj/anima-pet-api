@doacoesData-service
Feature: Serviço de Validação de Dados de Doações
    Para validar doações
    Como um desenvolvedor
    Eu quero ter certeza de que a tipagem dos dados estão corretos

    Scenario Outline: Validar dados de doações
        Given Uma doação de id <id>
        When Esta doação existe
        Then Dados de doações devem ser validadas

        Examples:
            | id |
            | 1  |
            | 2  |
