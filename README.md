# DevBlog UVG - Blog Web Application

Este es un proyecto desarrollado para la Universidad del Valle de Guatemala (UVG). Una aplicación web moderna que consume la API de JSONPlaceholder para gestionar y visualizar publicaciones de un blog.

## 🚀 Funcionalidades

- **Listado Dinámico:** Visualización de publicaciones con carga asíncrona.
- **Paginación:** Navegación por páginas para optimizar la carga de datos.
- **Filtros Avanzados:**
  - Búsqueda por texto en tiempo real.
  - Filtrado por Categoría (basado en IDs de usuario).
  - Filtrado por Autor.
  - Ordenamiento (Ascendente/Descendente).
- **Gestión de Posts:**
  - Creación de nuevas publicaciones con validación de formularios.
  - Vista de detalle de cada publicación.
  - Eliminación de publicaciones con confirmación.
- **Diseño Responsivo:** Adaptado para dispositivos móviles, tablets y escritorio.

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica.
- **CSS3:** Estilos avanzados utilizando CSS Variables y Grid/Flexbox.
- **JavaScript (Vanilla):** Lógica modular (ES6 Modules) sin dependencias externas.
- **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 📁 Estructura del Proyecto

```text
/
├── about/           # Sección de información del equipo
├── api/             # Módulo de comunicación con la API
├── filters/         # Lógica y UI de los filtros
├── main/            # Punto de entrada de la aplicación
├── new-post/        # Funcionalidad de creación de posts
├── styles/          # Estilos globales y componentes
└── ui/              # Componentes de renderizado de interfaz
```

## 👥 Equipo de Desarrollo

- **Axel Arturo Cruz Lima (24656):** Implementación de funcionalidades de creación, eliminación y arquitectura modular.
- **Enya Ayleen Gálvez Hernández (24693):** Desarrollo de la estructura base, paginación y sistema de filtrado.

---
© 2026 Universidad del Valle de Guatemala
