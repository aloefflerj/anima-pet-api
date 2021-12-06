@usuariosData-service
Feature: Serviço de Validação de Dados de Usuários
    Para validar usuários
    Como um desenvolvedor
    Eu quero ter certeza de que a tipagem dos dados estão corretos
    
     Scenario Outline: Validar dados de usuários
        Given Um usuário de id <id>
        When Este usuário existe
        Then Dados de usuario devem ser validados

        Examples:
            | id |
            | 1  |
            | 2  |
            | 3  |
            | 4  |
            | 5  |
