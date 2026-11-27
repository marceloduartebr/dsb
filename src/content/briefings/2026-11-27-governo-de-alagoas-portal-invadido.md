---
title: "Governo de Alagoas: invasor usou senha válida de administrador e portal ficou seis dias fora do ar"
description: "Itec confirma que o portal alagoas.al.gov.br foi invadido em 19 de novembro com credencial administrativa válida de uma aplicação legada; site voltou em 25 de novembro em nova plataforma."
pubDate: 2026-11-27T17:01:00-03:00
sourceName: "CadaMinuto"
sourceUrl: "https://www.cadaminuto.com.br/noticia/2026/11/21/hacker-invade-site-do-governo-de-alagoas-com-senha-de-administrador-e-apaga-conteudos"
cover: "https://covers.duarte.top/covers/20261127-1453-governo-de-alagoas-portal-invadido-1453.jpg"
tipo: incidente
pais: br
tags: ["setor-publico", "credenciais", "sistemas-legados", "alagoas"]
---

**Em uma linha:** uma credencial administrativa válida numa aplicação legada de terceiro bastou para passar pelo SOC e apagar conteúdo do portal oficial de um estado.

## O que aconteceu

O portal oficial do Governo de Alagoas (alagoas.al.gov.br) foi invadido na noite de 19 de novembro de 2026. Segundo Juliano Farias, diretor de Serviços de TI e Telecomunicação do Itec (Instituto de Tecnologia em Informática e Comunicação de Alagoas), o invasor começou às 23h17 e obteve login como se fosse acesso válido: usou uma credencial administrativa válida do próprio sistema para explorar falhas no código de uma aplicação legada, desenvolvida por empresa terceirizada. A perícia descartou falhas recentes conhecidas.

Durante a madrugada, o invasor alterou a página inicial e apagou registros de notícias, eventos e galerias de fotos do banco de dados. A Secom confirmou o caso em nota. O Itec bloqueou o acesso externo, fez cópia forense do ambiente, identificou o IP do atacante e registrou boletim de ocorrência. O órgão afirma que o ataque ficou restrito à camada web desse portal e que há backups.

O governo previa a volta para 23 de novembro, mas o portal só voltou em 25 de novembro, em nova plataforma, com conteúdo ainda sendo restaurado. O Itec ainda não esclareceu a quem pertencia a credencial e diz enfrentar cerca de 30 mil tentativas de ataque por hora.

## Por que importa

O SOC não viu a entrada porque a credencial era legítima. Isso mostra o limite de controles centrados em autenticação e perímetro: eles não dizem o que uma conta pode alcançar nem quais dados estão ao alcance dela. Sistemas legados de fornecedores, com contas administrativas ativas, tendem a ficar fora do inventário de acessos e de dados.

## Leitura de risco

| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Credencial administrativa válida | Itec confirma login com usuário e senha válidos de administrador | Alta |
| Aplicação legada de terceiro | Portal desenvolvido por terceirizada, com falhas no código exploradas | Alta |
| Detecção | Acesso não detectado pelo SOC por ser credencial válida | Média |
| Integridade de dados | Registros de notícias, eventos e fotos apagados do banco | Média |

## O que fazer nesta semana

1. Listar todas as contas administrativas de sistemas legados e de fornecedores, com dono e último uso, e desativar as órfãs (dono: IAM).
2. Mapear quais bancos de dados cada uma dessas contas consegue ler, alterar ou apagar (dono: governança de dados).
3. Criar alerta para login administrativo fora do horário e para exclusões em massa em bancos de aplicações legadas (dono: SOC).
