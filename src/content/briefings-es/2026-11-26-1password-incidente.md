---
title: "1Password: la cuenta de GitHub de un empleado llevó al atacante al CI/CD y a datos de clientes"
description: "Código malicioso publicado por el pipeline descargó datos administrativos de parte de los clientes; las bóvedas no fueron afectadas."
pubDate: 2026-11-26T08:35:00-03:00
sourceName: "1Password"
sourceUrl: "https://1password.com/blog/update-on-nov-2026-security-incident"
cover: "https://covers.duarte.top/covers/20261126-1password-incidente-0802.jpg"
tipo: incidente
pais: global
tags: ["incidente", "supply-chain", "github", "ci-cd", "gerenciador-de-senhas"]
---

**En una línea:** el atacante no necesitó tocar la base de clientes; el pipeline de entrega ya tenía el camino hasta ella.

## Qué ocurrió
El 25 de noviembre de 2026, 1Password informó que, desde el 19 de noviembre, investiga el acceso de un atacante a la cuenta corporativa de GitHub de un empleado. Con esa cuenta, el intruso copió código fuente de repositorios privados, llegó al sistema de CI/CD, que guarda secretos de infraestructura, y envió código malicioso a servicios de backend. El código descargó datos administrativos de parte de los clientes: nombres y correos, identificadores de cuenta y de usuario, fechas de creación y de último inicio de sesión, claves públicas, parámetros del protocolo SRP, tokens de enlaces de invitación, aprovisionamiento y recuperación enviados por correo y metadatos internos no secretos.

Según la empresa, el contenido de las bóvedas, las claves que las protegen, las claves de recuperación, las apps y las extensiones no fueron afectados, y no hay evidencia interna de toma de cuentas con los tokens expuestos. 1Password desactivó la cuenta, revocó el token del atacante, rotó credenciales internas, amplió los códigos de invitación y recuperación de seis dígitos a diez caracteres y contrató especialistas independientes. Un pequeño número de usuarios en proceso de aprovisionamiento o recuperación fue notificado. La empresa no divulgó cuántos clientes forman parte del grupo afectado.

## Por qué importa
El camino hasta los datos de clientes pasó por una cuenta de desarrollador y por el CI/CD, no por un ataque directo a la base. Los inventarios de datos personales suelen listar repositorios de datos, pero rara vez mapean qué pipelines, tokens e identidades de ingeniería pueden leer o exfiltrar esos registros. Los tokens de invitación y recuperación expuestos también abren espacio para phishing dirigido, como la propia empresa alertó.

## Lectura de riesgo
| Vector | Evidencia pública | Gravedad |
|---|---|---|
| Cuenta corporativa de GitHub comprometida | Confirmado por 1Password | Alta |
| Acceso al CI/CD con secretos de infraestructura | Confirmado por 1Password | Alta |
| Código malicioso en backend descargando datos de clientes | Confirmado; número de afectados no divulgado | Alta |
| Phishing con tokens de invitación y recuperación | Alerta de la empresa; sin toma de cuenta identificada | Media |

## Qué hacer esta semana
1. Listar qué servicios que leen datos personales pueden recibir deploy por el CI/CD y con qué credenciales — ingeniería de plataforma.
2. Revisar tokens de larga duración y permisos de cuentas de desarrollador en GitHub, con MFA resistente a phishing y expiración corta — seguridad de identidad.
3. Señal de que funcionó: para cualquier cuenta de desarrollador, el equipo responde en horas a qué conjuntos de datos de clientes llega.
