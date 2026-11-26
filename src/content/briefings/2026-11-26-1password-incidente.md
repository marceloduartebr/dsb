---
title: "1Password: conta de GitHub de funcionário levou atacante ao CI/CD e a dados de clientes"
description: "Código malicioso publicado pelo pipeline baixou dados administrativos de parte dos clientes; os cofres não foram atingidos."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "1Password"
sourceUrl: "https://1password.com/blog/update-on-nov-2026-security-incident"
cover: "https://covers.duarte.top/covers/20261126-1password-incidente-0802.jpg"
tipo: incidente
pais: global
tags: ["incidente", "supply-chain", "github", "ci-cd", "gerenciador-de-senhas"]
---

**Em uma linha:** o atacante não precisou tocar no banco de clientes; o pipeline de entrega já tinha o caminho até ele.

## O que aconteceu
Em 25 de novembro de 2026, a 1Password informou que, desde 19 de novembro, investiga o acesso de um atacante à conta corporativa de GitHub de um funcionário. Com essa conta, o invasor copiou código-fonte de repositórios privados, chegou ao sistema de CI/CD, que guarda segredos de infraestrutura, e enviou código malicioso a serviços de backend. O código baixou dados administrativos de parte dos clientes: nomes e e-mails, identificadores de conta e de usuário, datas de criação e de último login, chaves públicas, parâmetros do protocolo SRP, tokens de links de convite, provisionamento e recuperação enviados por e-mail e metadados internos não secretos.

Segundo a empresa, o conteúdo dos cofres, as chaves que os protegem, as chaves de recuperação, os apps e as extensões não foram afetados, e não há evidência interna de tomada de contas com os tokens expostos. A 1Password desativou a conta, revogou o token do atacante, girou credenciais internas, aumentou os códigos de convite e recuperação de seis dígitos para dez caracteres e contratou especialistas independentes. Um pequeno número de usuários em processo de provisionamento ou recuperação foi notificado. A empresa não divulgou quantos clientes fazem parte do grupo afetado.

## Por que importa
O caminho até os dados de clientes passou por uma conta de desenvolvedor e pelo CI/CD, não por um ataque direto ao banco. Inventários de dados pessoais costumam listar repositórios de dados, mas raramente mapeiam quais pipelines, tokens e identidades de engenharia conseguem ler ou exfiltrar esses registros. Os tokens de convite e recuperação expostos também abrem espaço para phishing direcionado, como a própria empresa alertou.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Conta corporativa de GitHub comprometida | Confirmado pela 1Password | Alta |
| Acesso ao CI/CD com segredos de infraestrutura | Confirmado pela 1Password | Alta |
| Código malicioso em backend baixando dados de clientes | Confirmado; número de afetados não divulgado | Alta |
| Phishing com tokens de convite e recuperação | Alerta da empresa; sem tomada de conta identificada | Média |

## O que fazer nesta semana
1. Listar quais serviços que leem dados pessoais podem receber deploy pelo CI/CD e com quais credenciais — engenharia de plataforma.
2. Revisar tokens de longa duração e permissões de contas de desenvolvedor no GitHub, com MFA resistente a phishing e expiração curta — segurança de identidade.
3. Sinal de que funcionou: para qualquer conta de desenvolvedor, a equipe responde em horas quais conjuntos de dados de clientes ela alcança.
