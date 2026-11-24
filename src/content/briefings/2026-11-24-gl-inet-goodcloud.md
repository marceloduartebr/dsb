---
title: "GL.iNet confirma exploração de falha no gerenciamento na nuvem que instalou malware em roteadores e KVMs"
description: "A empresa bloqueou o caminho do ataque em 20 de novembro, mas isso não remove o malware dos aparelhos já infectados."
pubDate: 2026-11-24T08:50:00-03:00
sourceName: "GL.iNet"
sourceUrl: "https://www.gl-inet.com/en-us/blogs/blog/glinet-security-notice-2026-11-20"
cover: "https://covers.duarte.top/covers/20261123-gl-inet-goodcloud-0813.jpg"
tipo: incidente
tags: ["malware", "roteadores", "nuvem", "vulnerabilidade"]
pais: global
---

**Em uma linha:** fechar a falha na nuvem impede novas infecções; não limpa o aparelho que já recebeu o malware.

## O que aconteceu
Em 20 de novembro de 2026, a GL.iNet identificou uma vulnerabilidade em seus serviços de gerenciamento remoto na nuvem. Um terceiro não autorizado explorou a falha para acessar e instalar software malicioso em alguns roteadores e dispositivos KVM da marca. A empresa afirma ter corrigido a vulnerabilidade e bloqueado o caminho usado no ataque, de modo que novos aparelhos não podem mais ser infectados por essa via. Essas medidas, porém, não removem o malware dos dispositivos já comprometidos. O aviso oficial pede que clientes procurem o processo "crond -i /tmp/.log"; se ele aparecer, o aparelho deve ser tratado como infectado, com redefinição de fábrica ou instalação da versão de segurança indicada. A firmware estável com correções estava prevista para 22 de novembro. A companhia vai notificar por e-mail os clientes de conta na nuvem que identificar como afetados e ainda investiga o alcance, inclusive se computadores ligados aos KVMs foram atingidos. Não divulgou quantos dispositivos foram infectados.

## Por que importa
O painel de gerenciamento na nuvem do fabricante alcança uma frota inteira de aparelhos. Quando essa via é abusada, o inventário que importa não é o recorte do fornecedor: é a lista de roteadores e KVMs que a própria empresa ainda tem em operação, e o que esses equipamentos encostam.

## Leitura de risco
| Vetor | Evidência pública | Gravidade |
|---|---|---|
| Exploração de falha no gerenciamento na nuvem | Aviso oficial da GL.iNet de 20/11 | Alta |
| Instalação de malware em roteadores e KVMs | Aviso oficial da GL.iNet | Crítica |
| Comprometimento de computadores ligados aos KVMs | Investigação em andamento, não confirmado | Indeterminada |

## O que fazer nesta semana
1. Inventariar roteadores e KVMs GL.iNet em uso, inclusive em home office e laboratórios, e checar o indicador de comprometimento indicado pelo fabricante — dono: infraestrutura.
2. Isolar ou redefinir aparelhos com sinal de infecção, instalar a firmware de segurança e trocar credenciais e chaves que possam ter passado por esses dispositivos — dono: segurança + infraestrutura.
3. Sinal de que funcionou: cada aparelho da frota tem um responsável, um resultado da checagem e, se comprometido, um registro do que estava conectado a ele.