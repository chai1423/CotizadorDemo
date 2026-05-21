(function () {
    'use strict';

    const productos = [
        {
            id: 1,
            nombre: 'Concreto premezclado',
            categoria: 'Concreto',
            unidad: 'm³',
            precio: 1200,
            usos: ['losa', 'firme', 'cimentación', 'pavimento'],
            descripcion: 'Concreto premezclado para obras generales.'
        },
        {
            id: 2,
            nombre: 'Cemento',
            categoria: 'Cemento',
            unidad: 'bulto',
            precio: 200,
            usos: ['cimentación', 'muro', 'piso'],
            descripcion: 'Cemento gris de alta resistencia.'
        },
        {
            id: 3,
            nombre: 'Arena',
            categoria: 'Agregados',
            unidad: 'tonelada',
            precio: 350,
            usos: ['relleno', 'mortero', 'concreto'],
            descripcion: 'Arena lavada para construcción.'
        },
        {
            id: 4,
            nombre: 'Grava',
            categoria: 'Agregados',
            unidad: 'tonelada',
            precio: 450,
            usos: ['concreto', 'relleno'],
            descripcion: 'Grava de 3/4” para mezclas.'
        },
        {
            id: 5,
            nombre: 'Mortero',
            categoria: 'Cemento',
            unidad: 'bulto',
            precio: 180,
            usos: ['muro', 'piso'],
            descripcion: 'Mortero para pegar block y ladrillo.'
        },
        {
            id: 6,
            nombre: 'Base hidráulica',
            categoria: 'Agregados',
            unidad: 'tonelada',
            precio: 300,
            usos: ['pavimento', 'firme'],
            descripcion: 'Material de base para obras viales.'
        },
        {
            id: 7,
            nombre: 'Tezontle',
            categoria: 'Agregados',
            unidad: 'tonelada',
            precio: 280,
            usos: ['relleno', 'drenaje'],
            descripcion: 'Piedra rojiza para rellenos y jardinería.'
        },
        {
            id: 8,
            nombre: 'Bombeo de concreto',
            categoria: 'Servicios',
            unidad: 'servicio',
            precio: 800,
            usos: ['concreto'],
            descripcion: 'Servicio de bombeo para obras de concreto.'
        },
        {
            id: 9,
            nombre: 'Aditivos',
            categoria: 'Aditivos',
            unidad: 'litro',
            precio: 120,
            usos: ['concreto'],
            descripcion: 'Aditivos para mejorar las propiedades del concreto.'
        }
    ];

    let cotizacion = {
        items: [],
        cliente: null,
        folio: null,
        fecha: null,
        vigencia: null,
        entrega: null,
        total: null
    };

    function formatoMoneda(valor) {
        return valor.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2
        });
    }

    function generarFolio() {
        return 'COT-' + Math.floor(100000 + Math.random() * 900000).toString();
    }

    function calcularVigencia() {
        const hoy = new Date();
        const vigencia = new Date(hoy);
        vigencia.setDate(hoy.getDate() + 7);
        return vigencia.toLocaleDateString('es-MX');
    }

    function obtenerNombreTipo(tipo) {
        const tipos = {
            losa: 'Losa / Firme',
            muro: 'Muro',
            relleno: 'Relleno',
            zapata: 'Zapata / Cimentación'
        };

        return tipos[tipo] || 'Elemento';
    }

    function cargarProductos() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;

        grid.innerHTML = '';

        const tipo = document.getElementById('filterTipo')?.value || '';
        const unidad = document.getElementById('filterUnidad')?.value || '';
        const uso = document.getElementById('filterUso')?.value || '';
        const busqueda = document.getElementById('searchProducto')?.value.toLowerCase() || '';

        const filtrados = productos.filter((producto) => {
            const coincideTipo = tipo ? producto.categoria === tipo : true;
            const coincideUnidad = unidad ? producto.unidad === unidad : true;
            const coincideUso = uso ? producto.usos.includes(uso) : true;
            const coincideBusqueda = busqueda ? producto.nombre.toLowerCase().includes(busqueda) : true;

            return coincideTipo && coincideUnidad && coincideUso && coincideBusqueda;
        });

        if (filtrados.length === 0) {
            grid.innerHTML = `
                <div class="product-card">
                    <h3>Sin resultados</h3>
                    <p>No encontramos productos con esos filtros.</p>
                </div>
            `;
            return;
        }

        filtrados.forEach((producto) => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';

            card.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p class="product-info">Categoría: ${producto.categoria} | Unidad: ${producto.unidad}</p>
                <p>${producto.descripcion}</p>
                <p class="price">${formatoMoneda(producto.precio)}</p>
                <button class="btn primary add-btn" data-id="${producto.id}">
                    Agregar a cotización
                </button>
            `;

            grid.appendChild(card);
        });
    }

    function agregarProducto(id) {
        const producto = productos.find((p) => p.id === id);
        if (!producto) return;

        const existente = cotizacion.items.find((item) => item.id === id);

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
        cotizacion.items = cotizacion.items.filter((item) => item.id !== id);
        actualizarResumen();
    }

    function actualizarCantidad(id, nuevaCantidad) {
        const item = cotizacion.items.find((it) => it.id === id);

        if (item) {
            item.cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
        }

        actualizarResumen();
    }

    function calcularTotales() {
        let subtotal = 0;

        cotizacion.items.forEach((item) => {
            subtotal += item.precio * item.cantidad;
        });

        const costoEntrega = subtotal * 0.05;
        const total = subtotal + costoEntrega;

        return {
            subtotal,
            costoEntrega,
            total
        };
    }

    function actualizarResumen() {
        const lista = document.getElementById('cotizacionLista');
        const subtotalEl = document.getElementById('subtotal');
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

        if (cotizacion.items.length === 0) {
            totalContainer?.classList.add('hidden');

            if (btnGenerar) btnGenerar.disabled = true;
            if (btnEnviarWA) btnEnviarWA.disabled = true;
            if (btnDescargar) btnDescargar.disabled = true;
            if (btnLimpiar) btnLimpiar.disabled = true;

            return;
        }

        cotizacion.items.forEach((item) => {
            const li = document.createElement('div');
            li.className = 'cotizacion-item fade-in';

            li.innerHTML = `
                <span><strong>${item.nombre}</strong></span>
                <span>
                    <input type="number" min="1" value="${item.cantidad}" class="qty-input" data-id="${item.id}">
                    ${item.unidad}
                </span>
                <span>${formatoMoneda(item.precio)}</span>
                <span>${formatoMoneda(item.precio * item.cantidad)}</span>
                <button class="remove-btn" data-id="${item.id}" aria-label="Eliminar">×</button>
            `;

            lista.appendChild(li);
        });

        const { subtotal, costoEntrega, total } = calcularTotales();

        if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
        if (costoEntregaEl) costoEntregaEl.textContent = costoEntrega.toFixed(2);
        if (totalEl) totalEl.textContent = total.toFixed(2);
        if (vigenciaEl) vigenciaEl.textContent = cotizacion.vigencia || '--';
        if (folioEl) folioEl.textContent = cotizacion.folio || '--';

        totalContainer?.classList.remove('hidden');

        if (btnGenerar) btnGenerar.disabled = false;
        if (btnEnviarWA) btnEnviarWA.disabled = false;
        if (btnDescargar) btnDescargar.disabled = false;
        if (btnLimpiar) btnLimpiar.disabled = false;
    }

    function renderizarPreviewTerreno(largo, ancho, espesor, tipo) {
        const canvas = document.getElementById('terrenoCanvas');
        const previewContainer = document.getElementById('previewTerreno');

        if (!canvas || !previewContainer) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        previewContainer.classList.remove('hidden');

        const area = largo * ancho;
        const volumen = area * espesor;

        document.getElementById('previewTipo').textContent = obtenerNombreTipo(tipo);
        document.getElementById('previewLargo').textContent = largo.toFixed(2);
        document.getElementById('previewAncho').textContent = ancho.toFixed(2);
        document.getElementById('previewEspesor').textContent = espesor.toFixed(2);
        document.getElementById('previewArea').textContent = area.toFixed(2);
        document.getElementById('previewVolumen').textContent = volumen.toFixed(2);

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, w, h);

        dibujarGrid(ctx, w, h);

        ctx.fillStyle = '#00265b';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Previsualización: ${obtenerNombreTipo(tipo)}`, 24, 34);

        const padding = 70;
        const areaX = padding;
        const areaY = 70;
        const areaW = w - padding * 2;
        const areaH = h - 135;

        const largoSeguro = Math.max(largo, 1);
        const anchoSeguro = Math.max(ancho, 1);

        let dibujoLargo = largoSeguro;
        let dibujoAncho = anchoSeguro;

        if (tipo === 'muro') {
            dibujoLargo = largoSeguro;
            dibujoAncho = Math.max(espesor * 8, anchoSeguro);
        }

        const escala = Math.min(areaW / dibujoLargo, areaH / dibujoAncho);

        const dibujoW = dibujoLargo * escala;
        const dibujoH = dibujoAncho * escala;

        const rectX = areaX + (areaW - dibujoW) / 2;
        const rectY = areaY + (areaH - dibujoH) / 2;

        let colorRelleno = '#dbeafe';
        let colorBorde = '#1d4ed8';
        let colorSombra = 'rgba(29, 78, 216, 0.16)';

        if (tipo === 'relleno') {
            colorRelleno = '#fef3c7';
            colorBorde = '#d97706';
            colorSombra = 'rgba(217, 119, 6, 0.18)';
        }

        if (tipo === 'zapata') {
            colorRelleno = '#e5e7eb';
            colorBorde = '#374151';
            colorSombra = 'rgba(55, 65, 81, 0.16)';
        }

        if (tipo === 'muro') {
            colorRelleno = '#fee2e2';
            colorBorde = '#dc2626';
            colorSombra = 'rgba(220, 38, 38, 0.15)';
        }

        ctx.fillStyle = colorSombra;
        ctx.fillRect(rectX + 10, rectY + 10, dibujoW, dibujoH);

        if (tipo === 'zapata') {
            dibujarZapata(ctx, rectX, rectY, dibujoW, dibujoH, colorRelleno, colorBorde);
        } else {
            dibujarRectanguloPrincipal(ctx, rectX, rectY, dibujoW, dibujoH, colorRelleno, colorBorde);
        }

        if (tipo === 'relleno') {
            dibujarTexturaRelleno(ctx, rectX, rectY, dibujoW, dibujoH);
        }

        dibujarDimensiones(ctx, rectX, rectY, dibujoW, dibujoH, largo, ancho, tipo);

        ctx.fillStyle = '#00265b';
        ctx.font = 'bold 15px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Altura/Espesor: ${espesor.toFixed(2)} m`, 24, h - 28);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';

        const textoCentro = `${area.toFixed(2)} m² aprox.`;
        ctx.fillText(textoCentro, rectX + dibujoW / 2, rectY + dibujoH / 2);

        ctx.fillStyle = '#475569';
        ctx.font = '13px Arial';
        ctx.fillText(`Volumen preliminar: ${volumen.toFixed(2)} m³`, rectX + dibujoW / 2, rectY + dibujoH / 2 + 24);
    }

    function dibujarGrid(ctx, w, h) {
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
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

    function dibujarRectanguloPrincipal(ctx, x, y, w, h, fill, stroke) {
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath();
        ctx.roundRect(x + 8, y + 8, Math.max(w - 16, 0), Math.max(h * 0.22, 8), 6);
        ctx.fill();
    }

    function dibujarZapata(ctx, x, y, w, h, fill, stroke) {
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 3;

        const topInset = Math.min(w * 0.12, 36);

        ctx.beginPath();
        ctx.moveTo(x + topInset, y);
        ctx.lineTo(x + w - topInset, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.28)';
        ctx.beginPath();
        ctx.moveTo(x + topInset + 8, y + 10);
        ctx.lineTo(x + w - topInset - 8, y + 10);
        ctx.lineTo(x + w - 20, y + h * 0.32);
        ctx.lineTo(x + 20, y + h * 0.32);
        ctx.closePath();
        ctx.fill();
    }

    function dibujarTexturaRelleno(ctx, x, y, w, h) {
        ctx.save();
        ctx.strokeStyle = 'rgba(146, 64, 14, 0.28)';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < 18; i++) {
            const px = x + Math.random() * w;
            const py = y + Math.random() * h;

            ctx.beginPath();
            ctx.arc(px, py, 2 + Math.random() * 3, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }

    function dibujarDimensiones(ctx, x, y, w, h, largo, ancho, tipo) {
        ctx.save();

        ctx.strokeStyle = '#111827';
        ctx.fillStyle = '#111827';
        ctx.lineWidth = 1.5;
        ctx.font = '16px Arial';

        ctx.beginPath();
        ctx.moveTo(x, y + h + 22);
        ctx.lineTo(x + w, y + h + 22);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y + h + 15);
        ctx.lineTo(x, y + h + 29);
        ctx.moveTo(x + w, y + h + 15);
        ctx.lineTo(x + w, y + h + 29);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillText(`Largo: ${largo.toFixed(2)} m`, x + w / 2, y + h + 48);

        ctx.beginPath();
        ctx.moveTo(x - 24, y);
        ctx.lineTo(x - 24, y + h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 31, y);
        ctx.lineTo(x - 17, y);
        ctx.moveTo(x - 31, y + h);
        ctx.lineTo(x - 17, y + h);
        ctx.stroke();

        ctx.save();
        ctx.translate(x - 43, y + h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';

        const etiquetaVertical = tipo === 'muro'
            ? `Ancho/Base: ${ancho.toFixed(2)} m`
            : `Ancho: ${ancho.toFixed(2)} m`;

        ctx.fillText(etiquetaVertical, 0, 0);
        ctx.restore();

        ctx.restore();
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
    }

    function mostrarModal(mensaje, modalId = 'modal') {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const msgEl = modal.querySelector('p');
        if (msgEl) msgEl.textContent = mensaje;

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
        cotizacion.folio = cotizacion.folio || generarFolio();
        cotizacion.vigencia = cotizacion.vigencia || calcularVigencia();

        actualizarResumen();

        const formContainer = document.getElementById('clienteFormContainer');

        if (formContainer) {
            formContainer.classList.remove('hidden');
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function guardarDatosCliente(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombreCliente').value;
        const telefono = document.getElementById('telefonoCliente').value;
        const correo = document.getElementById('correoCliente').value;
        const ubicacion = document.getElementById('ubicacionEntrega').value;
        const tipoObra = document.getElementById('tipoObra').value;
        const fechaEntrega = document.getElementById('fechaEntrega').value;
        const requiereFactura = document.getElementById('requiereFactura').value;
        const comentarios = document.getElementById('comentarios').value;

        cotizacion.cliente = {
            nombre,
            telefono,
            correo,
            ubicacion,
            tipoObra,
            fechaEntrega,
            requiereFactura,
            comentarios
        };

        cotizacion.fecha = new Date().toLocaleDateString('es-MX');

        const { costoEntrega, total } = calcularTotales();

        cotizacion.entrega = costoEntrega;
        cotizacion.total = total;

        const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');

        cotizaciones.push({
            ...cotizacion,
            estatus: 'nueva',
            vendedor: 'Vendedor demo'
        });

        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

        mostrarModal('¡Cotización guardada! Revisa el panel interno para verla.');

        cotizacion = {
            items: [],
            cliente: null,
            folio: null,
            fecha: null,
            vigencia: null,
            entrega: null,
            total: null
        };

        document.getElementById('clienteForm').reset();
        document.getElementById('clienteFormContainer').classList.add('hidden');

        actualizarResumen();
    }

    function enviarWhatsApp() {
        mostrarModal('Se simula el envío de la cotización por WhatsApp. En una versión real se conectaría con WhatsApp Business o CRM.');
    }

    function descargarCotizacion() {
        const folio = cotizacion.folio || generarFolio();
        const vigencia = cotizacion.vigencia || calcularVigencia();

        let contenido = 'Cotización Demo\n';
        contenido += `Folio: ${folio}\n`;
        contenido += `Vigencia: ${vigencia}\n`;
        contenido += '\nProductos:\n';

        cotizacion.items.forEach((item) => {
            contenido += `- ${item.nombre} | Cantidad: ${item.cantidad} ${item.unidad} | Precio unitario: ${formatoMoneda(item.precio)} | Subtotal: ${formatoMoneda(item.precio * item.cantidad)}\n`;
        });

        const { subtotal, costoEntrega, total } = calcularTotales();

        contenido += `\nSubtotal: ${formatoMoneda(subtotal)}\n`;
        contenido += `Costo de entrega: ${formatoMoneda(costoEntrega)}\n`;
        contenido += `Total estimado: ${formatoMoneda(total)}\n`;
        contenido += '\nNota: Esta cotización es una demo comercial con datos ficticios.\n';

        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `cotizacion_${folio}.txt`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    function limpiarCotizacion() {
        cotizacion = {
            items: [],
            cliente: null,
            folio: null,
            fecha: null,
            vigencia: null,
            entrega: null,
            total: null
        };

        const formContainer = document.getElementById('clienteFormContainer');
        if (formContainer) formContainer.classList.add('hidden');

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

        cotizaciones.forEach((cotizacionGuardada, index) => {
            if (cotizacionGuardada.fecha === hoy) countDia++;

            montoTotal += cotizacionGuardada.total || 0;

            if (
                cotizacionGuardada.estatus === 'nueva' ||
                cotizacionGuardada.estatus === 'en seguimiento'
            ) {
                pendientes++;
            }

            if (cotizacionGuardada.estatus === 'cerrada') {
                cerradas++;
            }

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${cotizacionGuardada.folio || '--'}</td>
                <td>${cotizacionGuardada.cliente ? cotizacionGuardada.cliente.nombre : '--'}</td>
                <td>${formatoMoneda(cotizacionGuardada.total || 0)}</td>
                <td>${cotizacionGuardada.estatus || 'nueva'}</td>
                <td>${cotizacionGuardada.fecha || '--'}</td>
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
            let detalle = `Folio: ${cot.folio}\n`;
            detalle += `Cliente: ${cot.cliente?.nombre || '--'}\n`;
            detalle += `Teléfono: ${cot.cliente?.telefono || '--'}\n`;
            detalle += `Total: ${formatoMoneda(cot.total || 0)}\n`;
            detalle += `Estatus: ${cot.estatus}\n`;
            detalle += `Vendedor: ${cot.vendedor || 'Vendedor demo'}\n`;
            detalle += '\nProductos:\n';

            cot.items.forEach((item) => {
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

    function configurarPreviewEnVivo() {
        const camposPreview = [
            'tipoCalculo',
            'largo',
            'ancho',
            'altoEspesor'
        ];

        camposPreview.forEach((id) => {
            const el = document.getElementById(id);

            if (!el) return;

            el.addEventListener('input', () => {
                const tipo = document.getElementById('tipoCalculo').value;
                const largo = parseFloat(document.getElementById('largo').value) || 0;
                const ancho = parseFloat(document.getElementById('ancho').value) || 0;
                const altoEspesor = parseFloat(document.getElementById('altoEspesor').value) || 0;

                if (largo > 0 && ancho > 0 && altoEspesor > 0) {
                    renderizarPreviewTerreno(largo, ancho, altoEspesor, tipo);
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        configurarMenuMovil();
        cargarProductos();
        actualizarResumen();
        cargarCotizacionesPanel();
        configurarPreviewEnVivo();

        ['filterTipo', 'filterUnidad', 'filterUso', 'searchProducto'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', cargarProductos);
        });

        const grid = document.getElementById('productGrid');

        if (grid) {
            grid.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-btn')) {
                    const id = parseInt(e.target.getAttribute('data-id'), 10);
                    agregarProducto(id);
                }
            });
        }

        const listaCot = document.getElementById('cotizacionLista');

        if (listaCot) {
            listaCot.addEventListener('input', (e) => {
                if (e.target.classList.contains('qty-input')) {
                    const id = parseInt(e.target.getAttribute('data-id'), 10);
                    const valor = parseInt(e.target.value, 10);

                    actualizarCantidad(id, valor);
                }
            });

            listaCot.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-btn')) {
                    const id = parseInt(e.target.getAttribute('data-id'), 10);
                    eliminarItem(id);
                }
            });
        }

        const calcForm = document.getElementById('calcForm');

        if (calcForm) {
            calcForm.addEventListener('submit', manejarCalculo);
        }

        const btnGenerar = document.getElementById('btnGenerarCot');
        if (btnGenerar) btnGenerar.addEventListener('click', generarCotizacion);

        const btnEnviarWA = document.getElementById('btnEnviarWA');
        if (btnEnviarWA) btnEnviarWA.addEventListener('click', enviarWhatsApp);

        const btnDescargar = document.getElementById('btnDescargar');
        if (btnDescargar) btnDescargar.addEventListener('click', descargarCotizacion);

        const btnLimpiar = document.getElementById('btnLimpiar');
        if (btnLimpiar) btnLimpiar.addEventListener('click', limpiarCotizacion);

        const clienteForm = document.getElementById('clienteForm');

        if (clienteForm) {
            clienteForm.addEventListener('submit', guardarDatosCliente);
        }

        const modal = document.getElementById('modal');
        const modalClose = document.getElementById('modalClose');

        if (modal && modalClose) {
            modalClose.addEventListener('click', () => cerrarModal('modal'));

            modal.addEventListener('click', (e) => {
                if (e.target === modal) cerrarModal('modal');
            });
        }

        const adminModal = document.getElementById('adminModal');
        const adminModalClose = document.getElementById('adminModalClose');

        if (adminModal) {
            if (adminModalClose) {
                adminModalClose.addEventListener('click', () => cerrarModal('adminModal'));
            }

            adminModal.addEventListener('click', (e) => {
                if (e.target === adminModal) cerrarModal('adminModal');
            });
        }

        const tabla = document.getElementById('tablaCotizaciones');

        if (tabla) {
            tabla.addEventListener('click', manejarAccionPanel);
        }
    });
})();