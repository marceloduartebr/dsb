---
title: "Falha no Azure API Management Classic foi explorada para roubar segredos de clientes"
description: "NSM e Microsoft confirmam exploração de vulnerabilidade no APIM Classic; Equinor e Skagerak Energi estão entre as afetadas e a correção não invalida credenciais já expostas."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "NSM (Nasjonal sikkerhetsmyndighet)"
sourceUrl: "https://nsm.no/aktuelt/nsm-deler-tiltak-mot-sarbarhet-i-azure-api-management"
cover: "https://covers.duarte.top/covers/20261124-microsoft-azure-api-management-segredos-0812.jpg"
tipo: vulnerabilidades
tags: ["microsoft", "azure", "segredos", "nuvem"]
pais: global
---

Em uma linha: a Microsoft fechou o acesso em 19/11, mas segredos guardados no APIM Classic antes disso precisam ser trocados pelo cliente.

## O que aconteceu

A NSM, autoridade nacional de segurança da Noruega, informou que um ator desconhecido explorou ativamente uma vulnerabilidade no Azure API Management Classic para obter tokens, secrets e named values, atingindo várias organizações norueguesas, entre elas Equinor e Skagerak Energi. Em aviso de Service Health enviado a clientes (relatado pela BleepingComputer e pela The Record em 23/11/2026), a Microsoft disse ter identificado o problema em 18/11 e bloqueado o caminho de acesso não autorizado ao plano de gestão em 19/11. Podem ter sido expostos secrets em Named Values, client secrets de provedores de identidade e OpenID Connect, subscription keys e tokens das APIs de gestão. As camadas v2 do APIM não foram afetadas. A Microsoft alerta que a correção não invalida credenciais acessadas antes dela.

## Por que importa

Gateways de API concentram chaves que abrem backends e bases de dados. A exposição não termina com o patch: cada segredo vazado continua abrindo o que abria até ser rotacionado, e só quem sabe o que cada um alcança consegue priorizar.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Acesso não autorizado ao plano de gestão do APIM Classic | Aviso da Microsoft e comunicado da NSM | Crítica |
| Roubo de secrets, subscription keys e tokens | Aviso da Microsoft e casos Equinor/Skagerak | Crítica |
| Acesso posterior a backends com credenciais roubadas | Alerta da Microsoft sobre credenciais não invalidadas | Alta |

## O que fazer nesta semana

1. Inventariar instâncias APIM Classic e rotacionar todos os secrets, subscription keys e client secrets armazenados nelas (dono: time de plataforma em nuvem).
2. Mapear quais backends e bases de dados cada segredo do gateway alcança e revisar logs de acesso desde o início de novembro (dono: SOC).
3. Mover segredos guardados diretamente no APIM para um cofre dedicado e avaliar a migração para as camadas v2 (dono: arquitetura de nuvem).