---
title: "SAP confirma incidente com tokens roubados e código alterado no GitHub"
description: "Sem indício de acesso a dados de clientes, diz a SAP, mas a pergunta é o que os tokens alcançavam."
pubDate: 2026-11-27T12:35:00-03:00
sourceName: "Cybersecurity News"
sourceUrl: "https://cybersecuritynews.com/sap-security-incident"
cover: "https://covers.duarte.top/covers/20261127-sap-incidente-github-0805.jpg"
tipo: incidente
pais: eu
tags: ["supply-chain", "github", "tokens", "alemanha"]
---

**Em uma linha:** um token roubado já é a autenticação; o alcance do incidente depende do que estava nos repositórios.

## O que aconteceu
A SAP confirmou um incidente de segurança de TI após detectar atividade suspeita. Segundo a DER SPIEGEL, que cita memorando interno e fontes da empresa, atacantes roubaram tokens de autenticação de funcionários e os usaram para copiar e alterar código-fonte no GitHub; a investigação interna é chamada de "Project Granite". A SAP afirmou que, naquele estágio, não havia evidência de acesso não autorizado a dados de negócio de clientes e não respondeu a perguntas detalhadas. Não foram divulgados os repositórios afetados, o método de obtenção dos tokens nem se as alterações chegaram a software usado por clientes. A reportagem foi publicada entre 26 e 27 de novembro de 2026.

## Por que importa
Tokens de desenvolvedor contornam senha e MFA. Repositórios guardam com frequência segredos, configurações e dados de teste copiados de produção. A frase "sem acesso a dados de clientes" só se sustenta se a empresa souber o que existe em cada repositório que os tokens alcançavam.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Tokens de funcionários | Roubo relatado pela DER SPIEGEL | Alta |
| Integridade do código | Código copiado e alterado, segundo a reportagem | Alta |
| Dados de clientes | SAP diz não haver evidência de acesso até agora | Em apuração |

## O que fazer nesta semana
1. Revogar e reemitir tokens de GitHub e segredos de CI/CD de alto privilégio — dono: plataforma/DevOps.
2. Varrer repositórios em busca de segredos e dados pessoais copiados de produção — dono: segurança de aplicações e privacidade.
3. Sinal de que funcionou: para cada token ativo, o time sabe quais repositórios ele acessa e se há dados sensíveis neles.
