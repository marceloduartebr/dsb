---
title: "Câmara dos Deputados da Argentina fecha sistemas à internet e diz que ataques foram contidos"
description: "Senhas trocadas, MFA obrigatório e portais só na rede interna, mas nenhuma palavra sobre quais dados estavam expostos."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Perfil"
sourceUrl: "https://www.perfil.com/politica/menem-anuncio-el-cierre-preventivo-de-sistemas-de-diputados-ante-el-riesgo-de-ciberataques-con-inteligencia-artificial-a8q177v0yxIG"
cover: "https://covers.duarte.top/covers/20261127-camara-diputados-argentina-ciberataque-0805.jpg"
tipo: incidente
pais: ar
tags: ["ciberataque", "setor-publico", "argentina", "mfa"]
---

**Em uma linha:** quando um órgão troca todas as senhas e fecha portais à internet, "contido" descreve a porta, não os dados.

## O que aconteceu
Em 26 de novembro de 2026, na abertura da sessão do Orçamento 2027, o presidente da Câmara dos Deputados da Argentina, Martín Menem, leu o comunicado "Medidas adotadas sobre os sistemas da Câmara e seus fundamentos". Ele citou uma escalada global de ataques apoiados em inteligência artificial e disse que a Câmara sofre tentativas recorrentes, sobretudo em sessões de alto interesse público, que "até agora foram contidas". Serviços antes públicos passaram a ser acessíveis só pela rede interna, as senhas foram trocadas, o segundo fator de autenticação passou a ser obrigatório, com limite de tentativas e bloqueio automático, e o monitoramento de acessos foi reforçado. O site da Câmara estava em manutenção desde meados de novembro. A deputada Marcela Pagano apresentou denúncia penal contra Menem por suposta ocultação de um ataque; alegações de apagamento de dados e de pedido de resgate não foram confirmadas. O comunicado não diz se houve acesso a dados.

## Por que importa
Medidas de contenção amplas (troca geral de senhas, fechamento de portais) costumam indicar que o órgão não consegue afirmar com segurança o que foi ou não acessado. Sem inventário dos dados por trás de cada sistema exposto, não é possível responder a cidadãos, servidores ou à autoridade de proteção de dados.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Sistemas expostos à internet | Portais retirados da internet e restritos à rede interna | Alta |
| Credenciais | Troca geral de senhas e MFA obrigatório | Alta |
| Dados pessoais | Não informado se houve acesso | Desconhecida |

## O que fazer nesta semana
1. Listar cada sistema exposto à internet e as bases de dados pessoais que ele alcança — dono: arquitetura/segurança.
2. Definir o critério para dizer "nenhum dado foi acessado" (logs, retenção, cobertura) antes de precisar dizê-lo — dono: privacidade/DPO.
3. Sinal de que funcionou: para qualquer portal, o time responde em uma hora quais dados pessoais estão por trás dele.
