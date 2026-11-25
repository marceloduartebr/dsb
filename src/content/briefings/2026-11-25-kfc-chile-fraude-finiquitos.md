---
title: "KFC Chile se querela por fraude informático após desvio de 51,9 milhões de pesos de finiquitos"
description: "Credencial ativa de uma ex-supervisora permitiu trocar duas folhas de pagamento no BCI Empresas e desviar os finiquitos de 73 trabalhadores."
pubDate: 2026-11-25T17:05:00-03:00
sourceName: "BioBioChile"
sourceUrl: "https://www.biobiochile.cl/noticias/economia/negocios-y-empresas/2026/11/23/kfc-se-querella-por-fraude-informatico-desviaron-51-millones-destinados-a-finiquitos-de-trabajadores.shtml"
cover: "https://covers.duarte.top/covers/20261125-kfc-chile-fraude-finiquitos-0813.jpg"
tipo: incidente
pais: cl
tags: ["chile", "fraude", "gestao-de-acessos", "folha-de-pagamento"]
---

Em uma linha: um acesso que deveria ter sido revogado bastou para trocar folhas de pagamento e desviar 51.921.166 pesos.

## O que aconteceu
A KFC Chile apresentou uma querela por fraude informático, declarada admissível pelo 4º Juzgado de Garantía de Santiago. Em 28 de outubro de 2026, a empresa carregou na plataforma BCI Empresas duas folhas legítimas, no total de 51.921.166 pesos, para pagar os finiquitos de 73 trabalhadores. Minutos depois, os arquivos foram apagados e substituídos por folhas fraudulentas que mantinham os nomes originais. A operação usou o usuário e a senha de uma ex-supervisora de remunerações cujo acesso não havia sido revogado. Os procuradores aprovaram as transferências e, no dia seguinte, a equipe percebeu que os pagamentos não tinham chegado. A KFC pagou os finiquitos mesmo assim e pediu a retenção dos fundos ainda disponíveis.

## Por que importa
O vetor não foi uma falha técnica sofisticada, e sim uma credencial válida que sobreviveu ao desligamento. Sistemas de folha e pagamento concentram dados pessoais e bancários de funcionários, e a aprovação humana não detecta uma troca de arquivo que preserva os nomes.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Credencial de ex-colaboradora ativa | Usuário e senha da ex-supervisora usados no BCI Empresas | Alta |
| Troca de arquivo de pagamento | Folhas originais apagadas e substituídas minutos depois | Alta |
| Aprovação sem verificação independente | Procuradores aprovaram as transferências fraudulentas | Média |

## O que fazer nesta semana
1. Cruzar a lista de desligados dos últimos 12 meses com os usuários ativos em bancos, folha e RH (dono: IAM).
2. Exigir conferência de destinatários e valores por um canal separado antes de aprovar folhas (dono: Tesouraria).
3. Mapear quais dados pessoais e bancários cada perfil de acesso à folha alcança (dono: Segurança de Dados).
