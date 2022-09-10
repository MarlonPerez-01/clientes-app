# Sistema para registro de clientes

### Generalidades.

Se requiere un sistema para el registro de clientes, donde se guarde los datos generales y permita tener más de una
dirección o documento de identificación, la cantidad de tipo documentos y direcciones quedaría a discreción de quien
ingresa la información.

### Se requiere

- Pantalla donde permita la administración de los clientes.
- Servicio para consumir desde aplicaciones externas.
- Auditoria en los cambios que se realicen sobre la información de los clientes.
- Reporte de los clientes en archivo de texto csv, txt generado desde un script.

### Consideraciones

- Puede utilizar cualquier base de datos
- Puede utilizar cualquier framework
- Puede utilizar cualquier lenguaje de programación.
- Se requiere que el proyecto lo suban a un repositorio git publico.

## Empezando

### Dependencias

* [Mysql](https://www.mysql.com/)
* [NodeJS](https://nodejs.org/en/)

### Prerequisitos
Es necesario tener instalada la cli de Nest.
```sh
npm install @nestjs/cli -g
```

### Configuración

* Clonar este repositorio

```sh
git clone https://github.com/MarlonPerez-01/clientes-app.git
```

### Configuracion del backend

* Navegar al directorio del proyecto y ubicarse en la carpeta `backend`

* Ejecutar `npm install` o `npm i` para la instalación de dependencias.

* Crear el archivo `.env` y copiar el contenido del archivo `.env.sample` y asignar los valores a cada variable.

* Crear la base de datos en MySQL e insertar datos utilizando el archivo `config.sql` que se encuentra en la carpeta
  `database`.

### Ejecutar backend

* Ejecutar `npm run start:dev` para iniciar el servidor.

### Generar documentación
* Ejecutar `npm run build` para generar la documentación en swagger.
* La documentacion puede ser visualizada en [http://localhost:8080/api](http://localhost:8080/api)

## Scripts

### Configuracion del frontend

* Navegar al directorio del proyecto y ubicarse en la carpeta `frontend`
* Ejecutar `npm install` o `npm i` para la instalación de dependencias.

### Ejecutar frontend

* Ejecutar `npm run start` para iniciar.

Inicia la aplicacion en [http://localhost:8000](http://localhost:3000)


### Tecnologías

- [Typescript](https://www.typescriptlang.org/) - TypeScript es un lenguaje de programación fuertemente tipado basado en
  JavaScript que permite a los desarrolladores escribir código de manera más legible y mantener el código limpio.
- [Node.js](https://nodejs.org/) - Node.js es un entorno de ejecución de JavaScript que se ejecuta en un entorno
  de servidor.
- [NestJS](https://nestjs.com/) - NestJS es un framework de Typescript para construir aplicaciones web y
  servicios de API REST.
- [Typeorm](https://typeorm.io/) - Es un ORM que puede ejecutarse en las plataformas NodeJS, Browser, Cordova,
  PhoneGap, Ionic, React Native, NativeScript, Expo y Electron y puede usarse con TypeScript y JavaScript (ES5, ES6,
  ES7, ES8).
- [React](https://reactjs.org/) - Librería de JavaScript para crear interfaces de usuario.
- [Axios](https://axios-http.com/docs/intro) - Axios es una biblioteca JavaScript que se utiliza para hacer solicitudes
  HTTP desde el navegador y Node.js.
- [Class-validator](https://github.com/typestack/class-validator) - Class-validator es una librería de validación
  de tipos de datos de código abierto.
- [Class-transformer](https://github.com/typestack/class-transformer) - Libreria de transformación de tipos de datos
  ,serialización y deserialización basadas en decoratores entre objetos y clases.
  permite encriptar y desencriptar contraseñas.
- [Swagger](https://swagger.io/) - Swagger es una herramienta de desarrollo de API que permite generar documentos de
  API en formato JSON, XML, YAML, HTML, etc.
- [Prettier](https://prettier.io/) - Un formateador de código obstinado.