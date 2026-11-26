---
title: "myColorado: uma semana depois, o Colorado ainda não sabe se foram 50 mil ou 150 mil"
description: "Invasão tirou do ar o app de identidade digital do estado e a estimativa de afetados ainda varia por um fator de três."
pubDate: 2026-11-26T17:05:00-03:00
sourceName: "The Record"
sourceUrl: "https://therecord.media/mycolorado-app-down-data-breach"
cover: "https://covers.duarte.top/covers/20261125-mycolorado-app-invasao-0813.jpg"
tipo: incidente
pais: us
tags: ["vazamento", "governo", "identidade-digital", "estados-unidos"]
---

**Em uma linha:** quando a estimativa de afetados vai de 50 mil a 150 mil, a lacuna não é sobre o invasor, é sobre o inventário.

## O que aconteceu
O Escritório de Tecnologia da Informação do governador do Colorado (OIT) detectou, na noite de 18 de novembro de 2026, um acesso não autorizado à plataforma do myColorado, aplicativo estadual de identidade digital, carteira de motorista móvel e acesso a serviços públicos, com cerca de 2,1 milhões de usuários. O app foi desligado e, em 24 de novembro, continuava fora do ar sem previsão de retorno. O estado estima que dados de 50 mil a 150 mil pessoas possam ter sido atingidos, não informou quais tipos de dados foram acessados e diz que notificará os afetados ao fim da investigação. A orientação aos moradores foi levar documentos físicos nas viagens do feriado e usar os sites das agências estaduais.

## Por que importa
Aplicativos de identidade digital concentram dados que não podem ser trocados depois de um vazamento, como números de documento e de habilitação. E a demora para dizer quem foi atingido adia a notificação, justamente quando golpes de engenharia social aproveitam o noticiário.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Acesso não autorizado à plataforma do app | Confirmado pelo OIT em 18/11 | Alta |
| Escopo de dados desconhecido | Faixa de 50 mil a 150 mil pessoas, tipos não divulgados | Alta |
| Indisponibilidade de serviço de identidade | App fora do ar há quase uma semana | Média |

## O que fazer nesta semana
1. Mapear quais repositórios ligados a apps de cliente guardam documentos de identidade e quem acessa cada um — dono: time de dados e privacidade.
2. Testar se é possível listar, em até 72 horas, os titulares e campos alcançáveis por uma credencial de serviço comprometida — dono: segurança e jurídico.
3. Sinal de que funcionou: a estimativa de afetados num exercício sai como um número, não como uma faixa.
