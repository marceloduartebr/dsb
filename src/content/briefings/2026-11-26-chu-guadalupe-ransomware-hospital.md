---
title: "CHU de Guadalupe volta ao papel após suspeita de ransomware que cifrou bancos de dados e suspendeu radioterapia"
description: "A ANSSI investiga se o ataque ao maior hospital de Guadalupe entrou por um fornecedor de TI comprometido meses antes."
pubDate: 2026-11-26T12:32:00-03:00
sourceName: "The Record"
sourceUrl: "https://therecord.media/guadeloupe-ransomware-hospital-cyber"
cover: "https://covers.duarte.top/covers/20261125-chu-guadalupe-ransomware-hospital-1220.jpg"
tipo: incidente
pais: eu
tags: ["ransomware", "saude", "risco-de-terceiros", "franca"]
---
Em uma linha: se a hipótese da ANSSI se confirmar, a porta de entrada foi um fornecedor com acesso ao hospital, não o hospital.

## O que aconteceu

O Centro Hospitalar Universitário (CHU) de Guadalupe, maior hospital do território francês no Caribe, teve falhas de computadores e telefones a partir da noite de sábado, 21 de novembro de 2026. Segundo o The Record, o que parecia uma falha técnica era um ataque que cifrou os bancos de dados do hospital. Na terça-feira, 24, a ANSSI, agência nacional de cibersegurança da França, disse que o incidente parece envolver ransomware e que investiga se os invasores entraram por um fornecedor de TI não identificado, que teria sido comprometido meses antes. A promotoria abriu investigação criminal e a autoria não foi esclarecida. A direção disse à imprensa local que não recebeu pedido de resgate e descartou pagar.

O hospital cancelou cirurgias, consultas e exames de imagem ao menos até sexta-feira, suspendeu a radioterapia por segurança e desmarcou sessões de quimioterapia. Emergência, diálise e procedimentos cardíacos urgentes seguem disponíveis. Na terça, as equipes ainda não acessavam os prontuários eletrônicos.

## Por que importa

O caso junta dois riscos: dados de saúde, que não podem ser trocados depois de expostos, e um terceiro com acesso privilegiado que pode ter sido comprometido muito antes do ataque. Quando o acesso de fornecedores não aparece no mesmo mapa que os dados que ele alcança, o hospital descobre o alcance só depois.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
| --- | --- | --- |
| Ransomware | ANSSI diz que o incidente parece envolver ransomware; bancos de dados cifrados | Alta |
| Fornecedor de TI | ANSSI investiga entrada por fornecedor comprometido meses antes | Alta |
| Continuidade assistencial | Radioterapia suspensa, cirurgias e consultas canceladas | Alta |

## O que fazer nesta semana

1. Listar os fornecedores de TI com acesso remoto e quais sistemas e dados cada um alcança (dono: CISO com a área de compras).
2. Revisar contas de terceiros sem uso recente ou com privilégio acima do necessário e remover o excesso (dono: time de IAM).
3. Testar a operação em contingência dos serviços críticos, com acesso offline às informações mínimas de pacientes ou clientes (dono: gestor de continuidade).
