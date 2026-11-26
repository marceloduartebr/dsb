---
title: "Gatwick avisa clientes que invasão no AutoPay, do fornecedor do drop-off, expôs dados pessoais e de pagamento"
description: "Sistema AutoPay, operado pela ParkPark para a Times24 UK, foi invadido e suspenso; aeroporto não informa número de afetados nem período dos registros."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "The Register"
sourceUrl: "https://www.theregister.com/security/2026/11/25/gatwick-drop-off-customers-personal-data-exposed-in-supplier-breach/5312060"
cover: "https://covers.duarte.top/covers/20261125-gatwick-autopay-vazamento-fornecedor-1708.jpg"
tipo: incidente
pais: eu
tags: ["gatwick", "risco-de-terceiros", "vazamento", "reino-unido"]
---

Em uma linha: um fornecedor do fornecedor expôs dados de clientes do Gatwick, e o aeroporto não sabe dizer quantos.

## O que aconteceu

Em 25 de novembro de 2026, o The Register relatou que o London Gatwick Airport notificou clientes sobre uma invasão no AutoPay, serviço que cobra automaticamente a taxa da área de drop-off. O sistema é operado pela ParkPark e usado pela Times24 UK Limited, que gerencia o drop-off do aeroporto. Segundo a notificação, podem ter sido expostos nomes, endereços, códigos postais, contatos, credenciais do AutoPay (e-mails e senhas com hash bcrypt), dados dos veículos vinculados às contas, placas e horários de entrada e saída em locais da Times24. Em casos limitados, também registros de pagamento (valores, tipo e validade do cartão, referências e IDs de transação) e e-mails trocados com o atendimento. A Times24 suspendeu o AutoPay ao detectar a invasão, e o serviço segue desligado. O Gatwick disse não poder informar quantos clientes foram afetados nem desde quando os registros estão expostos; voos não foram afetados.

## Por que importa

A marca na notificação não é a empresa que operava o sistema. Cadeias de terceiros com acesso a dados de clientes tornam difícil responder às perguntas básicas de um incidente: quais dados, de quantas pessoas, de que período. Sem um inventário por fornecedor, a resposta ao titular fica genérica.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Comprometimento de sistema de terceiro | AutoPay operado pela ParkPark para a Times24 | Alta |
| Exposição de dados pessoais e de localização | Endereços, placas e horários de entrada e saída | Alta |
| Escopo desconhecido | Gatwick não informa número de afetados nem período | Média |

## O que fazer nesta semana

1. Listar os fornecedores que armazenam dados de clientes em nome da empresa, inclusive subcontratados (responsável: gestão de riscos de terceiros).
2. Exigir de cada fornecedor crítico o inventário dos dados pessoais guardados e o prazo de retenção (responsável: DPO).
3. Preparar o modelo de notificação com campos para volume e período afetados, para não depender do fornecedor na hora do incidente (responsável: jurídico com segurança).
