---
title: "Microsoft confirma exploração de falha no Entra Connect Health que expôs e-mails de administradores e dados de tenants"
description: "Acesso foi só de leitura, mas entregou o mapa de quem atacar com phishing direcionado."
pubDate: 2026-11-22T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/microsoft-entra-connect-health-flaw-exploited-to-steal-tenant-data/"
cover: "https://covers.duarte.top/covers/20261122-microsoft-entra-connect-health-vazamento-0810.jpg"
tipo: incidente
tags: ["microsoft", "identidade", "phishing", "cloud"]
pais: global
---

**Em uma linha:** metadados de tenant parecem inofensivos até virarem a lista de alvos de um phishing direcionado.

## O que aconteceu
A Microsoft notificou administradores de que uma falha na API do Entra Connect Health, introduzida em 23 de julho de 2026 e descoberta em 9 de novembro, foi explorada. Terceiros tiveram acesso de leitura a e-mails de contatos técnicos e de contas administradoras, IDs e nomes de tenants, domínios iniciais, códigos de país, tier de licença do Entra, status de sincronização do diretório e um certificado expirado. A correção server-side foi aplicada em 19 de novembro; a investigação terminou em 20 de novembro, quando começaram as notificações via Azure Service Health. A empresa diz que não houve exposição de senhas, hashes, tokens ou chaves válidas, nem mudanças de configuração, e não informou quantos tenants foram afetados.

## Por que importa
A própria Microsoft recomenda alertar os times para phishing e engenharia social contra os e-mails expostos. Uma conta administradora comprometida por esse caminho herda todo o acesso a dados que ela já tinha.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Exposição de e-mails de administradores | Notificação da Microsoft | Alta |
| Phishing direcionado a contas privilegiadas | Recomendação da Microsoft | Alta |
| Acesso a dados via conta administradora | Não confirmado | Média |

## O que fazer nesta semana
1. Conferir no Azure Service Health se o tenant foi notificado e revisar logs de auditoria e de sign-in do Entra — dono: time de identidade.
2. Exigir MFA resistente a phishing em todas as contas privilegiadas e mapear quais bases sensíveis cada uma alcança — dono: segurança + dados.
3. Sinal de que funcionou: lista atualizada de administradores com o dado que cada um acessa.
