# testConstant

## Common Dependencies

- [Git].
- [NodeJS v10 & npm v6][node] (npm v6 comes installed with NodeJS v10).
- [Docker].

[docker]: https://www.docker.com/
[node]: https://nodejs.org/en/
[git]: https://git-scm.com/

## Development Dependencies

- **Linux**: Latest
  [**Docker CE**](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- **Mac**: Latest
  [**Docker EDGE**](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- **Windows**: Latest
  [**Docker CE**](https://docs.docker.com/docker-for-windows/)

- **Docker Compose**: Latest [**Docker-Compose**](https://docs.docker.com/v17.09/compose/install/)

## Get Started (dev environment)

- Start APP frontend at localhost ([http://localhost:8080](http://localhost:8080)):
- Start APP backend at localhost ([http://localhost:5000](http://localhost:5000)):
- Start phpmyadmin at localhost ([http://localhost:8000](http://localhost:8000)):

- Para ejecutar el proyecto en modo PROD:

```bash
docker-compose up frontend backend
```

- Si se quiere tener acceso a la BD por medio de phpmyadmin ejecutar:

```bash
docker-compose up frontend backend phpmyadmin
```

- NOTA: En el momento en que se levanta el backend con MySQL como motor de base de datos, se importa una BD default con empleados ya precargados y se crean todas las tablas necesarias.

- Si se desea correr el test en modo dev (angular) ejecutar:

```bash
docker-compose up frontend-dev backend phpmyadmin
```

## Setup

This project not required a setup

## GitHub Repostory
([https://github.com/Pato2790/test-constant](https://github.com/Pato2790/test-constant))
