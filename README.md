# Demo de Cotizador Inteligente

Esta demo es un prototipo funcional y visual para un **cotizador digital inteligente** orientado a empresas de concreto y materiales de construcción. Permite simular el flujo básico de selección de productos, cálculo preliminar de cantidades, generación de cotizaciones y revisión de las mismas desde un panel interno.

## Contenido del proyecto

La estructura del proyecto es la siguiente:

```
cotizador-demo/
├── index.html         # Página principal con catálogo, calculadora y cotización
├── admin.html         # Demo del panel interno de cotizaciones
├── css/
│   ├── styles.css     # Estilos base y variables de color
│   ├── responsive.css # Ajustes responsivos para tablet y móvil
│   └── animations.css # Clases de animación opcional
├── js/
│   └── main.js        # Lógica en JavaScript para la demo
├── assets/
│   ├── images/        # Carpeta vacía para añadir imágenes o logos (opcional)
│   ├── icons/         # Carpeta vacía para iconos personalizados (opcional)
│   └── logos/         # Carpeta vacía para logos corporativos (opcional)
└── README.md          # Esta guía
```

## Cómo abrir la demo

1. Descarga o descomprime el archivo `.zip` que contiene el directorio `cotizador-demo`.
2. Abre el archivo `index.html` en tu navegador de preferencia (no requiere conexión a internet).
3. Navega por las diferentes secciones: **Catálogo**, **Calculadora**, **Cotización** y utiliza el flujo para agregar productos y generar cotizaciones. Desde la parte superior también puedes acceder al **panel interno** (`admin.html`).

## Personalización y edición

- **Agregar o modificar productos**: abre el archivo `js/main.js` y edita la constante `productos`. Cada objeto define un producto ficticio con `nombre`, `categoría`, `unidad`, `precio`, `usos` y `descripción`.
- **Cambiar colores**: en `css/styles.css` encontrarás variables CSS en la sección `:root`. Modifica `--color-primary`, `--color-secondary`, `--color-background`, etc., para ajustar la paleta a tu identidad visual.
- **Modificar textos y mensajes**: todos los textos visibles se encuentran en los archivos `index.html`, `admin.html` y `main.js`. Puedes traducir o ajustar el copy según tu marca.
- **Añadir imágenes o logos**: coloca archivos en las carpetas `assets/images`, `assets/icons` o `assets/logos` y referencia las imágenes en tu HTML o CSS según corresponda.

## Qué partes son simuladas

Esta demo es una versión preliminar y **no incluye** lógica ni integraciones de producción. Entre las simulaciones se encuentran:

- **Precios y fórmulas**: los precios y cálculos de volumen son referenciales y deberán ser validados técnicamente.
- **Folio y vigencia**: se generan de forma aleatoria para la demostración.
- **Envío por WhatsApp**: muestra una alerta informativa sin conectarse a ningún servicio.
- **Descarga de cotización**: se genera un archivo de texto simple como ejemplo; no es un PDF oficial.
- **Panel interno**: utiliza `localStorage` para persistir cotizaciones dentro del navegador y permite cambiar su estatus, pero no hay base de datos ni autenticación.
- **Seguridad y permisos**: no se implementan controles de acceso ni validaciones avanzadas.

## Próximas fases sugeridas

Para transformar esta demo en un producto mínimo viable, se recomienda:

1. **Persistencia real**: integrar una base de datos para almacenar productos, clientes y cotizaciones.
2. **Lógica de precios**: conectar con listas de precios actualizadas y fórmulas de cálculo precisas.
3. **Integración de WhatsApp Business**: enviar cotizaciones a través de la API oficial o servicios equivalentes.
4. **CRM y seguimiento**: asociar la plataforma a un sistema de gestión de clientes y tareas de seguimiento comercial.
5. **Pasarela de pagos y facturación**: permitir pagos en línea y emisión de facturas mediante integraciones con proveedores.
6. **Módulo de usuarios**: autenticación y roles para vendedores, administradores y clientes.
7. **Panel administrativo real**: estadísticas avanzadas, filtros y acciones sobre las cotizaciones generadas.
8. **GPS y logística**: incluir mapas, cálculo de distancias y tiempos de entrega aproximados.

## Advertencia comercial

> **Esta es una demo comercial.** Los precios, fórmulas, productos y flujos mostrados son referenciales y deberán validarse en una fase de diagnóstico. No se incluyen arquitecturas, bases de datos ni algoritmos sensibles.

---

Demo preliminar desarrollada por **Solertia Group**. Uso exclusivo para evaluación comercial.