---
title: "Radware confirma que API interna do Cloud WAF, exposta sem autenticação, vazou contatos e chaves de exportação de logs"
description: "Acesso não autorizado em 19/11 a API interna sem autenticação expôs contatos de clientes e, para parte deles, credenciais de exportação de logs para S3, Azure Blob e SFTP."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/radware-discloses-breach-exposing-customer-cloud-access-keys/"
cover: "https://covers.duarte.top/covers/20261125-radware-api-cloud-waf-chaves-expostas-1708.jpg"
tipo: incidente
pais: global
tags: ["radware", "seguranca-em-nuvem", "risco-de-terceiros", "gestao-de-segredos"]
---

Em uma linha: a chave mais sensível no incidente da Radware é a que o cliente deu ao fornecedor para gravar logs no próprio bucket.

## O que aconteceu

Segundo relatório de causa raiz da Radware obtido pelo BleepingComputer e publicado em 24 de novembro de 2026, em 19 de novembro um terceiro não autorizado acessou uma API interna de gerenciamento do Cloud WAF que estava acessível pela internet sem exigir autenticação. A empresa detectou o acesso dez horas depois, bloqueou o IP de origem e a API e revogou as credenciais internas. As informações potencialmente acessadas incluem dados de contato de clientes e, para parte deles, as credenciais configuradas para exportar logs para armazenamento próprio (AWS S3, Azure Blob Storage ou SFTP). A Radware diz que inspeção de tráfego, certificados, dados de usuários finais e serviços de DDoS não foram expostos, e recomendou que clientes de AppSec (WAF e BOT) rotacionem as credenciais de exportação e revisem os acessos aos seus armazenamentos desde 19/11. Clientes relataram alertas da AWS sobre um IP desconhecido tentando acessar seus buckets de logs.

## Por que importa

Chaves entregues a um fornecedor para integrar serviços ficam fora do radar de quem é dono do armazenamento. Logs costumam conter dados pessoais e detalhes de aplicações; uma chave de escrita mal escopada pode permitir leitura. Quando o fornecedor é invadido, o cliente precisa saber rapidamente o que aquela chave alcança.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| API interna exposta sem autenticação | Relatório de causa raiz da Radware | Alta |
| Credenciais de armazenamento de clientes expostas | Chaves de S3, Azure Blob e SFTP para parte dos clientes | Alta |
| Tentativas de uso das chaves | Alertas da AWS relatados por clientes | Alta |

## O que fazer nesta semana

1. Rotacionar as credenciais de exportação de logs entregues à Radware e a outros fornecedores de segurança (responsável: time de nuvem).
2. Inventariar as chaves de armazenamento em nuvem em poder de terceiros, com o escopo de cada uma (responsável: gestão de segredos).
3. Revisar os logs de acesso dos buckets de destino desde 19/11 e restringir as chaves a escrita apenas (responsável: SOC).
