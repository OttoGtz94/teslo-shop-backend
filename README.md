<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

1. Clonar repositorio
2. Ejecutar

```
yarn install
```

3. Clonar el archivo **.env.template** con el nombre **.env** e ingresar los valores de las variables.

4. Crear **BD** y **Gestionador BD Adminer**

```
docker compose up -d
```

Para abrir Adminer ir a

> localhost:${PORT_ADM}

e ingresar con las credenciales guardadas en el archivo **.env**
