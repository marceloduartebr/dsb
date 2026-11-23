---
title: "Cisco Expressway: credenciais fixas dão root e falha entra no KEV"
description: "A CISA confirmou exploração da CVE-2026-76466 e deu três dias para corrigir; o alvo depois da borda eram bancos de dados e senhas em repositórios."
pubDate: 2026-11-23T08:45:00-03:00
sourceName: "BleepingComputer"
sourceUrl: "https://www.bleepingcomputer.com/news/security/cisa-flags-critical-cisco-expressway-rce-flaw-as-actively-exploited/"
cover: "https://covers.duarte.top/covers/20261123-cisco-expressway-kev-0813.jpg"
tipo: vulnerabilidades
tags: ["cisco", "kev", "edge", "credenciais", "cve"]
pais: global
---

**Em uma linha:** a borda foi só a entrada; o que estava em jogo eram os bancos e os segredos que o atacante foi buscar lá dentro.

## O que aconteceu
Em 20 de novembro de 2026, a CISA incluiu a CVE-2026-76466 (Cisco Expressway Series, uso de credenciais fixas, CWE-798) no catálogo KEV, com prazo de correção em 23 de novembro para agências federais, sob a BOD 26-04 e com exigência de triagem forense. Segundo o aviso da Cisco (cisco-sa-vcs-static-cred-hr7EWZ8t), o serviço de banco de dados do Expressway-C e do Expressway-E usa cookies persistentes e, em clusters com TLS Verify Mode ativado, não valida certificados de cliente; quem tem os cookies executa comandos como root via chamadas RPC. A correção saiu em outubro. CVSS 3.1 de 9,8 (atribuído pela Cisco, registrado no NVD); EPSS de 2,2% (percentil 83, em 22/11).

Segundo o BleepingComputer, a empresa russa F6 relatou que atacantes, com ajuda de um assistente de IA, obtiveram root em dois equipamentos expostos à internet, alcançaram mais dois nós internos do cluster e prepararam scripts em Python para varrer compartilhamentos SMB, interagir com SQL Server e WinRM e procurar credenciais em repositórios GitLab. A Cisco disse ao veículo que não tinha conhecimento de exploração ativa.

## Por que importa
O Expressway fica na borda e conecta comunicação unificada à rede interna. O relato da F6 mostra o roteiro típico: entrar pela borda, mover-se para dentro e procurar dados e segredos. Quem só aplica o patch não sabe o que estava ao alcance de um invasor que tenha chegado antes.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Root remoto em Expressway em cluster | KEV (20/11/2026), CVSS 9,8 | Crítica |
| Movimento lateral para nós internos | Relato da F6 via BleepingComputer | Alta |
| Busca de credenciais em GitLab, SMB e SQL Server | Relato da F6 via BleepingComputer | Alta |

## O que fazer nesta semana
1. Aplicar a versão corrigida da Cisco em todos os Expressway-C/E em cluster e revisar o TLS Verify Mode — infraestrutura de rede/UC.
2. Fazer triagem forense nos equipamentos expostos e revisar acessos SMB, SQL Server e WinRM vindos deles desde outubro — SOC.
3. Sinal de que funcionou: inventário de segredos em repositórios de código revisado, com credenciais expostas rotacionadas — AppSec e dono dos dados.
