## Pré-requisitos para rodar o projeto:
-   Node: 18.13.0

## Instalando o projeto
Para instalar o projeto, basta utilizar o comando `npm install` para instalar todas as dependências.

## Rodando o projeto
### Com a interface gráfico

        npm run cypress:open

### Rodando com o mochawesome (headless mode):

        npm run test

## Relatórios
Ao rodar com o comando `npm run test`, o projeto criará um relatório com a ferramenta mochawesome. 
Para ver o relatório, basta abrir o arquivo localizado em cypress/reports/mochareports/report.html .

## Evidências
Para ver as evidências dos Casos de Testes descritos no documento **estudo-de-casos-de-testes.pdf** de acordo com o último run (entrega) do projeto, basta abrir a pasta /evidencias que será possível ver tanto o relatório do Mocha, quanto vídeos de sua execução.

### Relatório do mocha
O relatório do mocha fica no caminho /evidencias/relatorio/report.html

### Videos
Para ver os videos do último run, assim como os relatórios salvos do último, basta acessar o diretório `/evidencias/videos`. Aqui você encontrará dois vídeos: **negativos.spec.cy.js** e **smoke.spec.cy.js**. O primeiro refere-se aos testes da seção **Casos de Testes realizando ações mapeadas que resultam comportamentos inesperados (Negativos)** do documento **estudo-de-casos-de-testes.pdf**,  enquanto que o segundo, trata sobre a seção **Casos de Testes realizando ações mapeadas (Smoke)** do mesmo.

Referências: 

https://dev.to/bushraalam/using-mochawesome-reporter-with-cypress-54pf

https://stackoverflow.com/questions/65702340/how-to-view-cy-log-output-in-mochawesome-html-report