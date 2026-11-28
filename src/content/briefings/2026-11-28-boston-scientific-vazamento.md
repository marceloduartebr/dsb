---
title: "Boston Scientific notifica 117,8 mil pessoas quase seis meses após vishing abrir acesso à nuvem"
description: "O acesso foi detectado em 12 de maio, mas só em 5 de novembro a empresa confirmou que SSN, documentos e dados médicos estavam expostos."
pubDate: 2026-11-28T08:32:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/new-boston-scientific-data-breach-exposes-personal-medical-info/"
cover: "https://covers.duarte.top/covers/20261127-boston-scientific-vazamento-2001.jpg"
tipo: incidente
pais: us
tags: ["vazamento", "saude", "engenharia-social", "nuvem", "estados-unidos"]
---

**Em uma linha:** a Boston Scientific conteve um acesso por vishing em maio, mas precisou de quase seis meses para saber que dados pessoais e de saúde de 117.789 pessoas estavam expostos.

## O que aconteceu
A fabricante americana de dispositivos médicos Boston Scientific começou a notificar pessoas afetadas por um ciberataque à sua infraestrutura de nuvem. Segundo o modelo de notificação entregue às autoridades americanas, o invasor usou vishing (engenharia social por telefone) para obter acesso. A empresa identificou o acesso não autorizado em 12 de maio de 2026 e a investigação concluiu em 5 de novembro que houve exposição de dados. O portal de violações do procurador-geral do Texas registra 117.789 pessoas afetadas, em vários estados.

Os dados expostos incluem nome, endereço, número de Seguro Social (SSN), número de documento oficial (passaporte ou identidade estadual), informações médicas, dados de plano de saúde e data de nascimento. A empresa diz que prontuários de pacientes e dados de monitoramento remoto, dispositivos conectados e aplicativos clínicos não foram expostos, que conteve o incidente com especialistas externos e avisou as autoridades. O aviso não oferece monitoramento de crédito gratuito.

É o segundo incidente da empresa em 2026. Um porta-voz afirmou que não tem relação com o ataque de agosto, que derrubou parte das operações globais.

## Por que importa
O vetor foi uma ligação, não uma falha técnica: o controle que falhou foi o de identidade. E o intervalo entre detectar (maio) e saber o alcance (novembro) mostra o custo de não ter um mapa de quais dados pessoais vivem em cada aplicação de nuvem. Documento oficial e dado de saúde não podem ser trocados depois do vazamento.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Vishing contra a equipe para acesso à nuvem | Modelo de notificação entregue às autoridades | Alta |
| Exposição de SSN, documentos e dados de saúde | 117.789 pessoas no portal do procurador-geral do Texas | Alta |
| Quase seis meses entre detecção e confirmação do alcance | Datas de 12 de maio e 5 de novembro na notificação | Média |

## O que fazer nesta semana
1. Revisar o fluxo de redefinição de senha e MFA do service desk para pedidos por telefone — dono: IAM.
2. Listar as aplicações de nuvem que guardam documento, dado de saúde ou identificador nacional e quem tem acesso a elas — dono: privacidade e segurança de dados.
3. Sinal de que funcionou: diante de uma conta comprometida, a equipe consegue dizer em horas quais registros pessoais ela alcançava.
