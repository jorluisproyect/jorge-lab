# JORGE LAB V7 — Neon Admin

Portafolio multipágina en Next.js + TypeScript conectado a Neon PostgreSQL.

## Novedades V7

- La Home y `/proyectos` pueden leer proyectos publicados desde Neon.
- El contador de la portada usa automáticamente la cantidad de proyectos publicados.
- `/admin` incluye login privado.
- Crear, editar, publicar, pasar a borrador, destacar y eliminar proyectos.
- Subida de imágenes desde el panel; la primera se usa como portada y las demás como galería.
- Cada cambio se guarda en `portfolio_projects` y aumenta la revisión.
- Límite básico de intentos de login usando `portfolio_login_limits`.
- Si `DATABASE_URL` no está configurada, la web pública usa los proyectos locales como respaldo.

## 1. Instalar

En CMD dentro de esta carpeta:

```bat
npm.cmd install
npm.cmd run dev
```

Abre `http://localhost:3000`.

## 2. Activar Neon y el panel

Copia `.env.local.example` como `.env.local` y completa:

```env
DATABASE_URL="tu cadena de conexión de Neon"
ADMIN_USERNAME="tu usuario privado"
ADMIN_PASSWORD="una clave privada larga"
SESSION_SECRET="un secreto aleatorio largo"
```

No publiques `.env.local`. Ya está cubierto por `.gitignore`.

Reinicia el servidor después de modificar variables:

```bat
Ctrl+C
npm.cmd run dev
```

Luego entra a `http://localhost:3000/admin`.

## 3. Publicar un proyecto

Desde `/admin`:

1. Pulsa `+ Nuevo`.
2. Completa título, categoría, resumen, reto, solución y resultado.
3. Agrega tecnologías y funciones.
4. Sube una o varias imágenes.
5. Elige `Publicado` o `Borrador`.
6. Marca `Destacado` si quieres priorizarlo en la Home.
7. Guarda.

La Home y `/proyectos` leen la información desde Neon. El contador también se actualiza automáticamente.

## 4. Vercel

En Vercel configura las mismas cuatro variables de entorno:

- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

Después despliega normalmente. El panel funciona mediante rutas API de Next.js y cookie HTTP-only.

## Base de datos

El proyecto Neon actual ya contiene las tablas requeridas. `database/schema.sql` se incluye solo como referencia/recuperación para otra base de datos.


### Seguridad
La copia local puede usar un archivo `.env.local`, que está excluido por `.gitignore`. No publiques ese archivo ni pegues sus secretos dentro del código. Antes de publicar el panel en Internet, conviene usar una contraseña más larga que una clave numérica corta.
