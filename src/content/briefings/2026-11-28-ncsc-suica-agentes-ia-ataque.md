---
title: "Suíça confirma primeiros ataques com agentes de IA: quatro de cinco invasões deram certo"
description: "O NCSC suíço relata ataques conduzidos por agentes de IA contra infraestrutura crítica e empresas, e pede correção em 24 horas."
pubDate: 2026-11-28T17:05:00-03:00
sourceName: "NCSC Suíça (BACS)"
sourceUrl: "https://bacs.admin.ch/en/26-ki-agenten-1-en"
cover: "https://covers.duarte.top/covers/20261128-ncsc-suica-agentes-ia-ataque-0803.jpg"
tipo: incidente
pais: eu
tags: ["inteligencia-artificial", "infraestrutura-critica", "suica", "agentes-de-ia"]
---

**Em uma linha:** agentes de IA encurtam para horas o caminho entre um sistema exposto e uma invasão, e o impacto passa a depender do que estava nesse sistema.

## O que aconteceu
Em 24 de novembro, o Centro Nacional de Cibersegurança da Suíça (NCSC, hoje BACS) publicou o alerta 26-KI-Agenten-1 sobre os primeiros ataques assistidos por agentes de IA relatados no país, com operadores de infraestrutura crítica de pelo menos dois setores entre as vítimas. Em entrevista à emissora SRF em 26 de novembro, o diretor Florian Schütz informou cinco casos confirmados, quatro com sistemas comprometidos. Três envolveram operadores de infraestrutura crítica, e dois deles foram invadidos, sem grandes interrupções relatadas. Pequenas e médias empresas também estão entre as vítimas. O alerta cita ARTEX e CyberStrikeAI como exemplos de agentes ofensivos acessíveis pela internet, sem afirmar que foram as ferramentas usadas, e diz que o número dessas ferramentas quase dobrou desde outubro de 2026.

## Por que importa
É uma confirmação oficial, de um CERT nacional europeu, de que agentes de IA já conduzem invasões reais. No mesmo período, a CSIRT Italia e o NCSC do Reino Unido publicaram alertas sobre campanhas semelhantes. O vetor continua sendo o básico (falhas conhecidas em sistemas expostos), mas a velocidade muda o prazo de correção e o tempo disponível para detectar.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
| --- | --- | --- |
| Exploração automatizada de falhas conhecidas em sistemas expostos | Alerta do NCSC e entrevista do diretor | Alta |
| Ataque a infraestrutura crítica | Dois operadores invadidos, segundo o NCSC | Alta |
| Acesso a sistemas sem MFA | Recomendação explícita de MFA ou passkeys em webmail e VPN | Média |
| Volume anômalo de dados | NCSC recomenda monitorar volumes de dados | Média |

## O que fazer nesta semana
1. Inventariar os sistemas expostos à internet e os dados sensíveis que cada um guarda ou alcança — TI e segurança.
2. Definir prazo de 24 horas para correções críticas nesses sistemas e exigir MFA em todo acesso remoto — CISO.
3. Sinal de que funcionou: para cada sistema exposto, a equipe sabe dizer o dono, o nível de correção e quais dados pessoais ele acessa.
