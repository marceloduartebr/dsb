---
title: "Porto de Santos: APS restabelece portal e intranet 18 dias após ataque sem ter informado o alcance da invasão"
description: "A APS teve os sistemas derrubados em 6 de novembro, diz que não houve vazamento, mas admite não ter determinado o alcance do ataque."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "Portos e Navios"
sourceUrl: "https://portosenavios.com.br/noticias/portos-e-logistica/apos-ataque-cibernetico-aps-recupera-sistema-de-protocolo-digital-e-intranet"
cover: "https://covers.duarte.top/covers/20261125-autoridade-portuaria-santos-ataque-sistemas-1220.jpg"
tipo: incidente
pais: br
tags: ["infraestrutura-critica", "portos", "resposta-a-incidentes", "lgpd"]
---

Em uma linha: afirmar que não houve vazamento sem saber o alcance do ataque é uma esperança, não uma conclusão.

## O que aconteceu

A Autoridade Portuária de Santos (APS), que administra o maior porto do Brasil, teve seus sistemas derrubados por um ataque cibernético em 6 de novembro de 2026. Segundo o g1, em 18 de novembro mais de 30 sistemas ainda operavam de forma alternativa, a Polícia Federal investigava o caso e a companhia dizia não ter sido possível determinar o alcance do ataque, embora afirmasse que não houve vazamento de dados. Em 17 de novembro, a APS reuniu cerca de 60 representantes de terminais para apresentar a linha do tempo do incidente.

Em 23 de novembro voltou a Supervia Eletrônica, primeiro sistema externo restabelecido. Em 24 de novembro, segundo a Portos e Navios, voltaram o Portal do Cliente e Fornecedor e a intranet. A APS diz que a prioridade agora é retomar os sistemas ainda em manutenção e atualizar os dados desde o incidente. As operações de carga, segundo a companhia, não foram paralisadas.

## Por que importa

O porto organizado de Santos concentra cerca de 30% das trocas comerciais brasileiras e tem 53 terminais. Um incidente que deixa sistemas fora do ar por quase três semanas mostra o custo operacional, mas a parte regulatória depende de outra resposta: quais dados pessoais de clientes, fornecedores e colaboradores estavam nos sistemas afetados e se foram acessados. Sem determinar o alcance, não há como sustentar a ausência de vazamento.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
| --- | --- | --- |
| Indisponibilidade prolongada | Sistemas fora do ar desde 6/11, retorno gradual até 24/11 | Alta |
| Alcance desconhecido | APS diz não ter determinado o alcance do ataque | Alta |
| Integridade dos dados | Prioridade declarada é atualizar os dados desde o incidente | Média |

## O que fazer nesta semana

1. Mapear quais sistemas guardam dados pessoais de clientes, fornecedores e funcionários e quem acessa cada um (dono: DPO com o time de dados).
2. Testar se, em um incidente, é possível listar em horas quais dados existiam em cada sistema afetado (dono: CISO).
3. Revisar o plano de continuidade para sistemas de relacionamento com clientes e fornecedores, com prazos de retorno definidos (dono: gerente de TI).
