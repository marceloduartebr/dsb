---
title: "Bithumb amplia vazamento no groupware interno: invasor ficou cerca de 15 dias e levou até cópias de documentos de identidade"
description: "Atualização de 25/11 da corretora sul-coreana confirma acesso ao Daou Office de 12 a 27 de outubro e acrescenta titulares e campos, como registro de residente, passaporte e cópias de documentos."
pubDate: 2026-11-27T08:35:00-03:00
sourceName: "Bithumb"
sourceUrl: "https://feed.bithumb.com/notice/1655458"
cover: "https://covers.duarte.top/covers/20261126-bithumb-vazamento-groupware-daou-office-1709.jpg"
tipo: incidente
pais: global
tags: ["coreia-do-sul", "cripto", "vazamento", "shadow-data"]
---

Em uma linha: a Bithumb tratava o groupware como sistema interno, mas ele guardava documentos e números de identificação de clientes.

## O que aconteceu

Em aviso atualizado em 25 de novembro de 2026, a Bithumb informou que a análise do vazamento no groupware móvel interno Daou Office, comunicado em 29 de outubro, identificou mais titulares e mais tipos de dados. Segundo a empresa, um terceiro não autorizado acessou o sistema de 12 de outubro (13h49) a 27 de outubro (15h22) e retirou dados pessoais e arquivos. Foram atingidos clientes, funcionários de fornecedores e funcionários atuais e antigos; os campos incluem número de membro, nome, telefone, e-mail, data de nascimento, número de registro de residente, passaporte, carteira de motorista, conta bancária, endereço, cópia de documento de identidade, histórico de transações e endereço de carteira, variando por pessoa. A Yonhap relata que o aviso inicial falava em cerca de 7.100 clientes e funcionários. A Bithumb diz que a plataforma de negociação e o banco de dados de clientes não foram invadidos diretamente e reforçou o monitoramento de saques.

## Por que importa

O caso mostra dados sensíveis de clientes fora dos sistemas de produção, em uma ferramenta de colaboração. Números de identificação e cópias de documentos não podem ser trocados como uma senha. E a ampliação semanas depois do primeiro aviso mostra o custo de não ter um mapa de dados por titular.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Acesso prolongado ao groupware | 12/10 a 27/10, confirmado pela Bithumb | Alta |
| Dados sensíveis fora da produção | Cópias de documentos e números de identificação no groupware | Alta |
| Ampliação tardia do alcance | Novos titulares e campos na atualização de 25/11 | Média |

## O que fazer nesta semana

1. Varrer groupware, chat e e-mail em busca de documentos e números de identificação de clientes (dono: time de governança de dados).
2. Definir e aplicar política de retenção para anexos com dados pessoais em ferramentas de colaboração (dono: DPO).
3. Revisar alertas de acesso anômalo a ferramentas SaaS internas, com meta de detecção em horas, não semanas (dono: SOC).
