---
title: "Todoist: atacante vasculhou tarefas de clientes atrás de senhas e frases-semente"
description: "Credencial roubada do controle de versão levou ao banco de produção; cerca de 6% dos usuários tiveram e-mail e hash antigo de senha copiados."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "Todoist"
sourceUrl: "https://www.todoist.com/help/todoist/get-started/security-incident-in-november-2026-cG0EIACNU"
cover: "https://covers.duarte.top/covers/20261126-todoist-vazamento-0802.jpg"
tipo: incidente
pais: global
tags: ["incidente", "credenciais", "supply-chain", "saas", "segredos"]
---

**Em uma linha:** quando o dado sensível mora no texto livre, a busca do atacante chega antes do inventário da empresa.

## O que aconteceu
Em 24 de novembro de 2026, a Todoist publicou um aviso sobre um incidente iniciado em 22 de novembro. Segundo a empresa, um atacante usou uma credencial roubada, ligada ao sistema de controle de versão, para alterar fluxos automatizados em três repositórios e obter credenciais adicionais. Em 23 de novembro, conseguiu uma credencial administrativa do sistema de login de funcionários, assumiu a conta de trabalho de um colaborador, entrou na infraestrutura de nuvem e acessou o banco de produção, de onde exportou registros de contas. A investigação começou às 17h01 (UTC) do mesmo dia e o acesso foi cortado até 17h42. A notificação por e-mail aos clientes foi concluída em 25 de novembro.

Os grupos afetados, em proporções aproximadas: cerca de 6% dos usuários tiveram e-mail, hash antigo de senha (SHA1 com salt) e data de criação da conta copiados; cerca de 0,003% tiveram tokens da API e da integração com Slack obtidos, e parte deles teve projetos, tarefas e comentários lidos pela API; cerca de 0,001% tiveram o conteúdo vasculhado em busca de credenciais e frases-semente, com resultados devolvidos; e cerca de 0,001% com o complemento para Outlook conectado tiveram assunto, remetente, os primeiros 255 caracteres das mensagens e metadados de anexos expostos. A empresa não informou o total de usuários nem como a credencial inicial foi obtida, e diz não ter encontrado alteração no código da aplicação.

## Por que importa
O caminho repete um padrão recente: credencial de engenharia, automação de repositório e, dali, produção. Mas o ponto mais sensível é a busca por segredos no conteúdo dos clientes. Senhas, chaves de API e frases-semente coladas em tarefas, comentários e wikis são dados críticos fora de qualquer inventário formal. A Todoist recomendou revogar e trocar esses segredos, porque apagar o texto não invalida uma cópia já feita.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Credencial roubada do controle de versão e automação de repositório alterada | Confirmado pela Todoist | Alta |
| Exportação de e-mails e hashes antigos de senha (~6% dos usuários) | Confirmado pela Todoist | Média |
| Busca por credenciais e frases-semente no conteúdo de clientes | Confirmado; parte dos resultados devolvida | Alta |
| Tokens de API, Slack e dados do Outlook | Confirmado em frações pequenas da base | Média |

## O que fazer nesta semana
1. Varrer ferramentas de produtividade, tickets e wikis em busca de credenciais em texto livre e revogar o que for encontrado — segurança de dados.
2. Revisar quais tokens de automação de repositório podem gerar novas credenciais ou chegar à produção — engenharia de plataforma.
3. Sinal de que funcionou: a empresa sabe quantos segredos existem fora do cofre e o número cai semana a semana.
