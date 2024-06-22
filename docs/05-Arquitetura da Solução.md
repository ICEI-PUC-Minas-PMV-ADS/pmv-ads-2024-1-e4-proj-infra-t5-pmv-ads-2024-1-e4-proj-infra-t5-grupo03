# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/arq.jpg)

## Diagrama de Classes


## Modelo ER

No modelo abaixo temos os dados que armazenamos no nosso banco de dados(MongoDB) que está atualmente na nuvem pelo MongoDB Atlas e os dados que estão numa API externa, o RAWG.

> - [MongoDB Atlas](https://www.mongodb.com/atlas)
> - [RAWG API de jogos](https://rawg.io/apidocs)

![Modelo ER](img/der.jpg)


## Modelo Físico

Como se trata de um banco não relacional hospedado na nuvem(MongoDB Atlas), não tem como compartilhar um arquivo, mas pode acessar o banco a partir do link: mongodb+srv://admin:E9aetuoxCfsGwpav@cluster0.fqs5xdf.mongodb.net/?retryWrites=true&w=majority

![BD1](img/BD1.jpeg)
![BD2](img/BD2.jpeg)
![BD3](img/BD3.jpeg)

PS: a entidade de jogos fica numa API externa


## Tecnologias Utilizadas
# Backend

| **Análise** | **Design** | **Implementação** |
| --- | --- | --- |
| Persistência | Banco de dados não relacional| MongoDB |
| Persistência | ORM | Waterline |
| Persistência | Hospedagem | MongoDB Atlas |
| Back end | Ambiente de execução | NodeJS |
| Back end | Framework  | Sail JS |
| Dados | API de dados| RAWG |


## Hospedagem

> - [Front-end](http://boxgames.vercel.app)


## Qualidade de Software

### Introdução

Qualidade de software é essencial para garantir que um produto de software atenda às necessidades e expectativas dos usuários e stakeholders. Para garantir essa qualidade, adotamos um conjunto de características e subcaracterísticas conforme definido pela norma ISO/IEC 25010. Abaixo estão as subcaracterísticas escolhidas e as métricas que permitirão a equipe avaliar os objetos de interesse para o projeto de desenvolvimento de um sistema de avaliação e visualização de jogos.

### Subcaracterísticas de Qualidade Escolhidas

1. **Funcionalidade - Adequação Funcional**
   - **Justificativa:** A aplicação deve atender exatamente às necessidades dos usuários, proporcionando funcionalidades que permitam a consulta, avaliação e visualização de jogos. A adequação funcional é fundamental para garantir que o software ofereça todas as funcionalidades desejadas pelos usuários.
   - **Métricas:**
     - **Cobertura de Funcionalidades Implementadas:** 95% das funcionalidades planejadas foram implementadas.
     - **Feedback dos Usuários:** 4.5/5 na avaliação média dos usuários sobre as funcionalidades oferecidas.
     - **Taxa de Aderência aos Requisitos:** 98% dos requisitos funcionais atendidos pelo sistema.

2. **Confiabilidade - Maturidade**
   - **Justificativa:** O sistema deve funcionar corretamente sem falhas, garantindo a integridade dos dados e a estabilidade do sistema. A maturidade do software é crucial para minimizar a ocorrência de erros e interrupções.
   - **Métricas:**
     - **Taxa de Falhas:** 0.01 falhas por dia.
     - **MTBF (Mean Time Between Failures):** 200 horas.
     - **Número de Incidentes Reportados:** 5 incidentes por mês.

3. **Usabilidade - Inteligibilidade**
   - **Justificativa:** A interface deve ser intuitiva e fácil de entender, para que os usuários possam utilizar o sistema sem dificuldades. A inteligibilidade garante que os usuários consigam aprender e usar o sistema de forma eficiente.
   - **Métricas:**
     - **Resultados de Testes de Usabilidade:** 90% de aprovação nos testes de usabilidade realizados com usuários.
     - **Número de Tickets de Suporte Relacionados à Usabilidade:** 3 tickets de suporte por mês.
     - **Tempo de Aprendizado:** 30 minutos para novos usuários aprenderem a utilizar o sistema.

4. **Eficiência - Comportamento em Relação ao Tempo**
   - **Justificativa:** O tempo de resposta do sistema deve ser rápido, proporcionando uma experiência de usuário eficiente. A eficiência em relação ao tempo é importante para garantir que o sistema responda prontamente às solicitações dos usuários.
   - **Métricas:**
     - **Tempo Médio de Resposta:** 1.2 segundos.
     - **Tempo de Carregamento das Páginas:** 2.5 segundos.
     - **Uso de Recursos:** 40% de uso de CPU e 30% de memória durante a operação do sistema.

5. **Manutenibilidade - Analisabilidade**
   - **Justificativa:** O código deve ser claro e bem documentado, facilitando a manutenção e a adição de novas funcionalidades. A analisabilidade é essencial para que desenvolvedores possam identificar e corrigir erros de forma eficiente.
   - **Métricas:**
     - **Tempo Médio para Identificar e Corrigir Bugs:** 2 horas.
     - **Cobertura de Testes Unitários:** 85% do código coberto por testes unitários.
     - **Complexidade Ciclomática:** Média de 5.

### Aplicação das Métricas no Projeto

- **Cobertura de Funcionalidades Implementadas:** A equipe de desenvolvimento conseguiu implementar 95% das funcionalidades planejadas para a aplicação. Isso foi medido comparando o número de funcionalidades implementadas com o número total de funcionalidades planejadas.
  
- **Feedback dos Usuários:** As avaliações dos usuários foram coletadas através de formulários de feedback, resultando em uma média de 4.5/5. Isso indica um alto nível de satisfação dos usuários com as funcionalidades oferecidas.

- **Taxa de Aderência aos Requisitos:** Dos requisitos funcionais definidos, 98% foram atendidos pelo sistema. Esse número foi obtido através de revisões de conformidade dos requisitos implementados.

- **Taxa de Falhas:** O sistema apresentou uma taxa de falhas de 0.01 por dia, o que indica um sistema altamente confiável. Isso foi monitorado através de logs de erro e relatórios de falhas.

- **MTBF (Mean Time Between Failures):** O tempo médio entre falhas foi de 200 horas, medido através do tempo de operação contínua entre cada falha registrada.

- **Número de Incidentes Reportados:** Em média, 5 incidentes foram reportados por mês, o que é um número relativamente baixo, considerando a complexidade do sistema.

- **Resultados de Testes de Usabilidade:** 90% dos participantes dos testes de usabilidade aprovaram a interface do usuário, indicando que a interface é intuitiva e fácil de usar.

- **Número de Tickets de Suporte Relacionados à Usabilidade:** Apenas 3 tickets de suporte relacionados à usabilidade foram abertos por mês, sugerindo que a maioria dos usuários encontrou a interface intuitiva e fácil de usar.

- **Tempo de Aprendizado:** Novos usuários levaram em média 30 minutos para aprender a utilizar o sistema, o que foi avaliado através de sessões de treinamento e testes de usabilidade.

- **Tempo Médio de Resposta:** O sistema respondeu em média em 1.2 segundos, medido através de testes de desempenho e monitoramento de uso real.

- **Tempo de Carregamento das Páginas:** As páginas da aplicação carregaram em média em 2.5 segundos, medido através de ferramentas de análise de desempenho web.

- **Uso de Recursos:** Durante a operação, o sistema utilizou em média 40% da CPU e 30% da memória, conforme medido por ferramentas de monitoramento de recursos.

- **Tempo Médio para Identificar e Corrigir Bugs:** A equipe de desenvolvimento levou em média 2 horas para identificar e corrigir bugs, medido através de logs de tempo e relatórios de bugs.

- **Cobertura de Testes Unitários:** 85% do código foi coberto por testes unitários, conforme medido por ferramentas de cobertura de código.

- **Complexidade Ciclomática:** A complexidade ciclomática média do código foi 5, indicando um código relativamente simples e fácil de manter.

### Conclusão

Com base nas métricas de qualidade de software escolhidas e aplicadas, o projeto de desenvolvimento do sistema de avaliação e visualização de jogos atingiu um nível elevado de qualidade. A adequação funcional, confiabilidade, usabilidade, eficiência e manutenibilidade foram todos cuidadosamente monitorados e melhorados, resultando em um produto final que atende às expectativas dos usuários e stakeholders, além de ser eficiente e fácil de manter.

<sub>**Observação:** Os dados apresentados são fictícios e foram utilizados apenas para fins de composição deste trabalho.</sub>
