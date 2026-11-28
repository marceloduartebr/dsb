---
title: "Drupal admite que o patch do instalador não bastou e nova falha explorada entra no KEV (CVE-2026-136716)"
description: "Sites em estados de instalação incompletos seguiram vulneráveis após a correção de 18 de novembro, e a CISA deu três dias para corrigir."
pubDate: 2026-11-28T08:32:00-03:00
sourceName: "Drupal.org"
sourceUrl: "https://www.drupal.org/sa-core-2026-019"
cover: "https://covers.duarte.top/covers/20261127-drupal-instalador-nova-falha-kev-2001.jpg"
tipo: vulnerabilidades
pais: global
tags: ["vulnerabilidade", "kev", "drupal", "cms", "perimetro"]
---

**Em uma linha:** a correção de 18 de novembro para o instalador do Drupal deixou sites em produção vulneráveis, e a nova falha, já explorada, exige patch, update.php e revisão de logs.

## O que aconteceu
Em 25 de novembro de 2026, o Drupal publicou o SA-CORE-2026-019 (Drupal core, altamente crítico, risco 21/25 na escala do Drupal, "Access bypass"). O alerta diz que o SA-CORE-2026-017, de 18 de novembro, corrigiu falhas no instalador (CVE-2026-132165), mas que sites em estados de instalação incomuns ou incompletos continuaram sujeitos a tomada, inclusive sites em produção. A nova falha recebeu a CVE-2026-136716 e, segundo o Drupal, está sendo explorada.

Versões afetadas: anteriores a 10.6.23; de 11.0.0 a antes de 11.3.23; de 11.4.0 a antes de 11.4.14. Versões corrigidas: 10.6.23, 11.3.23 e 11.4.14. O Drupal informa que um update hook precisa rodar (update.php) para corrigir sites de produção nesse estado, e recomenda revisar logs, sobretudo alterações no usuário 1 ou feitas por ele, e confirmar que o e-mail desse usuário é controlado pela organização.

Em 27 de novembro, a CISA incluiu a CVE-2026-136716 no catálogo KEV, com prazo até 30 de novembro e triagem forense exigida pela BOD 26-04 para agências federais. Segundo a CISA, um atacante remoto sem autenticação pode tomar o site pelo instalador exposto quando o site está em um dos estados afetados. No mesmo dia, a CISA também adicionou duas falhas do OSGeo GeoServer (CVE-2026-120705 e CVE-2026-129243). O NVD ainda não publicou pontuação CVSS para a CVE-2026-136716.

## Por que importa
Quem corrigiu a CVE-2026-132165 na semana passada pode ter ficado com a sensação de dever cumprido. O novo alerta mostra que o patch não fechava todos os casos e que a janela de exposição continua aberta para quem não atualizou de novo. Um site Drupal tomado dá acesso aos formulários, cadastros e à conexão com o banco de dados.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Tomada do site sem login pelo instalador exposto | SA-CORE-2026-019 e catálogo KEV da CISA | Crítica |
| Sites já corrigidos para a CVE-2026-132165 seguem vulneráveis em estados incompletos | Texto do SA-CORE-2026-019 | Alta |
| Exploração ativa | Drupal ("being exploited in the wild") e inclusão no KEV | Alta |

## O que fazer nesta semana
1. Atualizar para 10.6.23, 11.3.23 ou 11.4.14 e rodar o update.php em cada site — dono: time web / AppSec.
2. Revisar logs desde 18 de novembro em busca de alterações no usuário 1 e listar os dados pessoais que cada site expõe — dono: SOC e privacidade.
3. Sinal de que funcionou: inventário de sites Drupal com versão, data do patch e resultado da revisão de logs.
