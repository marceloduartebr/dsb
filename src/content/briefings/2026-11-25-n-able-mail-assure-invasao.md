---
title: "N-able confirma invasão no Mail Assure e corrige SSRF crítica (CVE-2026-134624)"
description: "Um servidor do Mail Assure e SpamExperts Hosted Cloud foi acessado; a N-able revogou tokens de clientes e corrigiu uma SSRF de CVSS 9,3 encontrada na investigação."
pubDate: 2026-11-25T08:45:00-03:00
sourceName: "N-able"
sourceUrl: "https://www.n-able.com/blog/mail-assure-incident-update"
cover: "https://covers.duarte.top/covers/20261124-n-able-mail-assure-invasao-0812.jpg"
tipo: incidente
pais: us
tags: ["n-able", "msp", "terceiros", "email"]
---

Em uma linha: um fornecedor de filtragem de e-mail para MSPs foi invadido e revogou todos os tokens de API e OAuth dos clientes.

## O que aconteceu

A N-able tirou do ar o painel e as APIs do Mail Assure e SpamExperts Hosted Cloud em 16/11/2026, atribuindo inicialmente a interrupção à configuração da plataforma. Em 18/11, confirmou que um terceiro não autorizado havia acessado um servidor hospedado e provavelmente credenciais guardadas nele. A empresa retirou o servidor do ar, rotacionou credenciais internas, revogou tokens de API e OAuth dos clientes e redefiniu senhas locais. Durante a investigação, encontrou a CVE-2026-134624, uma SSRF na checagem de conexão de sincronização LDAP (CVSS 4.0 de 9,3, segundo o aviso do fornecedor), corrigida na build 20261121.1943. O acesso foi restabelecido em 21/11. A N-able diz não ter encontrado evidência de comprometimento de dados de clientes, não informou se a falha foi o vetor de entrada e prometeu uma análise de causa raiz em até duas semanas.

## Por que importa

Serviços de filtragem de e-mail ficam no caminho das mensagens de muitos clientes ao mesmo tempo. A revogação em massa de tokens mostra o tamanho da dependência: cada integração que quebra é um acesso que alguém precisa conhecer e justificar.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Acesso não autorizado a servidor do Hosted Cloud | Atualização de incidente da N-able | Alta |
| Credenciais guardadas no servidor possivelmente acessadas | Declaração da N-able à SecurityWeek | Alta |
| SSRF para hosts internos (CVE-2026-134624) | Aviso do fornecedor e NVD | Crítica |

## O que fazer nesta semana

1. Listar integrações e scripts que usavam tokens do Mail Assure/SpamExperts e reemitir apenas os necessários, com escopo mínimo (dono: time de mensageria).
2. Para Local Cloud, confirmar a build 20261121.1943 ou posterior (dono: infraestrutura).
3. Revisar todos os terceiros com acesso por token ao e-mail corporativo e o que cada um pode ler (dono: gestão de riscos de terceiros).
