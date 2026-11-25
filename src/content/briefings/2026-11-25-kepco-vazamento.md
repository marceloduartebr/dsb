---
title: "KEPCO confirma invasão que expôs dados de 1,5 milhão de clientes, fornecedores e funcionários"
description: "A estatal de energia sul-coreana só soube do roubo pelo e-mail do próprio invasor, e a base de faturamento guardava cartão e conta bancária."
pubDate: 2026-11-25T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/south-koreas-power-giant-kepco-confirms-data-breach-impacting-15-million/"
cover: "https://covers.duarte.top/covers/20261124-kepco-vazamento-0812.jpg"
tipo: incidente
pais: global
tags: ["vazamento", "infraestrutura-critica", "coreia-do-sul", "dados-de-pagamento"]
---

**Em uma linha:** a KEPCO separou o estrago por público em três dias, mas quem avisou a empresa foi o invasor.

## O que aconteceu
A Korea Electric Power Corporation (KEPCO) confirmou que um atacante entrou na sua rede interna e acessou a plataforma de faturamento KEPCO ON e o sistema de compras eletrônicas (SRM). Em 19 de novembro de 2026, a empresa recebeu um e-mail de um hacker dizendo ter roubado os dados, segundo a autoridade de proteção de dados do país (PIPC). Um ator com o codinome "Noiem" anunciou o ataque em um fórum, mas a autoria não foi confirmada. A KEPCO confirmou o acesso em 20 de novembro, bloqueou IPs externos, suspendeu os serviços afetados e, em 22 de novembro, divulgou os números:

- 650.487 clientes do KEPCO ON: nome, dados de identificação, telefone, endereço, banco e número de conta, titular, emissor e número de cartão e dados de cobrança.
- 426.827 representantes de empresas: nome, dados de identificação, e-mail e endereço comercial.
- 442.934 funcionários: nome, lotação, matrícula, telefones e e-mail.

A empresa atribuiu o ataque a "tecnologias avançadas como IA" e não descreveu como o invasor entrou.

## Por que importa
Uma operadora de infraestrutura crítica guardava dados de cartão e de conta bancária no mesmo sistema de faturamento que o cadastro dos clientes. O alerta não veio do monitoramento da empresa, e sim do próprio invasor. A separação por público é o mínimo para notificar cada titular, mas não informa há quanto tempo os dados estavam saindo.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Acesso à rede interna e a dois sistemas de negócio | Confirmação da KEPCO em 20/11 | Alta |
| Dados de cartão e conta bancária no faturamento | Lista de dados divulgada em 22/11 | Alta |
| Detecção pelo e-mail do invasor | Nota da PIPC sobre o e-mail de 19/11 | Alta |
| Uso de IA no ataque | Declaração da KEPCO, sem detalhes técnicos | Média |

## O que fazer nesta semana
1. Listar os sistemas de faturamento e de compras que guardam dados de pagamento e checar se precisam guardá-los — dono: arquitetura de dados.
2. Mapear quais bases misturam clientes, fornecedores e funcionários e quem acessa cada uma — dono: segurança da informação com o DPO.
3. Sinal de que funcionou: em um exercício simulado, a equipe consegue dizer em horas quais registros e titulares estão em cada sistema, sem esperar o aviso de terceiros.
