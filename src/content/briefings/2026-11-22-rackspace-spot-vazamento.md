---
title: "Rackspace Spot: credencial vazada abriu Secrets de Kubernetes de clientes por quase 22 horas"
description: "Invasor agiu como usuário legítimo e pôde ler Secrets de clusters; rotacionar a chave não revela o que foi alcançado."
pubDate: 2026-11-22T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/rackspace-spot-breach-let-hackers-access-customer-kubernetes-secrets/"
cover: "https://covers.duarte.top/covers/20261122-rackspace-spot-vazamento-0810.jpg"
tipo: incidente
tags: ["kubernetes", "credenciais", "cloud", "eua"]
pais: us
---

**Em uma linha:** quem lê um Secret de Kubernetes não precisa mais do cluster; já tem a chave dos dados.

## O que aconteceu
Em 17 de novembro de 2026, entre cerca de 00h20 e 22h00 UTC, um terceiro usou credenciais vazadas para acessar partes da Rackspace Spot, plataforma de Kubernetes gerenciado da Rackspace. Segundo notificação a clientes obtida pelo BleepingComputer, o invasor agiu como usuário legítimo em algumas organizações: criou pods, listou nós e volumes e pôde ler qualquer Kubernetes Secret dos usuários afetados, além de tokens de API e de refresh da Spot. A Rackspace soube do acesso em 18 de novembro, por aviso de um cliente, revogou tokens e sessões, removeu os pods e rotacionou chaves. O console ficou fora do ar por dias; o serviço foi restabelecido por completo em 21 de novembro. A empresa não informou quantos clientes foram afetados nem se houve roubo de dados.

## Por que importa
Secrets guardam senhas de banco, tokens de nuvem e chaves de API. O impacto real está nos sistemas que essas credenciais alcançam, não na plataforma onde estavam guardadas. A própria Rackspace pediu que clientes revisem logs de bancos, registries, repositórios Git, storage e serviços de terceiros desde 17 de novembro.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Credenciais vazadas de usuário | Notificação da Rackspace | Alta |
| Leitura de Kubernetes Secrets | Notificação da Rackspace | Crítica |
| Uso posterior das credenciais em bancos e storage | Orientação de revisão de logs | Alta (não confirmado) |

## O que fazer nesta semana
1. Mapear cada Secret dos clusters ao dado que ele abre (banco, bucket, SaaS) e à classificação desse dado — dono: plataforma + segurança de dados.
2. Rotacionar credenciais de clusters gerenciados por terceiros e revisar logs de acesso desde 17/11 — dono: SRE.
3. Sinal de que funcionou: para qualquer Secret, o time responde em horas quais bases pessoais ele alcança.
