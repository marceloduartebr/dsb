---
title: "Cleverbridge confirma que terceiro copiou dados de cartão de pagamento em sua plataforma"
description: "A processadora detectou o acesso em 4 de novembro e começou a notificar afetados em 20 de novembro; o aviso público não diz quantos foram atingidos."
pubDate: 2026-11-23T08:45:00-03:00
sourceName: "Cleverbridge"
sourceUrl: "https://grow.cleverbridge.com/incident-update"
cover: "https://covers.duarte.top/covers/20261123-cleverbridge-cartoes-0813.jpg"
tipo: incidente
tags: ["pagamento", "cartao", "vazamento", "europa"]
pais: eu
---

**Em uma linha:** um processador de pagamentos de software teve dados de cartão copiados; o CVV, se estava armazenado, não deveria estar lá depois da autorização.

## O que aconteceu
Em 4 de novembro de 2026, a Cleverbridge, processadora de e-commerce com sede na Alemanha, detectou atividade não autorizada em sua plataforma, tirou sistemas do ar para conter o incidente e os reativou no mesmo dia. A investigação posterior concluiu que um terceiro copiou dados de cartão de pagamento armazenados na plataforma. A empresa afirma que não se tratou de ransomware e que nenhum sistema foi criptografado. Começou a notificar os indivíduos afetados em 20 de novembro. A página oficial não lista quais campos do cartão foram copiados nem quantas pessoas foram atingidas. Uma notificação a clientes, citada pelo BleepingComputer, indica número do cartão, validade e código de segurança (CVV/CVC), e afirma que nome, contato e dados de cobrança não foram copiados. A Cleverbridge diz ter comunicado autoridades de proteção de dados, polícia, bandeiras de cartão e parceiros de pagamento, e oferece monitoramento de crédito via TransUnion/Cyberscout. Não divulgou a via de entrada nem o período em que o invasor permaneceu no ambiente.

## Por que importa
O CVV é dado de autenticação sensível. Padrões de pagamento determinam que ele não seja retido após a autorização da transação. Se o aviso ao cliente inclui esse código, o problema não é só a invasão: é o dado que ainda estava guardado no processador que intermedia compras de vários fornecedores de software.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Atividade não autorizada na plataforma em 4/11 | Página oficial da Cleverbridge | Alta |
| Cópia de dados de cartão de pagamento | Página oficial da Cleverbridge | Crítica |
| Inclusão de número, validade e CVV | Notificação a clientes citada pelo BleepingComputer | Crítica |

## O que fazer nesta semana
1. Levantar quais produtos, assinaturas e lojas da empresa passam pela Cleverbridge e quais clientes foram ou podem ter sido notificados — dono: financeiro + privacidade.
2. Orientar afetados a conferir faturas, comunicar o emissor do cartão e desconfiar de mensagens que peçam novo CVV ou dados do cartão — dono: atendimento.
3. Sinal de que funcionou: a empresa sabe quais transações usaram esse processador e consegue cruzar o aviso do fornecedor com a base de clientes em horas, não em semanas.
