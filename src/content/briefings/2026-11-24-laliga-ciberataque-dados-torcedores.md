---
title: "LaLiga confirma ciberataque com extração de dados pessoais de torcedores"
description: "Entre 14 e 16 de novembro de 2026, um invasor acessou uma plataforma de serviços a torcedores da LaLiga e extraiu dados de usuários da liga e de alguns clubes."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "LALIGA"
sourceUrl: "https://www.laliga.com/es-GB/noticias/laliga-ha-sido-victima-de-un-ciberataque-que-ha-afectado-a-datos-personales-de-aficionados"
cover: "https://covers.duarte.top/covers/20261124-laliga-ciberataque-dados-torcedores-0812.jpg"
tipo: incidente
tags: ["laliga", "vazamento", "gdpr", "terceiros"]
pais: eu
---

Em uma linha: uma plataforma central de torcedores, compartilhada por liga e clubes, foi acessada por três dias e teve dados pessoais extraídos.

## O que aconteceu

Em nota de imprensa de 23/11/2026, a LaLiga informou que um criminoso acessou de forma ilegítima, entre 14 e 16 de novembro, uma de suas plataformas tecnológicas de serviços a torcedores e extraiu dados pessoais de usuários registrados em serviços digitais da LaLiga e de alguns clubes. A equipe de segurança identificou a origem do acesso e conteve o ataque em 16/11. Segundo a liga, o incidente ficou restrito a essa plataforma e não atingiu os sistemas que sustentam a competição. O caso foi comunicado à AEPD e denunciado à Polícia Nacional; clubes afetados foram avisados diretamente e publicaram comunicados próprios.

## Por que importa

Plataformas centrais que reúnem cadastros de vários parceiros misturam dados de controladores diferentes. Depois da contenção, o trabalho difícil é saber de quem é cada registro e quem precisa notificar cada titular, o que depende de um inventário por registro, não por sistema.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Acesso não autorizado à plataforma de torcedores | Nota oficial da LaLiga (14 a 16/11) | Alta |
| Extração de dados pessoais de usuários da liga e de clubes | Nota oficial e comunicados de clubes | Alta |
| Golpes direcionados a torcedores com os dados extraídos | Risco inferido; sem dados públicos sobre uso | Média |

## O que fazer nesta semana

1. Listar plataformas que armazenam dados de titulares de parceiros e quem é o controlador de cada conjunto (dono: DPO).
2. Testar se é possível gerar, em horas, a lista de titulares afetados por parceiro a partir de um incidente simulado (dono: time de governança de dados).
3. Revisar nos contratos com parceiros os prazos e responsabilidades de notificação em incidentes compartilhados (dono: jurídico).