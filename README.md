# Mr. Homero API

API RESTful para **Mr. Homero**, un sistema de gestión integral para restaurantes. Esta API maneja usuarios, productos, pedidos, y más.

---

## 📦 Repositorios del Proyecto

- 🔧 Backend API (este repositorio): https://github.com/cmsrwood/mrhomero_api  
- 🌐 Web Frontend (ReactJS): https://github.com/cmsrwood/mrhomero_web  
- 📱 App Móvil (React Native + Expo): https://github.com/cmsrwood/mrhomero-app  

---

## 🚀 Tecnologías

- Node.js + Express  
- MySQL  
- JWT para autenticación  
- dotenv  
- Sequelize  

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/cmsrwood/mrhomero_api.git
cd mrhomero_api
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar las variables de entorno. Crea un archivo `.env` con lo siguiente:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=mrhomero
JWT_SECRET=tu_clave_secreta
```

4. Iniciar el servidor:

```bash
npm start
```

---

## 📁 Estructura del Proyecto

```
mrhomero_api/
├── src/
│   ├── assets/          # Archivos estáticos
│   ├── config/          # Configuración general y de BD
│   ├── controllers/     # Controladores de rutas
│   ├── database/        # Conexión y helpers de base de datos
│   ├── errors/          # Manejo de errores personalizados
│   ├── middlewares/     # Middlewares (autenticación, validación, etc.)
│   ├── migrations/      # Archivos de migración (Sequelize)
│   ├── models/          # Modelos Sequelize
│   ├── repositories/    # Consultas complejas o reutilizables
│   ├── routes/          # Definición de endpoints
│   ├── services/        # Lógica de negocio reutilizable
│   ├── tests/           # Tests (unitarios, integrados, etc.)
│   └── uploads/         # Archivos subidos
├── app.js               # Inicialización de la app
├── server.js            # Servidor HTTP
├── handler.js           # Integración con Serverless
├── .env                 # Variables de entorno
├── .gitignore
├── .sequelizerc         # Configuración de Sequelize CLI
├── buildspec.yml        # Configuración para CI/CD
├── package.json
├── package-lock.json
├── serverless.yml       # Configuración para despliegue Serverless
└── README.md            # Documentación del proyecto
```

---

## 🔐 Autenticación

La API utiliza JWT. Luego de iniciar sesión, debes incluir el token en las peticiones protegidas:

```
Authorization: Bearer <token>
```

---

## 🧪 Testing

Puedes probar los endpoints usando herramientas como:

- [Postman](https://postman.com)  
- [Insomnia](https://insomnia.rest)
