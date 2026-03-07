# EleCommerce

EleCommerce es una plataforma de comercio electrónico de pila completa (Full-Stack) construida con tecnologías modernas. Cuenta con un frontend en React rápido y responsivo y un backend robusto en Node.js, cubriendo un flujo completo de compras desde la gestión de productos y carrito de compras, hasta pagos seguros y soporte al cliente asistido por IA.

El proyecto está diseñado para ser altamente interactivo, seguro y completamente escalable.

## 🚀 Características Principales

- **Interfaz Moderna y Responsiva**: Construida con React 19, Tailwind CSS 4, Framer Motion y componentes de Embla Carousel para una experiencia premium.
- **Gestión de Estado y Datos**: Utiliza Zustand para el estado global y React Query para el manejo y caché de datos del servidor.
- **Autenticación y Seguridad**: Autenticación segura mediante JWT y bcrypt, con validación exhaustiva y pruebas de seguridad en los endpoints.
- **Base de Datos y ORM**: Implementa Prisma ORM con PostgreSQL (Supabase) para la persistencia de datos (incluyendo historial de bots) y soporte nativo para Mongoose (MongoDB).
- **Procesamiento de Pagos**: Integración segura de pasarela de pagos a través de Stripe.
- **Asistente de IA (Bot)**: Un bot de soporte integrado utilizando el SDK de Google Gen AI (`@google/genai`), con el estado y las conversaciones de los usuarios persistidos de manera segura en Supabase.
- **Gestión Multimedia**: Subida y procesamiento de imágenes optimizadas con ImageKit y Multer.
- **Notificaciones por Correo**: Correos electrónicos automatizados utilizando Nodemailer.
- **Internacionalización (i18n)**: La interfaz de usuario soporta múltiples idiomas, actualmente traducida completamente al español.
- **Integración y Despliegue Continuos (CI/CD)**: Pipeline automatizado mediante GitHub Actions para compilar la imagen Docker del servidor y desplegar la aplicación cliente directamente en Vercel.

---

## 💻 Tecnologías Utilizadas

### Frontend (`/client-ecommerce`)
- **Framework**: React (v19) moderno inicializado con Vite
- **Estilos y UI**: Tailwind CSS (v4), Framer Motion, Embla Carousel, Lucide/React Icons
- **Gestión de Estado**: Zustand, React Query (@tanstack/react-query)
- **Enrutamiento**: React Router DOM (v7)
- **Formularios y Validación**: React Hook Form con resolutores tipo Zod
- **Otros**: Stripe React para pagos, Axios, SweetAlert2, y Sonner para notificaciones.
- **Lenguaje**: TypeScript

### Backend (`/server-ecommerce`)
- **Entorno del Servidor**: Node.js, entorno Express (v5)
- **ORM / Base de Datos**: Prisma (PostgreSQL / Supabase) y Mongoose (MongoDB)
- **Autenticación**: JSON Web Tokens (JWT), bcrypt, OTP Generator
- **Integraciones Third-Party**: Stripe API, ImageKit, Google Gen AI SDK
- **Manejo de Archivos**: Multer
- **Pruebas (Testing)**: Jest (con soporte para módulos ES) y Supertest (+ seguridad)
- **Lenguaje**: TypeScript y TSX
- **Testing**: Jest + Supertest

---

## 📁 Estructura del Proyecto

```text
EleCommerce/
├── client-ecommerce/       # Aplicación Frontend en React/Vite
│   ├── public/             # Archivos estáticos
│   ├── src/                # Componentes, Páginas, Hooks, Store, etc.
│   └── package.json        # Dependencias del cliente
├── server-ecommerce/       # Servidor y API Backend en Node.js
│   ├── prisma/             # Esquema de Prisma y migraciones de DB
│   ├── src/                # Controladores, Rutas, Modelos, Configuración
│   └── package.json        # Dependencias del servidor
├── .github/workflows/      # Flujos de trabajo automatizados para CI/CD
├── .gitignore              # Archivos y carpetas ignoradas por Git
└── README.md               # Documentación general del proyecto
```

---

## 🛠️ Instalación y Configuración Local

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- Base de datos PostgreSQL (ej. Supabase) y/o MongoDB
- Claves de API para Stripe, ImageKit y Google Gen AI SDK (Gemini)

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd EleCommerce
```

### 2. Configurar el Backend (Servidor)
```bash
cd server-ecommerce
npm install

# Crea un archivo .env basado en las variables requeridas:
# DATABASE_URL (para Prisma/Supabase)
# JWT_SECRET
# STRIPE_SECRET_KEY
# GEMINI_API_KEY
# IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT, etc.

# Generar el cliente de Prisma y ejecutar las migraciones:
npx prisma generate
npx prisma migrate dev

# Iniciar el servidor localmente en modo desarrollo:
npm run dev
```

### 3. Configurar el Frontend (Cliente)
```bash
cd ../client-ecommerce
npm install

# Crea tu archivo .env con las configuraciones del cliente:
# VITE_API_URL (URL de tu servidor backend en local)
# VITE_STRIPE_PUBLIC_KEY

# Iniciar la aplicación del cliente:
npm run dev
```

---

## 📜 Scripts Disponibles

### Cliente (`client-ecommerce`)
- `npm run dev` - Inicia el servidor de desarrollo Vite.
- `npm run build` - Compila la aplicación base de TypeScript para producción.
- `npm run lint` - Ejecuta ESLint para analizar el código.

### Servidor (`server-ecommerce`)
- `npm run dev` - Inicia el servidor de desarrollo utilizando `tsx watch` con recarga en caliente.
- `npm run build` - Genera el cliente de Prisma y compila los archivos `.ts` a JavaScript.
- `npm test` - Ejecuta los tests unitarios y pruebas de seguridad (Jest + Supertest).
- `npm start` - Ejecuta migraciones hacia producción e inicia el servidor de producción optimizado.
- `npm run lint` - Verifica los errores de TypeScript directamente.

---
