---
title: "CISA adiciona ao KEV dez falhas exploradas em Mitel MiCollab, Juniper Session Smart, Danfoss e Vates Xen Orchestra"
description: "Em 25 de novembro de 2026 a CISA incluiu dez CVEs no catálogo KEV, com evidência de exploração ativa; cinco delas afetam o Mitel MiCollab."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "CISA"
sourceUrl: "https://cisa.gov/news-events/alerts/2026/11/25/cisa-adds-10-known-exploited-vulnerabilities-catalog"
cover: "https://covers.duarte.top/covers/20261126-cisa-kev-mitel-juniper-danfoss-xen-1307.jpg"
tipo: vulnerabilidades
pais: global
tags: ["cisa", "kev", "mitel", "juniper"]
---

Em uma linha: dez falhas com exploração ativa entram no KEV no mesmo dia, e cinco delas estão no mesmo produto de colaboração.

## O que aconteceu

Em 25 de novembro de 2026, a CISA adicionou dez vulnerabilidades ao catálogo KEV, com base em evidência de exploração ativa: CVE-2026-133275, CVE-2026-133303, CVE-2026-133311, CVE-2026-133323 e CVE-2026-133324 (Mitel MiCollab); CVE-2026-103406 (HPE Juniper Session Smart Conductor e Session Smart Router); CVE-2026-133469 (Vates Xen Orchestra); e CVE-2023-25914, CVE-2023-25915 e CVE-2025-41450 (Danfoss AK-SM 800A). No aviso MISA-2026-0012, atualizado em 24 de novembro, a Mitel descreve as cinco falhas no componente de áudio, web e videoconferência (AWV) das versões 10.3 (10.3.0.18) e anteriores; duas delas, injeção de XML e injeção de comandos, são classificadas como críticas e exploráveis sem autenticação. A fabricante afirma que o uso combinado pode ampliar o impacto e indica correção no artigo KB000129195 ou a atualização para uma versão posterior.

## Por que importa

O catálogo KEV confirma exploração em ambiente real, não só a existência da falha. Sistemas de colaboração, roteadores, orquestradores de máquinas virtuais e controladores de refrigeração costumam ficar fora do inventário de dados, mas são caminho de entrada para a rede e para o que ela guarda.

## Leitura de risco

Vetor | Evidência pública | Gravidade
--- | --- | ---
Exploração ativa em produto de colaboração | Cinco CVEs do MiCollab AWV no KEV; Mitel classifica duas como críticas e sem autenticação | Alta
Injeção de comandos em roteador Session Smart | CVE-2026-103406 no alerta da CISA | Alta
Falhas em Xen Orchestra e controladores Danfoss | Três CVEs Danfoss e uma Vates no mesmo lote do KEV | Alta

## O que fazer nesta semana

1. Verificar na rede a presença de Mitel MiCollab 10.3.0.18 ou anterior, Session Smart, Xen Orchestra e Danfoss AK-SM 800A, e a exposição à internet (responsável: segurança da informação / infraestrutura).
2. Aplicar as correções publicadas pelos fabricantes e registrar a data da aplicação (responsável: infraestrutura / dono do ativo).
3. Onde o sistema esteve exposto, checar sinais de comprometimento antes de só aplicar o patch (responsável: resposta a incidentes).
