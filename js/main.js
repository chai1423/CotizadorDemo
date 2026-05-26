// main.js

(function () {
    'use strict';

    const productos = [
        { id: 1, nombre: "Concreto f’c 100 kg/cm²", categoria: "Concreto", unidad: "m³", precio: 1300, resistencia: 100, usos: ["banqueta", "decorativo"], descripcion: "Concreto para banquetas, andadores y elementos no estructurales." },
        { id: 2, nombre: "Concreto f’c 150 kg/cm²", categoria: "Concreto", unidad: "m³", precio: 1500, resistencia: 150, usos: ["firme", "pavimento", "banqueta"], descripcion: "Concreto para firmes, banquetas y pavimentos ligeros." },
        { id: 3, nombre: "Concreto f’c 200 kg/cm²", categoria: "Concreto", unidad: "m³", precio: 1700, resistencia: 200, usos: ["losa", "muro", "firme"], descripcion: "Concreto de resistencia media para losas, firmes y muros." },
        { id: 4, nombre: "Concreto f’c 250 kg/cm²", categoria: "Concreto", unidad: "m³", precio: 1900, resistencia: 250, usos: ["losa", "cimentación", "muro"], descripcion: "Concreto para losas, cimentaciones ligeras y elementos estructurales." },
        { id: 5, nombre: "Concreto f’c 300 kg/cm²", categoria: "Concreto", unidad: "m³", precio: 2100, resistencia: 300, usos: ["cimentación", "losa", "muro"], descripcion: "Concreto de mayor resistencia para cimentaciones y estructuras." },
        { id: 6, nombre: "Concreto f’c 350 kg/cm²", categoria: "Concreto", unidad: "m³", precio: 2350, resistencia: 350, usos: ["cimentación", "losa"], descripcion: "Concreto de alta resistencia para elementos de mayor carga." },
        { id: 7, nombre: "Concreto permeable", categoria: "Concreto", unidad: "m³", precio: 2400, resistencia: 200, usos: ["pavimento", "banqueta"], descripcion: "Concreto para zonas que requieren filtración de agua." },
        { id: 8, nombre: "Concreto estampado", categoria: "Concreto", unidad: "m³", precio: 2500, resistencia: 250, usos: ["decorativo", "banqueta"], descripcion: "Concreto decorativo para acabados arquitectónicos." },
        { id: 9, nombre: "Concreto de fraguado rápido", categoria: "Concreto", unidad: "m³", precio: 2600, resistencia: 200, usos: ["firme", "pavimento"], descripcion: "Concreto para obras que requieren resistencia temprana." },
        { id: 10, nombre: "Relleno fluido", categoria: "Concreto", unidad: "m³", precio: 1450, resistencia: 100, usos: ["relleno"], descripcion: "Material fluido para rellenos, zanjas y nivelaciones." },

        { id: 11, nombre: "Cemento gris 50 kg", categoria: "Cementos", unidad: "bulto", precio: 220, usos: ["concreto", "muro"], descripcion: "Cemento gris para construcción general." },
        { id: 12, nombre: "Cemento mortero 50 kg", categoria: "Cementos", unidad: "bulto", precio: 200, usos: ["muro"], descripcion: "Mortero para pegar block, tabique y trabajos de albañilería." },
        { id: 13, nombre: "Cemento blanco 50 kg", categoria: "Cementos", unidad: "bulto", precio: 260, usos: ["decorativo"], descripcion: "Cemento blanco para acabados y elementos visibles." },
        { id: 14, nombre: "Cemento alta resistencia 50 kg", categoria: "Cementos", unidad: "bulto", precio: 280, usos: ["cimentación", "losa"], descripcion: "Cemento para concretos de mayor desempeño." },
        { id: 15, nombre: "Cemento impermeable 25 kg", categoria: "Cementos", unidad: "bulto", precio: 300, usos: ["cimentación", "muro"], descripcion: "Cemento con aditivos impermeables." },
        { id: 16, nombre: "Cemento resistente a sulfatos 50 kg", categoria: "Cementos", unidad: "bulto", precio: 340, usos: ["cimentación"], descripcion: "Cemento para ambientes agresivos." },
        { id: 17, nombre: "Mortero autocompactable", categoria: "Cementos", unidad: "bulto", precio: 260, usos: ["muro", "relleno"], descripcion: "Mortero fluido para rellenos y muros." },

        { id: 18, nombre: "Arena fina", categoria: "Agregados", unidad: "tonelada", precio: 380, usos: ["relleno", "muro"], descripcion: "Arena fina para morteros, aplanados y rellenos." },
        { id: 19, nombre: "Arena gruesa", categoria: "Agregados", unidad: "tonelada", precio: 390, usos: ["concreto", "relleno"], descripcion: "Arena gruesa para concreto y nivelaciones." },
        { id: 20, nombre: "Arena cribada", categoria: "Agregados", unidad: "tonelada", precio: 400, usos: ["muro"], descripcion: "Arena cribada para albañilería." },
        { id: 21, nombre: "Arena de río lavada", categoria: "Agregados", unidad: "tonelada", precio: 390, usos: ["concreto", "muro"], descripcion: "Arena lavada para mezclas limpias." },
        { id: 22, nombre: "Arena sílica", categoria: "Agregados", unidad: "tonelada", precio: 600, usos: ["decorativo"], descripcion: "Arena especial para acabados y filtros." },
        { id: 23, nombre: "Grava 3/4”", categoria: "Agregados", unidad: "tonelada", precio: 500, usos: ["concreto", "relleno"], descripcion: "Grava estándar para mezclas de concreto." },
        { id: 24, nombre: "Grava 1/2”", categoria: "Agregados", unidad: "tonelada", precio: 520, usos: ["concreto", "firme"], descripcion: "Grava fina para concretos y firmes." },
        { id: 25, nombre: "Grava 1”", categoria: "Agregados", unidad: "tonelada", precio: 540, usos: ["concreto", "cimentación"], descripcion: "Grava para concretos robustos y cimentaciones." },
        { id: 26, nombre: "Grava basáltica", categoria: "Agregados", unidad: "tonelada", precio: 560, usos: ["concreto"], descripcion: "Agregado basáltico para concretos de alto desempeño." },
        { id: 27, nombre: "Base hidráulica", categoria: "Agregados", unidad: "tonelada", precio: 320, usos: ["pavimento", "firme"], descripcion: "Material granular para bases y pavimentos." },
        { id: 28, nombre: "Sub-base de banco", categoria: "Agregados", unidad: "tonelada", precio: 340, usos: ["pavimento"], descripcion: "Material para terracerías y subbases." },
        { id: 29, nombre: "Tezontle rojo", categoria: "Agregados", unidad: "tonelada", precio: 420, usos: ["relleno", "decorativo"], descripcion: "Tezontle para relleno ligero y jardinería." },
        { id: 30, nombre: "Tezontle negro", categoria: "Agregados", unidad: "tonelada", precio: 430, usos: ["relleno", "decorativo"], descripcion: "Tezontle oscuro para rellenos y paisajismo." },
        { id: 31, nombre: "Piedra bola", categoria: "Agregados", unidad: "tonelada", precio: 450, usos: ["decorativo", "relleno"], descripcion: "Piedra redondeada para paisajismo y drenaje." },
        { id: 32, nombre: "Cascajo limpio", categoria: "Agregados", unidad: "tonelada", precio: 250, usos: ["relleno"], descripcion: "Material para relleno y nivelación." },

        { id: 33, nombre: "Servicio de bombeo", categoria: "Servicios", unidad: "servicio", precio: 1200, usos: ["concreto"], descripcion: "Servicio de bombeo de concreto." },
        { id: 34, nombre: "Renta de bomba pluma", categoria: "Servicios", unidad: "servicio", precio: 6500, usos: ["concreto"], descripcion: "Bombeo para obras grandes o de difícil acceso." },
        { id: 35, nombre: "Transporte y descarga", categoria: "Servicios", unidad: "servicio", precio: 650, usos: ["concreto"], descripcion: "Servicio de entrega de materiales en obra." },
        { id: 36, nombre: "Asesoría técnica en sitio", categoria: "Servicios", unidad: "servicio", precio: 950, usos: ["concreto"], descripcion: "Visita técnica para recomendación de material." },
        { id: 37, nombre: "Renta de vibrador", categoria: "Servicios", unidad: "servicio", precio: 550, usos: ["concreto"], descripcion: "Renta de vibrador para compactar concreto." },
        { id: 38, nombre: "Renta de revolvedora", categoria: "Servicios", unidad: "servicio", precio: 700, usos: ["concreto"], descripcion: "Equipo para mezcla en sitio." },
        { id: 39, nombre: "Aplicación de curador", categoria: "Servicios", unidad: "servicio", precio: 1500, usos: ["concreto"], descripcion: "Aplicación de compuesto de curado." },
        { id: 40, nombre: "Servicio de encofrado", categoria: "Servicios", unidad: "servicio", precio: 850, usos: ["losa", "muro"], descripcion: "Apoyo con cimbra y encofrado." },

        { id: 41, nombre: "Aditivo retardante", categoria: "Aditivos", unidad: "litro", precio: 110, usos: ["concreto"], descripcion: "Retarda el fraguado del concreto." },
        { id: 42, nombre: "Aditivo acelerante", categoria: "Aditivos", unidad: "litro", precio: 130, usos: ["concreto"], descripcion: "Acelera el fraguado del concreto." },
        { id: 43, nombre: "Plastificante", categoria: "Aditivos", unidad: "litro", precio: 100, usos: ["concreto"], descripcion: "Mejora la trabajabilidad de la mezcla." },
        { id: 44, nombre: "Superplastificante", categoria: "Aditivos", unidad: "litro", precio: 160, usos: ["concreto"], descripcion: "Reduce agua y mejora fluidez." },
        { id: 45, nombre: "Impermeabilizante integral", categoria: "Aditivos", unidad: "litro", precio: 120, usos: ["concreto"], descripcion: "Ayuda a reducir permeabilidad." },
        { id: 46, nombre: "Fibra de polipropileno", categoria: "Aditivos", unidad: "kg", precio: 90, usos: ["concreto"], descripcion: "Reduce fisuración plástica." },
        { id: 47, nombre: "Fibra de acero", categoria: "Aditivos", unidad: "kg", precio: 150, usos: ["concreto"], descripcion: "Refuerzo para pisos industriales." },
        { id: 48, nombre: "Fibra de vidrio", categoria: "Aditivos", unidad: "kg", precio: 120, usos: ["concreto"], descripcion: "Refuerzo para elementos prefabricados." },
        { id: 49, nombre: "Pigmento rojo", categoria: "Aditivos", unidad: "kg", precio: 80, usos: ["decorativo"], descripcion: "Pigmento para concreto decorativo." },
        { id: 50, nombre: "Pigmento negro", categoria: "Aditivos", unidad: "kg", precio: 90, usos: ["decorativo"], descripcion: "Pigmento para acabados oscuros." },
        { id: 51, nombre: "Pigmento amarillo", categoria: "Aditivos", unidad: "kg", precio: 85, usos: ["decorativo"], descripcion: "Pigmento para concreto decorativo." },
        { id: 52, nombre: "Pigmento azul", categoria: "Aditivos", unidad: "kg", precio: 90, usos: ["decorativo"], descripcion: "Pigmento para acabados especiales." },
        { id: 53, nombre: "Reductor de agua", categoria: "Aditivos", unidad: "litro", precio: 105, usos: ["concreto"], descripcion: "Reduce agua sin perder trabajabilidad." },
        { id: 54, nombre: "Incorporador de aire", categoria: "Aditivos", unidad: "litro", precio: 100, usos: ["concreto"], descripcion: "Mejora durabilidad ante cambios climáticos." },
        { id: 55, nombre: "Anticongelante", categoria: "Aditivos", unidad: "litro", precio: 140, usos: ["concreto"], descripcion: "Para concreto en clima frío." },
        { id: 56, nombre: "Sellador curador", categoria: "Aditivos", unidad: "litro", precio: 90, usos: ["concreto"], descripcion: "Ayuda al curado superficial." },
        { id: 57, nombre: "Microsílice", categoria: "Aditivos", unidad: "kg", precio: 300, usos: ["concreto"], descripcion: "Mejora resistencia y durabilidad." },
        { id: 58, nombre: "Aditivo expansivo", categoria: "Aditivos", unidad: "kg", precio: 95, usos: ["concreto"], descripcion: "Compensa contracciones." },
        { id: 59, nombre: "Fibra de carbono", categoria: "Aditivos", unidad: "kg", precio: 450, usos: ["concreto"], descripcion: "Refuerzo especial de alto desempeño." },
        { id: 60, nombre: "Aditivo para concreto lanzado", categoria: "Aditivos", unidad: "litro", precio: 180, usos: ["muro"], descripcion: "Aditivo para concreto proyectado." }
    ];

    let cotizacion = {
        items: [],
        cliente: null,
        privacidadAceptada: false,
        folio: null,
        fecha: null,
        vigencia: null,
        entrega: null,
        total: null
    };

    const PLANTA_COORDS = {
        lat: 20.0513,
        lng: -99.3435
    };

    const ZONAS_ENTREGA = [
        { nombre: 'Zona local', maxKm: 20, porcentaje: 0.05 },
        { nombre: 'Zona cercana', maxKm: 50, porcentaje: 0.08 },
        { nombre: 'Zona media', maxKm: 90, porcentaje: 0.12 },
        { nombre: 'Zona lejana', maxKm: Infinity, porcentaje: 0.16 }
    ];

    let entregaSeleccionada = null;
    let mapaEntrega = null;
    let marcadorEntrega = null;

    function formatoNumero(valor) {
        return valor.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function formatoMoneda(valor) {
        return valor.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2
        });
    }

    function generarFolio() {
        return 'CH-DEMO-' + Math.floor(100000 + Math.random() * 900000);
    }

    function calcularVigencia() {
        const hoy = new Date();
        const vigencia = new Date(hoy);
        vigencia.setDate(hoy.getDate() + 7);
        return vigencia.toLocaleDateString('es-MX');
    }

    function obtenerNombreTipo(tipo) {
        const map = {
            losa: 'Losa / Firme',
            muro: 'Muro',
            relleno: 'Relleno',
            zapata: 'Zapata / Cimentación'
        };

        return map[tipo] || 'Elemento';
    }

    function drawGrid(ctx, w, h) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;

        const size = 24;

        for (let x = 0; x <= w; x += size) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }

        for (let y = 0; y <= h; y += size) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawFace(ctx, points, fillColor, strokeColor) {
        ctx.save();
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i += 1) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }

    function drawDimensions3D(ctx, pts, color) {
        const p0 = pts[0];
        const p1 = pts[1];
        const p3 = pts[3];
        const p4 = pts[4];

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;

        const offsetL = 24;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y + offsetL);
        ctx.lineTo(p1.x, p1.y + offsetL);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y + offsetL - 5);
        ctx.lineTo(p0.x, p0.y + offsetL + 5);
        ctx.moveTo(p1.x, p1.y + offsetL - 5);
        ctx.lineTo(p1.x, p1.y + offsetL + 5);
        ctx.stroke();

        const xA = p0.x - 24;

        ctx.beginPath();
        ctx.moveTo(xA, p0.y);
        ctx.lineTo(xA, p3.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xA - 5, p0.y);
        ctx.lineTo(xA + 5, p0.y);
        ctx.moveTo(xA - 5, p3.y);
        ctx.lineTo(xA + 5, p3.y);
        ctx.stroke();

        const xH = p0.x - 54;

        ctx.beginPath();
        ctx.moveTo(xH, p0.y);
        ctx.lineTo(xH, p4.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xH - 5, p0.y);
        ctx.lineTo(xH + 5, p0.y);
        ctx.moveTo(xH - 5, p4.y);
        ctx.lineTo(xH + 5, p4.y);
        ctx.stroke();

        ctx.restore();
    }

    function renderizarPreviewTerreno(largo, ancho, espesor, tipo) {
        const canvas = document.getElementById('terrenoCanvas');
        const container = document.getElementById('previewTerreno');

        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const area = largo * ancho;
        const volumen = area * espesor;

        document.getElementById('previewTipo').textContent = obtenerNombreTipo(tipo);
        document.getElementById('previewLargo').textContent = largo.toFixed(2);
        document.getElementById('previewAncho').textContent = ancho.toFixed(2);
        document.getElementById('previewEspesor').textContent = espesor.toFixed(2);
        document.getElementById('previewArea').textContent = area.toFixed(2);
        document.getElementById('previewVolumen').textContent = volumen.toFixed(2);

        container.classList.remove('hidden');

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, w, h);
        drawGrid(ctx, w, h);

        const vertices3D = [
            { x: 0, y: 0, z: 0 },
            { x: largo, y: 0, z: 0 },
            { x: largo, y: ancho, z: 0 },
            { x: 0, y: ancho, z: 0 },
            { x: 0, y: 0, z: espesor },
            { x: largo, y: 0, z: espesor },
            { x: largo, y: ancho, z: espesor },
            { x: 0, y: ancho, z: espesor }
        ];

        const iso = vertices3D.map(v => ({
            x: v.x - v.y,
            y: (v.x + v.y) * 0.5 - v.z
        }));

        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;

        iso.forEach(v => {
            minX = Math.min(minX, v.x);
            maxX = Math.max(maxX, v.x);
            minY = Math.min(minY, v.y);
            maxY = Math.max(maxY, v.y);
        });

        const bboxW = maxX - minX;
        const bboxH = maxY - minY;

        const padX = 80;
        const padY = 80;
        const availW = w - padX * 2;
        const availH = h - padY * 2;
        const scale = Math.min(availW / (bboxW || 1), availH / (bboxH || 1)) * 0.9;

        const offsetX = padX + (availW - bboxW * scale) / 2 - minX * scale;
        const offsetY = padY + (availH - bboxH * scale) / 2 - minY * scale;

        const pts = iso.map(v => ({
            x: v.x * scale + offsetX,
            y: v.y * scale + offsetY
        }));

        let colorTop = '#bfdbfe';
        let colorRight = '#93c5fd';
        let colorLeft = '#60a5fa';
        let colorLine = '#1e3a8a';

        if (tipo === 'relleno') {
            colorTop = '#fef9c3';
            colorRight = '#fde68a';
            colorLeft = '#fcd34d';
            colorLine = '#92400e';
        }

        if (tipo === 'zapata') {
            colorTop = '#d1d5db';
            colorRight = '#9ca3af';
            colorLeft = '#6b7280';
            colorLine = '#374151';
        }

        if (tipo === 'muro') {
            colorTop = '#fecaca';
            colorRight = '#fca5a5';
            colorLeft = '#f87171';
            colorLine = '#7f1d1d';
        }

        drawFace(ctx, [pts[4], pts[5], pts[1], pts[0]], colorRight, colorLine);
        drawFace(ctx, [pts[5], pts[6], pts[2], pts[1]], colorLeft, colorLine);
        drawFace(ctx, [pts[4], pts[5], pts[6], pts[7]], colorTop, colorLine);

        ctx.save();
        ctx.strokeStyle = colorLine;
        ctx.lineWidth = 1.5;

        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.stroke();
        });

        ctx.restore();

        //drawDimensions3D(ctx, pts, 'rgba(0, 0, 0, 0.35)');
    }

    function calcularRecomendacion(largo, ancho, espesor, tipo) {
        const area = largo * ancho;

        if (tipo === 'relleno') {
            return 'Para rellenos y nivelaciones se recomienda revisar agregados como arena, grava o base hidráulica, dependiendo de la compactación requerida.';
        }

        let resistencia = 200;

        if (tipo === 'losa') {
            resistencia = area <= 20 ? 150 : area <= 50 ? 200 : 250;
        }

        if (tipo === 'muro') {
            resistencia = area <= 20 ? 200 : 250;
        }

        if (tipo === 'zapata') {
            resistencia = area <= 10 ? 250 : 300;
        }

        return `Se sugiere utilizar concreto de aproximadamente f’c ${resistencia} kg/cm² para ${obtenerNombreTipo(tipo).toLowerCase()} con estas dimensiones.`;
    }

    function mostrarRecomendacion(texto) {
        const container = document.getElementById('recommendation');
        const textEl = document.getElementById('recommendationText');

        if (!container || !textEl) return;

        textEl.textContent = texto;
        container.classList.remove('hidden');
    }

    function cargarProductos() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;

        grid.innerHTML = '';

        const tipo = document.getElementById('filterTipo')?.value || '';
        const unidad = document.getElementById('filterUnidad')?.value || '';
        const resistencia = document.getElementById('filterResistencia')?.value || '';
        const uso = document.getElementById('filterUso')?.value || '';
        const busqueda = document.getElementById('searchProducto')?.value.toLowerCase() || '';

        if (!tipo && !unidad && !resistencia && !uso && !busqueda) {
            grid.innerHTML = `
                <div class="product-card">
                    <h3>Aplica filtros para ver productos</h3>
                    <p>Selecciona categoría, unidad, resistencia, uso o utiliza la búsqueda para mostrar resultados.</p>
                </div>
            `;
            return;
        }

        const filtrados = productos.filter(p => {
            const okTipo = tipo ? p.categoria === tipo : true;
            const okUnidad = unidad ? p.unidad === unidad : true;
            const okResistencia = resistencia ? p.resistencia && p.resistencia.toString() === resistencia : true;
            const okUso = uso ? p.usos && p.usos.includes(uso) : true;
            const okBusqueda = busqueda ? p.nombre.toLowerCase().includes(busqueda) : true;

            return okTipo && okUnidad && okResistencia && okUso && okBusqueda;
        });

        if (!filtrados.length) {
            grid.innerHTML = `
                <div class="product-card">
                    <h3>Sin resultados</h3>
                    <p>No encontramos productos con esos filtros.</p>
                </div>
            `;
            return;
        }

        filtrados.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';

            const resistenciaText = p.resistencia ? ` | f’c ${p.resistencia} kg/cm²` : '';

            card.innerHTML = `
                <h3>${p.nombre}</h3>
                <p class="product-info">Categoría: ${p.categoria} | Unidad: ${p.unidad}${resistenciaText}</p>
                <p>${p.descripcion}</p>
                <p class="price">${formatoMoneda(p.precio)}</p>
                <button class="btn primary add-btn" data-id="${p.id}">Agregar a cotización</button>
            `;

            grid.appendChild(card);
        });
    }

    function agregarProducto(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        const existente = cotizacion.items.find(item => item.id === id);

        if (existente) {
            existente.cantidad += 1;
        } else {
            cotizacion.items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                unidad: producto.unidad,
                cantidad: 1
            });
        }

        actualizarResumen();
    }

    function eliminarItem(id) {
        cotizacion.items = cotizacion.items.filter(item => item.id !== id);
        actualizarResumen();
    }

    function actualizarCantidad(id, nuevaCantidad) {
        const item = cotizacion.items.find(it => it.id === id);

        if (item) {
            item.cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
        }

        actualizarResumen();
    }

    function obtenerZonaEntrega(distanciaKm) {
        return ZONAS_ENTREGA.find(zona => distanciaKm <= zona.maxKm) || ZONAS_ENTREGA[ZONAS_ENTREGA.length - 1];
    }

    function calcularDistanciaKm(origen, destino) {
        const R = 6371;
        const dLat = (destino.lat - origen.lat) * Math.PI / 180;
        const dLng = (destino.lng - origen.lng) * Math.PI / 180;

        const lat1 = origen.lat * Math.PI / 180;
        const lat2 = destino.lat * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    async function obtenerDireccionDesdeCoordenadas(lat, lng) {
        const inputDireccion = document.getElementById('ubicacionEntrega');
        if (!inputDireccion) return;

        inputDireccion.value = 'Buscando dirección...';

        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=es`;

            const res = await fetch(url);
            const data = await res.json();

            inputDireccion.value = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        } catch (error) {
            inputDireccion.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }
    }

    async function actualizarEntregaDesdeCoordenadas(lat, lng) {
        const destino = { lat, lng };
        const distanciaKm = calcularDistanciaKm(PLANTA_COORDS, destino);
        const zona = obtenerZonaEntrega(distanciaKm);

        entregaSeleccionada = {
            lat,
            lng,
            distanciaKm,
            zonaNombre: zona.nombre,
            porcentaje: zona.porcentaje
        };

        const infoEntrega = document.getElementById('infoEntrega');
        const distanciaEntrega = document.getElementById('distanciaEntrega');
        const zonaEntrega = document.getElementById('zonaEntrega');
        const porcentajeEntrega = document.getElementById('porcentajeEntrega');

        if (infoEntrega) infoEntrega.classList.remove('hidden');
        if (distanciaEntrega) distanciaEntrega.textContent = distanciaKm.toFixed(2);
        if (zonaEntrega) zonaEntrega.textContent = zona.nombre;
        if (porcentajeEntrega) porcentajeEntrega.textContent = `${(zona.porcentaje * 100).toFixed(1)}%`;

        await obtenerDireccionDesdeCoordenadas(lat, lng);

        actualizarResumen();
    }

    function calcularTotales() {
        const subtotal = cotizacion.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        const porcentajeEntrega = entregaSeleccionada ? entregaSeleccionada.porcentaje : 0;
        const costoEntrega = subtotal * porcentajeEntrega;
        const total = subtotal + costoEntrega;

        return { subtotal, costoEntrega, total, porcentajeEntrega };
    }

    function actualizarResumen() {
        const lista = document.getElementById('cotizacionLista');
        const subtotalEl = document.getElementById('subtotal');
        const navCantidad = document.getElementById('navCantidad');
        const costoEntregaEl = document.getElementById('costoEntrega');
        const totalEl = document.getElementById('total');
        const vigenciaEl = document.getElementById('vigencia');
        const folioEl = document.getElementById('folio');
        const totalContainer = document.getElementById('cotizacionTotal');

        const btnGenerar = document.getElementById('btnGenerarCot');
        const btnEnviarWA = document.getElementById('btnEnviarWA');
        const btnDescargar = document.getElementById('btnDescargar');
        const btnLimpiar = document.getElementById('btnLimpiar');

        if (!lista) return;

        lista.innerHTML = '';

        const totalProductos = cotizacion.items.reduce(
            (acc, item) => acc + item.cantidad,
            0
        );

        if (navCantidad) {
            navCantidad.textContent = totalProductos;
        }

        if (cotizacion.items.length === 0) {
            totalContainer?.classList.add('hidden');
            if (btnGenerar) btnGenerar.disabled = true;
            if (btnEnviarWA) btnEnviarWA.disabled = true;
            if (btnDescargar) btnDescargar.disabled = true;
            if (btnLimpiar) btnLimpiar.disabled = true;
            return;
        }

        cotizacion.items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cotizacion-item fade-in';

            row.innerHTML = `
                <span>${item.nombre}</span>
                <span>
                    <div class="cantidad-control">
                        <button
                            class="cantidad-btn disminuir-btn"
                            data-id="${item.id}"
                            type="button"
                        >
                            −
                        </button>

                        <input
                            type="number"
                            min="1"
                            value="${item.cantidad}"
                            class="qty-input"
                            data-id="${item.id}"
                        >

                        <button
                            class="cantidad-btn aumentar-btn"
                            data-id="${item.id}"
                            type="button"
                        >
                            +
                        </button>
                    </div>
                </span>
                <span>${formatoMoneda(item.precio)}</span>
                <span>${formatoMoneda(item.precio * item.cantidad)}</span>
                <button class="remove-btn" data-id="${item.id}" aria-label="Eliminar">×</button>
            `;

            lista.appendChild(row);
        });

        document.querySelectorAll('.disminuir-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.id);

                const item = cotizacion.items.find(i => i.id === id);

                if (!item) return;

                actualizarCantidad(id, Math.max(1, item.cantidad - 1));
            });
        });

        document.querySelectorAll('.aumentar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.id);

                const item = cotizacion.items.find(i => i.id === id);

                if (!item) return;

                actualizarCantidad(id, item.cantidad + 1);
            });
        });

        const { subtotal, costoEntrega, total } = calcularTotales();

        subtotalEl.textContent = formatoNumero(subtotal);
        costoEntregaEl.textContent = formatoNumero(costoEntrega);
        totalEl.textContent = formatoNumero(total);
        vigenciaEl.textContent = cotizacion.vigencia || '--';
        folioEl.textContent = cotizacion.folio || '--';

        totalContainer?.classList.remove('hidden');

        if (btnGenerar) btnGenerar.disabled = false;
        if (btnEnviarWA) btnEnviarWA.disabled = false;
        if (btnDescargar) btnDescargar.disabled = false;
        if (btnLimpiar) btnLimpiar.disabled = false;
    }

    function manejarCalculo(e) {
        e.preventDefault();

        const tipo = document.getElementById('tipoCalculo').value;
        const largo = parseFloat(document.getElementById('largo').value) || 0;
        const ancho = parseFloat(document.getElementById('ancho').value) || 0;
        const altoEspesor = parseFloat(document.getElementById('altoEspesor').value) || 0;
        const desperdicio = parseFloat(document.getElementById('desperdicio').value) || 0;

        const volumen = largo * ancho * altoEspesor;
        const desperdicioVol = volumen * (desperdicio / 100);
        const sugerido = volumen + desperdicioVol;

        document.getElementById('volumenEst').textContent = volumen.toFixed(2);
        document.getElementById('desperdicioEst').textContent = desperdicioVol.toFixed(2);
        document.getElementById('cantidadSugerida').textContent = sugerido.toFixed(2);
        document.getElementById('resultadoCalculo').classList.remove('hidden');

        renderizarPreviewTerreno(largo, ancho, altoEspesor, tipo);
        mostrarRecomendacion(calcularRecomendacion(largo, ancho, altoEspesor, tipo));
    }

    function mostrarModal(mensaje, modalId = 'modal') {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const msg = modal.querySelector('p');
        if (msg) msg.textContent = mensaje;

        modal.classList.remove('hidden');

        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    function cerrarModal(modalId = 'modal') {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.remove('show');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 250);
    }

    function generarCotizacion() {
        if (!cotizacion.items.length) {
            mostrarModal('Agrega al menos un producto antes de generar la cotización.');
            return;
        }

        cotizacion.folio = cotizacion.folio || generarFolio();
        cotizacion.vigencia = cotizacion.vigencia || calcularVigencia();

        actualizarResumen();

        const formContainer = document.getElementById('clienteFormContainer');
        const sidebar = document.querySelector('.cotizacion-sidebar');

        if (formContainer) {
            formContainer.classList.remove('hidden');
            if (sidebar) sidebar.classList.remove('hidden');

            setTimeout(() => {
                if (mapaEntrega) {
                    mapaEntrega.invalidateSize();
                    mapaEntrega.setView([PLANTA_COORDS.lat, PLANTA_COORDS.lng], 10);
                }
            }, 100);

            const yOffset = -125;
            const y = formContainer.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    }

    function guardarDatosCliente(e) {
        e.preventDefault();

        const aviso = document.getElementById('avisoPrivacidad');

        if (!aviso || !aviso.checked) {
            mostrarModal('Debes aceptar el aviso de privacidad para continuar.');
            return;
        }

        const nombre = document.getElementById('nombreCliente').value.trim();
        const telefono = document.getElementById('telefonoCliente').value.trim();
        const correo = document.getElementById('correoCliente').value.trim();
        const ubicacion = document.getElementById('ubicacionEntrega').value.trim();
        const tipoObra = document.getElementById('tipoObra').value.trim();
        const fechaEntrega = document.getElementById('fechaEntrega').value;
        const requiereFactura = document.getElementById('requiereFactura').value;
        const requiereBombeo = document.getElementById('requiereBombeo').value;
        const comentarios = document.getElementById('comentarios').value.trim();

        if (!nombre || !telefono || !correo || !ubicacion || !tipoObra || !fechaEntrega || !entregaSeleccionada) {
            mostrarModal('Completa todos los campos obligatorios y selecciona la ubicación de entrega en el mapa.');
            return;
        }

        const { costoEntrega, total } = calcularTotales();

        cotizacion.cliente = {
            nombre,
            telefono,
            correo,
            ubicacion,
            tipoObra,
            fechaEntrega,
            requiereFactura,
            requiereBombeo,
            comentarios,
            entregaMapa: entregaSeleccionada,
        };

        cotizacion.privacidadAceptada = true;
        cotizacion.fecha = new Date().toLocaleDateString('es-MX');
        cotizacion.entrega = costoEntrega;
        cotizacion.total = total;
        cotizacion.folio = cotizacion.folio || generarFolio();
        cotizacion.vigencia = cotizacion.vigencia || calcularVigencia();

        const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');

        cotizaciones.push({
            ...cotizacion,
            estatus: 'nueva',
            vendedor: 'Vendedor demo'
        });

        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

        mostrarModal('Datos guardados correctamente. Ya puedes descargar el PDF o enviar la cotización.');

        actualizarResumen();
    }

    function enviarWhatsApp() {
        if (!cotizacion.cliente || !cotizacion.privacidadAceptada) {
            generarCotizacion();
            mostrarModal('Primero, captura tus datos y acepta el aviso de privacidad.');
            return;
        }

        mostrarModal('Se simula el envío de la cotización por WhatsApp. En producción se conectaría con WhatsApp Business.');
    }

    function cargarImagenPDF(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async function descargarCotizacion() {
        if (!cotizacion.cliente || !cotizacion.privacidadAceptada) {
            generarCotizacion();
            mostrarModal('Primero, captura tus datos y acepta el aviso de privacidad para descargar el PDF.');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

            const { subtotal, costoEntrega, total } = calcularTotales();

            const logo = await cargarImagenPDF('img/logo3.png');

            pdf.setFillColor(255, 199, 0);
            pdf.rect(0, 0, 210, 32, 'F');

            pdf.addImage(logo, 'PNG', 14, 6, 32, 19);

            pdf.setTextColor(20, 20, 20);
            pdf.setFontSize(18);
            pdf.setFont(undefined, 'bold');
            pdf.text('CONCRETOS HIDALGO', 42, 15);

            pdf.setFontSize(9);
            pdf.setFont(undefined, 'normal');
            pdf.text('Cotización de materiales | Documento demo / mock', 42, 23);

            pdf.setFontSize(8);
            pdf.text(`Folio: ${cotizacion.folio}`, 150, 11);
            pdf.text(`Fecha: ${cotizacion.fecha}`, 150, 18);
            pdf.text(`Vigencia: ${cotizacion.vigencia}`, 150, 25);

            pdf.setFillColor(245, 170, 0);
            pdf.rect(0, 32, 210, 3, 'F');

            pdf.setFillColor(20, 20, 20);
            pdf.rect(0, 35, 210, 4, 'F');

            let y = 50;

            pdf.setTextColor(0, 38, 91);
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text('Datos de cotización', 12, y);

            y += 8;

            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            pdf.text(`Folio: ${cotizacion.folio}`, 12, y);
            pdf.text(`Fecha: ${cotizacion.fecha}`, 110, y);

            y += 6;

            pdf.text(`Vigencia: ${cotizacion.vigencia}`, 12, y);
            pdf.text(`Factura: ${cotizacion.cliente.requiereFactura}`, 110, y);

            y += 6;
            pdf.text(`Bombeo: ${cotizacion.cliente.requiereBombeo}`, 12, y);

            y += 10;

            pdf.setTextColor(0, 38, 91);
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text('Datos del cliente', 12, y);

            y += 8;

            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            pdf.text(`Nombre: ${cotizacion.cliente.nombre}`, 12, y);

            y += 6;

            pdf.text(`Teléfono: ${cotizacion.cliente.telefono}`, 12, y);
            pdf.text(`Correo: ${cotizacion.cliente.correo}`, 110, y);

            y += 6;

            pdf.text(`Ubicación: ${cotizacion.cliente.ubicacion}`, 12, y, { maxWidth: 180 });

            y += 10;

            pdf.text(`Tipo de obra: ${cotizacion.cliente.tipoObra}`, 12, y);
            pdf.text(`Entrega tentativa: ${cotizacion.cliente.fechaEntrega}`, 110, y);

            y += 12;

            const entregaMapa = cotizacion.cliente.entregaMapa;

            pdf.setTextColor(0, 38, 91);
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text('Información de entrega', 12, y);

            y += 8;

            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');

            if (entregaMapa) {
                pdf.text(`Distancia estimada: ${entregaMapa.distanciaKm.toFixed(2)} km`, 12, y);

                y += 6;

                pdf.text(`Costo de entrega: ${formatoMoneda(costoEntrega)}`, 12, y);
            }

            y += 12;

            pdf.setTextColor(0, 38, 91);
            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text('Productos cotizados', 12, y);

            y += 8;

            pdf.setFillColor(240, 242, 245);
            pdf.rect(12, y - 5, 186, 8, 'F');

            pdf.setTextColor(30, 30, 30);
            pdf.setFontSize(9);
            pdf.setFont(undefined, 'bold');
            pdf.text('Producto', 14, y);
            pdf.text('Cant.', 95, y);
            pdf.text('Unidad', 115, y);
            pdf.text('P. Unit.', 140, y);
            pdf.text('Subtotal', 168, y);

            y += 7;

            pdf.setFont(undefined, 'normal');

            cotizacion.items.forEach(item => {
                if (y > 265) {
                    pdf.addPage();
                    y = 20;
                }

                const sub = item.precio * item.cantidad;

                pdf.text(item.nombre, 14, y, { maxWidth: 75 });
                pdf.text(String(item.cantidad), 95, y);
                pdf.text(item.unidad, 115, y);
                pdf.text(formatoMoneda(item.precio), 140, y);
                pdf.text(formatoMoneda(sub), 168, y);

                y += 7;
            });

            y += 6;

            pdf.setDrawColor(220, 220, 220);
            pdf.line(12, y, 198, y);

            y += 8;

            pdf.setFont(undefined, 'bold');
            pdf.text(`Subtotal: ${formatoMoneda(subtotal)}`, 120, y);

            y += 6;

            pdf.text(`Entrega estimada: ${formatoMoneda(costoEntrega)}`, 120, y);

            y += 12;

            pdf.setFillColor(245, 245, 245);
            pdf.roundedRect(118, y - 8, 80, 18, 2, 2, 'F');

            pdf.setTextColor(20, 20, 20);
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            pdf.text('TOTAL ESTIMADO', 123, y - 1);

            pdf.setFontSize(14);
            pdf.setFont(undefined, 'bold');
            pdf.text(formatoMoneda(total), 123, y + 6);

            y += 18;

            pdf.setTextColor(90, 90, 90);
            pdf.setFontSize(8);
            pdf.setFont(undefined, 'normal');
            pdf.text(
                'Esta cotización es una demo comercial con datos ficticios. Los precios, productos, costos de entrega y recomendaciones son referenciales y deben validarse con un especialista de Concretos Hidalgo.',
                12,
                y,
                { maxWidth: 185 }
            );

            y += 12;

            pdf.text(
                'Aviso de privacidad: el cliente confirma que aceptó el uso de sus datos proporcionados exclusivamente para fines de contacto, seguimiento comercial y generación de esta cotización demo.',
                12,
                y,
                { maxWidth: 185 }
            );

            pdf.save(`cotizacion_${cotizacion.folio}.pdf`);
        } catch (error) {
            console.error(error);
            mostrarModal('No se pudo generar el PDF. Revisa que tengas conexión a internet para cargar jsPDF.');
        }
    }

    function limpiarCotizacion() {
        cotizacion = {
            items: [],
            cliente: null,
            privacidadAceptada: false,
            folio: null,
            fecha: null,
            vigencia: null,
            entrega: null,
            total: null
        };

        const clienteForm = document.getElementById('clienteForm');
        const formContainer = document.getElementById('clienteFormContainer');
        const sidebar = document.querySelector('.cotizacion-sidebar');

        if (clienteForm) clienteForm.reset();
        if (formContainer) formContainer.classList.add('hidden');
        if (sidebar) sidebar.classList.add('hidden');

        actualizarResumen();
    }

    function cargarCotizacionesPanel() {
        const tabla = document.getElementById('tablaCotizaciones');
        if (!tabla) return;

        const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');

        tabla.innerHTML = '';

        let countDia = 0;
        let montoTotal = 0;
        let pendientes = 0;
        let cerradas = 0;

        const hoy = new Date().toLocaleDateString('es-MX');

        cotizaciones.forEach((c, index) => {
            if (c.fecha === hoy) countDia += 1;
            montoTotal += c.total || 0;

            if (c.estatus === 'nueva' || c.estatus === 'en seguimiento') {
                pendientes += 1;
            }

            if (c.estatus === 'cerrada') {
                cerradas += 1;
            }

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${c.folio || '--'}</td>
                <td>${c.cliente ? c.cliente.nombre : '--'}</td>
                <td>${formatoMoneda(c.total || 0)}</td>
                <td>${c.estatus || 'nueva'}</td>
                <td>${c.fecha || '--'}</td>
                <td>
                    <button class="action-btn view" data-index="${index}">Ver</button>
                    <button class="action-btn follow" data-index="${index}">Dar seguimiento</button>
                    <button class="action-btn close" data-index="${index}">Marcar como cerrada</button>
                </td>
            `;

            tabla.appendChild(tr);
        });

        const metricCount = document.getElementById('metricCount');
        const metricMonto = document.getElementById('metricMonto');
        const metricPendientes = document.getElementById('metricPendientes');
        const metricConversion = document.getElementById('metricConversion');

        if (metricCount) metricCount.textContent = countDia;
        if (metricMonto) metricMonto.textContent = formatoMoneda(montoTotal);
        if (metricPendientes) metricPendientes.textContent = pendientes;

        const conversion = cotizaciones.length > 0
            ? Math.round((cerradas / cotizaciones.length) * 100)
            : 0;

        if (metricConversion) metricConversion.textContent = conversion + '%';
    }

    function manejarAccionPanel(e) {
        const btn = e.target;

        if (!btn.classList.contains('action-btn')) return;

        const index = parseInt(btn.getAttribute('data-index'), 10);
        const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
        const cot = cotizaciones[index];

        if (!cot) return;

        if (btn.classList.contains('view')) {
            let detalle = `Folio: ${cot.folio || '--'}\n`;
            detalle += `Cliente: ${cot.cliente?.nombre || '--'}\n`;
            detalle += `Teléfono: ${cot.cliente?.telefono || '--'}\n`;
            detalle += `Total: ${formatoMoneda(cot.total || 0)}\n`;
            detalle += `Estatus: ${cot.estatus || 'nueva'}\n\n`;
            detalle += 'Productos:\n';

            cot.items.forEach(item => {
                detalle += `- ${item.nombre} x ${item.cantidad} ${item.unidad}\n`;
            });

            mostrarModal(detalle, 'adminModal');
        }

        if (btn.classList.contains('follow')) {
            cot.estatus = 'en seguimiento';
            localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
            cargarCotizacionesPanel();
        }

        if (btn.classList.contains('close')) {
            cot.estatus = 'cerrada';
            localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
            cargarCotizacionesPanel();
        }
    }

    function configurarMenuMovil() {
        const btn = document.getElementById('mobileMenuBtn');
        const navList = document.getElementById('navList');

        if (btn && navList) {
            btn.addEventListener('click', () => {
                navList.classList.toggle('open');
            });
        }

        const btnAdmin = document.getElementById('mobileMenuBtnAdmin');
        const navListAdmin = document.getElementById('navListAdmin');

        if (btnAdmin && navListAdmin) {
            btnAdmin.addEventListener('click', () => {
                navListAdmin.classList.toggle('open');
            });
        }
    }

    function inicializarMapaEntrega() {
        const mapaEl = document.getElementById('mapaEntrega');

        const redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',

            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        if (!mapaEl || typeof L === 'undefined') return;

        mapaEntrega = L.map(mapaEl, {
            zoomControl: true,
            preferCanvas: true
        }).setView([PLANTA_COORDS.lat, PLANTA_COORDS.lng], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(mapaEntrega);

        requestAnimationFrame(() => {
            mapaEntrega.invalidateSize();
            mapaEntrega.setView([PLANTA_COORDS.lat, PLANTA_COORDS.lng], 10);
        });

        L.marker([PLANTA_COORDS.lat, PLANTA_COORDS.lng], {
            icon: redIcon
        })
            .addTo(mapaEntrega)
            .bindPopup('Planta/Fábrica');

        marcadorEntrega = L.marker([PLANTA_COORDS.lat, PLANTA_COORDS.lng], {
            draggable: true
        }).addTo(mapaEntrega);

        marcadorEntrega.bindPopup('Ubicación de entrega').openPopup();

        mapaEntrega.on('click', e => {
            marcadorEntrega.setLatLng(e.latlng);
            actualizarEntregaDesdeCoordenadas(e.latlng.lat, e.latlng.lng);
        });

        marcadorEntrega.on('dragend', e => {
            const pos = e.target.getLatLng();
            actualizarEntregaDesdeCoordenadas(pos.lat, pos.lng);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        configurarMenuMovil();
        cargarProductos();
        actualizarResumen();
        cargarCotizacionesPanel();
        inicializarMapaEntrega();

        ['filterTipo', 'filterUnidad', 'filterResistencia', 'filterUso', 'searchProducto'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', cargarProductos);
        });

        const grid = document.getElementById('productGrid');

        if (grid) {
            grid.addEventListener('click', e => {
                if (e.target.classList.contains('add-btn')) {
                    const id = parseInt(e.target.getAttribute('data-id'), 10);
                    agregarProducto(id);
                }
            });
        }

        const listaCot = document.getElementById('cotizacionLista');

        if (listaCot) {
            listaCot.addEventListener('input', e => {
                if (e.target.classList.contains('qty-input')) {
                    const id = parseInt(e.target.getAttribute('data-id'), 10);
                    const valor = parseInt(e.target.value, 10);
                    actualizarCantidad(id, valor);
                }
            });

            listaCot.addEventListener('click', e => {
                if (e.target.classList.contains('remove-btn')) {
                    const id = parseInt(e.target.getAttribute('data-id'), 10);
                    eliminarItem(id);
                }
            });
        }

        const calcForm = document.getElementById('calcForm');
        if (calcForm) calcForm.addEventListener('submit', manejarCalculo);

        const btnGenerar = document.getElementById('btnGenerarCot');
        if (btnGenerar) btnGenerar.addEventListener('click', generarCotizacion);

        const btnEnviarWA = document.getElementById('btnEnviarWA');
        if (btnEnviarWA) btnEnviarWA.addEventListener('click', enviarWhatsApp);

        const btnDescargar = document.getElementById('btnDescargar');
        if (btnDescargar) btnDescargar.addEventListener('click', descargarCotizacion);

        const btnLimpiar = document.getElementById('btnLimpiar');
        if (btnLimpiar) btnLimpiar.addEventListener('click', limpiarCotizacion);

        const clienteForm = document.getElementById('clienteForm');
        if (clienteForm) clienteForm.addEventListener('submit', guardarDatosCliente);

        const modal = document.getElementById('modal');
        const modalClose = document.getElementById('modalClose');

        if (modal && modalClose) {
            modalClose.addEventListener('click', () => cerrarModal('modal'));

            modal.addEventListener('click', e => {
                if (e.target === modal) cerrarModal('modal');
            });
        }

        const contactModal = document.getElementById('contactModal');
        const contactClose = document.getElementById('contactModalClose');

        if (contactModal && contactClose) {
            contactClose.addEventListener('click', () => cerrarModal('contactModal'));

            contactModal.addEventListener('click', e => {
                if (e.target === contactModal) cerrarModal('contactModal');
            });
        }

        const btnContactar = document.getElementById('btnContactar');

        if (btnContactar) {
            btnContactar.addEventListener('click', () => {
                const modalContacto = document.getElementById('contactModal');
                if (!modalContacto) return;

                modalContacto.classList.remove('hidden');

                requestAnimationFrame(() => {
                    modalContacto.classList.add('show');
                });
            });
        }

        const tabla = document.getElementById('tablaCotizaciones');
        if (tabla) tabla.addEventListener('click', manejarAccionPanel);
    });
})();