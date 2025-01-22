# Caduca

Esta es la aplicación backend para el sistema de vales de producto vencido, construida con NestJS. Proporciona una API RESTful para la aplicación frontend y maneja toda la lógica de negocio, gestión de datos y características de seguridad.

## Configuración recomendada del IDE

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y desactivar Vetur).

## Soporte de tipos para importaciones de `.vue` en TS

TypeScript no puede manejar la información de tipos para importaciones de `.vue` por defecto, por lo que reemplazamos la CLI `tsc` con `vue-tsc` para la comprobación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje TypeScript reconozca los tipos de `.vue`.

## Personalizar configuración

Ver [Referencia de configuración de Vite](https://vitejs.dev/config/).

## Configuración del proyecto

```sh
bun install
```

### Compilar y recargar automáticamente para desarrollo

```sh
bun dev
```

### Comprobar tipos, compilar y minificar para producción

```sh
bun build
```

### Ejecutar pruebas unitarias con [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

### Lint con [ESLint](https://eslint.org/)

```sh
bun lint
```
