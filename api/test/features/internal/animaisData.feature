@animaisData-service
Feature: Serviço de Validação de Dados de Animais
    Para validar animais
    Como um desenvolvedor
    Eu quero ter certeza de que a tipagem dos dados estão corretos
    
     Scenario Outline: Validar dados de animais
        Given Um animal de id <id>
        When Este animal existe
        Then Dados de animais devem ser validados

        Examples:
            | id |
            | 1  |
            | 2  |
            | 3  |
            | 4  |
            | 5  |
