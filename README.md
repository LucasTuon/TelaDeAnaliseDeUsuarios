# Análise de Usuários com JSONPlaceholder

Uma ferramenta interativa construída em JavaScript vanila para listar usuários, calcular métricas de engajamento baseadas em seus *posts* e comentários, e gerar relatórios automatizados.

---

## Como Executar o Projeto

A aplicação está hospedada através do **GitHub Pages**. 

Para testar o projeto, basta acessar o link abaixo:
**[Clique aqui para acessar a aplicação](https://seu-usuario.github.io/TelaDeAnaliseDeUsuarios/)**

---

## Funcionalidades

* **Carregamento Dinâmico:** Busca usuários diretamente da API *JSONPlaceholder*.
* **Métricas em Tempo Real:** Calcula a quantidade de *posts*, média de caracteres, média de comentários e o *status* do usuário (Ativo/Inativo).
* **Filtros Inteligentes com Debounce:** Filtra os resultados por tamanho do *post* e quantidade mínima de publicações sem sobrecarregar a aplicação.
* **Exportação de Relatórios:** Gera e baixa um relatório em formato *CSV*.
* **Simulação de Envio:** Envia os dados consolidados via requisição *POST*.

---

## Tecnologias Utilizadas

* **HTML5:** Estruturação da interface.
* **JavaScript (ES6+):** Lógica de negócios, manipulação assíncrona (*async/await*) e arquitetura modular de arquivos (*ES Modules*).
* **API Externa:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para o consumo de dados fictícios de teste.

---

## Estrutura do Projeto

O projeto foi desenvolvido seguindo o princípio de separação de responsabilidades:

* `index.html`: Interface do usuário.
* `main.js`: Arquivo central que gerencia os eventos e a orquestração do fluxo.
* `api.js`: Camada responsável exclusivamente pelas requisições *HTTP* (*fetch*).
* `logic.js`: Concentra os cálculos de métricas e formatação do *CSV*.
* `ui.js`: Responsável direto pela manipulação do *DOM* e renderização das informações na tela.


## Desafios e Aprendizados

* Tratamento manual de erros *HTTP* em requisições de teste que não falham na rede.
* Prevenção de divisões matemáticas por zero (*NaN/Infinity*) ao aplicar filtros restritivos.
* Gerenciamento de assincronismo em funções dependentes de dados externos.
* Implementação correta de *debounce* para controle de fluxo de eventos de entrada (*input*).
