---
title: "Drupal confirma exploração de falha no instalador que permite tomar sites sem login e CISA põe no KEV (CVE-2026-132165)"
description: "A CVE-2026-132165 deixa um atacante anônimo usar o install.php para reinstalar o Drupal e tomar o site; exploração confirmada desde 19 de novembro."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "Drupal.org"
sourceUrl: "https://www.drupal.org/sa-core-2026-017"
cover: "https://covers.duarte.top/covers/20261125-drupal-instalador-rce-kev-1220.jpg"
tipo: vulnerabilidades
pais: global
tags: ["drupal", "kev", "rce", "cms"]
---

Em uma linha: a falha foi explorada um dia depois do alerta, e quem toma o site herda os dados que ele guarda.

## O que aconteceu

Em 18 de novembro de 2026, o time de segurança do Drupal publicou o alerta SA-CORE-2026-017, de risco altamente crítico (20/25), para a CVE-2026-132165. O Drupal core inclui um arquivo install.php para a instalação do sistema e, em condições específicas, um atacante pode usá-lo para tentar reinstalar o Drupal, o que pode levar à tomada do site ou à execução remota de código. Alguns caminhos de exploração, mas não todos, são mitigados quando o servidor web não consegue escrever nem alterar permissões do settings.php. A falha foi descoberta pelo OSS Scanner da Anthropic.

Em atualização do alerta, o Drupal informou ter recebido relato de exploração em sites reais desde 19 de novembro de 2026, às 19h UTC. Em 24 de novembro, a CISA adicionou a CVE ao catálogo KEV e deu às agências federais dos EUA até 27 de novembro para se proteger. Estão afetadas as versões anteriores a 10.6.22, de 11.0.0 a 11.3.21 e de 11.4.0 a 11.4.12.

## Por que importa

Drupal é usado por governos, universidades e grandes empresas em portais com formulários, cadastros e bases de contato. A exploração não exige login, e a tomada do site dá acesso à configuração e, a partir dela, ao banco de dados. Sem saber quais dados pessoais vivem em cada site, a empresa não consegue medir o alcance se a correção chegou depois de 19 de novembro.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
| --- | --- | --- |
| Execução remota sem login | SA-CORE-2026-017, risco altamente crítico | Crítica |
| Exploração ativa | Drupal confirma uso em sites reais desde 19/11; CISA KEV em 24/11 | Crítica |
| Dados nos sites | Portais Drupal guardam formulários e cadastros | Alta |

## O que fazer nesta semana

1. Atualizar todos os sites Drupal para 10.6.22, 11.3.22 ou 11.4.13 e bloquear /core/install.php no servidor web (dono: time de aplicações web).
2. Verificar sinais de reinstalação ou de troca de configuração desde 19 de novembro nos sites expostos (dono: SOC).
3. Inventariar quais dados pessoais cada site Drupal guarda ou alcança, para medir o impacto em caso de comprometimento (dono: DPO com o time de dados).
