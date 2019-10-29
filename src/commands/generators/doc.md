# ¿Cómo usar los generadores?

## Pre-requisitos
- instalar python 3

### Paso 1
Editar el contenido de entities.json. Este archivo contiene un array de entidades. De estas se creará un servicio y una ruta listos para usar con las características CRUD.

### Paso 2
Ejecutar el comando: python3 services.py

### Paso 3
Crear los mocks de cada entidad en: utils/mocks

### Paso 4
Añadir los strings CRUD al archivo de idiomas: utils/lan/es.js

### Paso 5 
En el archivo index de las rutas hay que importar las nuevas rutas.

Ejemplo:

```const usersRouter = require('./users');```

### Paso 6
En el mismo archivo hay que mandar a llamar a la función router de cada entidad importada.

Ejemplo:

```usersRouter(router);```

### Paso 7
Comenzar a usar