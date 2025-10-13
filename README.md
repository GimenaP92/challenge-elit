# 📝 Task Elit - Aplicación Web de Gestión de Tareas

**Task Elit** es una aplicación web **Full Stack** desarrollada como parte del **Challenge Técnico de Elit SA**.  
Permite a los usuarios **registrarse, iniciar sesión, ver su perfil y gestionar sus tareas** de manera simple, visual y organizada.

Cada usuario puede crear nuevas tareas, visualizarlas agrupadas por estado y actualizar su progreso (por ejemplo: “Pendiente”, “En curso”, “Terminada”).  

---

## 🎯 Objetivo del Desafío

El objetivo fue construir una solución completa que permitiera a los usuarios:
- Registrarse e iniciar sesión.
- Crear, visualizar, actualizar y eliminar tareas.
- Organizar las tareas por estado (Pendiente, En curso, Terminada).
- Acceder a su perfil personal.
---

## 🧩 Funcionalidades Principales

### ✅ Gestión de Tareas
- Crear nuevas tareas.  
- Listar todas las tareas del usuario autenticado.  
- Cambiar el estado de una tarea (“Pendiente”, “En curso”, “Terminada”).  
- Visualizar las tareas agrupadas por estado.  
- Eliminar tareas.  

### 👤 Gestión de Usuarios
- Registro de nuevos usuarios.  
- Inicio y cierre de sesión.  
- Visualización del perfil personal.  
- Validación de credenciales desde el backend.  
- Persistencia de sesión y autenticación protegida.  

---

## 🛠 Tecnologías Utilizadas

### 🔙 Backend
- **NestJS + TypeScript**
- **Swagger**
- **TypeORM**
- **PostgreSQL**
- **Jest** 
- **Render** 
- **Docker**


---

### 💻 Frontend
- **Next.js (React + TypeScript)**
- **Tailwind CSS**
- **React Icons**
- **Context API** 
- **@hello-pangea/dnd** Librería para drag & drop y menús tipo dropdown interactivos.

---

 🚀 Deploys
- **Frontend en [Vercel](https://elit-front.vercel.app/)**  
- **Backend en [Render](https://challenge-elit.onrender.com/)**  
- **Base de datos PostgreSQL** alojada también en **Render**

---

## 🐳 Docker y Docker Compose

El proyecto incluye configuración de **Docker y docker-compose** para levantar el entorno completo (frontend + backend + base de datos) con un solo comando:

```bash
docker-compose up --build
```

Esto inicia los servicios y permite acceder a:
- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:3001  

---

## ⚙️ Instalación Manual

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/GimenaP92/challenge-elit.git
cd tasks-elite
```

### 2️⃣ Instalar dependencias
```bash
cd back && npm install
cd ../front && npm install
```

### 3️⃣ Configurar variables de entorno
Crear un archivo `.env` en `back` y `front` con las variables necesarias para:
- Conexión a PostgreSQL  
- JWT_SECRET  
- URL del backend  

## .env en front:
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

## .env en back:
# Configuración de la base de datos
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elit
DB_USERNAME=postgres
DB_PASSWORD=yourpassword

# Puerto de la aplicación
PORT=3001

# Origen del frontend para CORS
FRONTEND_ORIGIN=http://localhost:3000


JWT_SECRET=mi_clave_super_secreta
JWT_EXPIRES_IN=3600

### 4️⃣ Levantar el backend
```bash
npm run dev
```

### 5️⃣ Levantar el frontend
```bash
npm run dev
```

---

## 🧠 Decisiones Técnicas
- **NestJS**: elegido por su arquitectura modular, inyección de dependencias y soporte nativo para TypeScript.  Facilita la creación de APIs escalables y mantenibles siguiendo buenas prácticas de desarrollo backend. Integración nativa con Swagger permite documentar los endpoints de forma clara y automatizada.
- **Next.js**: ofrece SSR y excelente experiencia de desarrollo.  
- **TypeScript**: asegura tipado fuerte y reduce errores en desarrollo.  
- **TypeORM + PostgreSQL**: facilita migraciones y persistencia real.  
- **Tailwind CSS**: acelera el diseño y garantiza responsividad.  
- **Context API**: ideal para manejar sesión sin librerías externas.  
- **Docker**: permite levantar todo el entorno fácilmente.  
- **Render + Vercel**: despliegues rápidos, confiables y gratuitos.  

---

## 💬 Extras Implementados

- ✅ Registro, login y perfil de usuario.  
- ✅ Persistencia real con PostgreSQL.  
- ✅ Estado global con Context API.  
- ✅ Uso de Docker y docker-compose.  
- ✅ Despliegue funcional en la nube.  
- ✅ Pruebas con Jest.  
- ✅ Feedback visual con notificaciones.  

---

✨ *Desarrollado con dedicación para el Challenge Técnico de Elit SA.*
