(function () {
    'use strict';

    const VENDEDORES_DEMO = [
        'Ana Martínez',
        'Carlos Pérez',
        'Sofía Hernández',
        'Luis Ramírez'
    ];

    const ESTATUS = ['nueva', 'en seguimiento', 'cerrada', 'perdida'];

    function obtenerCotizaciones() {
        try {
            const data = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error al leer cotizaciones:', error);
            return [];
        }
    }

    function guardarCotizaciones(cotizaciones) {
        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
    }

    function formatoMoneda(valor) {
        return Number(valor || 0).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
    }

    function normalizarTexto(texto) {
        return String(texto || '').toLowerCase().trim();
    }

    function generarFechaDiasAtras(dias) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - dias);
        return fecha.toLocaleDateString('es-MX');
    }

    function cargarCotizacionesDemo() {
        const existentes = obtenerCotizaciones();

        if (existentes.length > 0) {
            return;
        }

        const demo = [
            {
                folio: 'DEMO-001',
                cliente: {
                    nombre: 'Constructora San Miguel',
                    telefono: '5578201943',
                    correo: 'compras@sanmiguel.com',
                    ubicacion: 'Tula de Allende, Hidalgo',
                    tipoObra: 'Cimentación',
                    fechaEntrega: generarFechaDiasAtras(1),
                    comentarios: 'Requiere entrega matutina.'
                },
                fecha: generarFechaDiasAtras(1),
                total: 53200,
                estatus: 'nueva',
                vendedor: 'Ana Martínez',
                comentarios: 'Cliente interesado en compra recurrente.',
                items: [
                    { nombre: "Concreto f’c 250 kg/cm²", cantidad: 18, unidad: 'm³', precio: 1900 },
                    { nombre: 'Servicio de bombeo', cantidad: 1, unidad: 'servicio', precio: 1200 }
                ]
            },
            {
                folio: 'DEMO-002',
                cliente: {
                    nombre: 'Grupo Obra Norte',
                    telefono: '5512348765',
                    correo: 'contacto@obranorte.com',
                    ubicacion: 'Atitalaquia, Hidalgo',
                    tipoObra: 'Losa residencial',
                    fechaEntrega: generarFechaDiasAtras(2),
                    comentarios: 'Solicita factura.'
                },
                fecha: generarFechaDiasAtras(2),
                total: 38450,
                estatus: 'en seguimiento',
                vendedor: 'Carlos Pérez',
                comentarios: 'Enviar propuesta con descuento por volumen.',
                items: [
                    { nombre: "Concreto f’c 200 kg/cm²", cantidad: 20, unidad: 'm³', precio: 1700 },
                    { nombre: 'Transporte y descarga', cantidad: 3, unidad: 'servicio', precio: 650 }
                ]
            },
            {
                folio: 'DEMO-003',
                cliente: {
                    nombre: 'Residencial Alameda',
                    telefono: '5588123012',
                    correo: 'ventas@alameda.mx',
                    ubicacion: 'Pachuca, Hidalgo',
                    tipoObra: 'Banquetas y andadores',
                    fechaEntrega: generarFechaDiasAtras(3),
                    comentarios: 'Comparando proveedores.'
                },
                fecha: generarFechaDiasAtras(3),
                total: 24700,
                estatus: 'cerrada',
                vendedor: 'Sofía Hernández',
                comentarios: 'Cierre confirmado. Programar entrega.',
                items: [
                    { nombre: "Concreto f’c 150 kg/cm²", cantidad: 12, unidad: 'm³', precio: 1500 },
                    { nombre: 'Concreto estampado', cantidad: 2, unidad: 'm³', precio: 2500 },
                    { nombre: 'Transporte y descarga', cantidad: 1, unidad: 'servicio', precio: 650 }
                ]
            },
            {
                folio: 'DEMO-004',
                cliente: {
                    nombre: 'Ingeniería Delta',
                    telefono: '5566710021',
                    correo: 'proyectos@delta.com',
                    ubicacion: 'Tepeji del Río, Hidalgo',
                    tipoObra: 'Piso industrial',
                    fechaEntrega: generarFechaDiasAtras(4),
                    comentarios: 'Requiere resistencia alta.'
                },
                fecha: generarFechaDiasAtras(4),
                total: 91200,
                estatus: 'perdida',
                vendedor: 'Luis Ramírez',
                comentarios: 'Cliente eligió proveedor con menor precio.',
                items: [
                    { nombre: "Concreto f’c 350 kg/cm²", cantidad: 35, unidad: 'm³', precio: 2350 },
                    { nombre: 'Fibra de acero', cantidad: 20, unidad: 'kg', precio: 150 },
                    { nombre: 'Renta de bomba pluma', cantidad: 1, unidad: 'servicio', precio: 6500 }
                ]
            },
            {
                folio: 'DEMO-005',
                cliente: {
                    nombre: 'Arquitectura Nova',
                    telefono: '5533019485',
                    correo: 'hola@arquitecturanova.mx',
                    ubicacion: 'Querétaro, Qro.',
                    tipoObra: 'Terraza decorativa',
                    fechaEntrega: generarFechaDiasAtras(5),
                    comentarios: 'Busca acabado decorativo.'
                },
                fecha: generarFechaDiasAtras(5),
                total: 18900,
                estatus: 'nueva',
                vendedor: 'Ana Martínez',
                comentarios: 'Pendiente llamada de diagnóstico.',
                items: [
                    { nombre: 'Concreto estampado', cantidad: 6, unidad: 'm³', precio: 2500 },
                    { nombre: 'Pigmento negro', cantidad: 10, unidad: 'kg', precio: 90 },
                    { nombre: 'Aplicación de curador', cantidad: 1, unidad: 'servicio', precio: 1500 }
                ]
            },
            {
                folio: 'DEMO-006',
                cliente: {
                    nombre: 'Desarrollos Altavista',
                    telefono: '5599051122',
                    correo: 'compras@altavista.mx',
                    ubicacion: 'CDMX',
                    tipoObra: 'Edificio habitacional',
                    fechaEntrega: generarFechaDiasAtras(6),
                    comentarios: 'Cotización para primera etapa.'
                },
                fecha: generarFechaDiasAtras(6),
                total: 128750,
                estatus: 'en seguimiento',
                vendedor: 'Carlos Pérez',
                comentarios: 'Solicitar visita técnica.',
                items: [
                    { nombre: "Concreto f’c 300 kg/cm²", cantidad: 50, unidad: 'm³', precio: 2100 },
                    { nombre: 'Servicio de bombeo', cantidad: 4, unidad: 'servicio', precio: 1200 },
                    { nombre: 'Asesoría técnica en sitio', cantidad: 1, unidad: 'servicio', precio: 950 }
                ]
            },
            {
                folio: 'DEMO-007',
                cliente: {
                    nombre: 'Urbanización del Valle',
                    telefono: '5577789900',
                    correo: 'admin@urbvalle.mx',
                    ubicacion: 'Ixmiquilpan, Hidalgo',
                    tipoObra: 'Pavimento ligero',
                    fechaEntrega: generarFechaDiasAtras(7),
                    comentarios: 'Entrega parcial por etapas.'
                },
                fecha: generarFechaDiasAtras(7),
                total: 45600,
                estatus: 'cerrada',
                vendedor: 'Sofía Hernández',
                comentarios: 'Pedido confirmado por WhatsApp.',
                items: [
                    { nombre: 'Concreto permeable', cantidad: 15, unidad: 'm³', precio: 2400 },
                    { nombre: 'Transporte y descarga', cantidad: 3, unidad: 'servicio', precio: 650 }
                ]
            },
            {
                folio: 'DEMO-008',
                cliente: {
                    nombre: 'Casa Materiales Centro',
                    telefono: '5544778899',
                    correo: 'ventas@materialescentro.mx',
                    ubicacion: 'Actopan, Hidalgo',
                    tipoObra: 'Reventa de materiales',
                    fechaEntrega: generarFechaDiasAtras(8),
                    comentarios: 'Quiere lista de precios semanal.'
                },
                fecha: generarFechaDiasAtras(8),
                total: 16320,
                estatus: 'perdida',
                vendedor: 'Luis Ramírez',
                comentarios: 'No aceptó condiciones de entrega.',
                items: [
                    { nombre: 'Cemento gris 50 kg', cantidad: 40, unidad: 'bulto', precio: 220 },
                    { nombre: 'Arena fina', cantidad: 10, unidad: 'tonelada', precio: 380 },
                    { nombre: 'Grava 3/4”', cantidad: 6, unidad: 'tonelada', precio: 500 }
                ]
            },
            {
                folio: 'DEMO-009',
                cliente: {
                    nombre: 'Proyecto Horizonte',
                    telefono: '5566001288',
                    correo: 'contacto@horizonte.mx',
                    ubicacion: 'Mineral de la Reforma, Hidalgo',
                    tipoObra: 'Cimentación y muros',
                    fechaEntrega: generarFechaDiasAtras(9),
                    comentarios: 'Requiere validación técnica.'
                },
                fecha: generarFechaDiasAtras(9),
                total: 74200,
                estatus: 'nueva',
                vendedor: 'Ana Martínez',
                comentarios: 'Enviar propuesta formal antes del viernes.',
                items: [
                    { nombre: "Concreto f’c 250 kg/cm²", cantidad: 28, unidad: 'm³', precio: 1900 },
                    { nombre: "Concreto f’c 200 kg/cm²", cantidad: 10, unidad: 'm³', precio: 1700 },
                    { nombre: 'Servicio de bombeo', cantidad: 2, unidad: 'servicio', precio: 1200 }
                ]
            },
            {
                folio: 'DEMO-010',
                cliente: {
                    nombre: 'Constructora Real del Monte',
                    telefono: '5599811200',
                    correo: 'obra@realdelmonte.mx',
                    ubicacion: 'Real del Monte, Hidalgo',
                    tipoObra: 'Escaleras y losas',
                    fechaEntrega: generarFechaDiasAtras(10),
                    comentarios: 'Necesita visita a obra.'
                },
                fecha: generarFechaDiasAtras(10),
                total: 62950,
                estatus: 'en seguimiento',
                vendedor: 'Carlos Pérez',
                comentarios: 'Pendiente confirmar fecha de entrega.',
                items: [
                    { nombre: "Concreto f’c 300 kg/cm²", cantidad: 25, unidad: 'm³', precio: 2100 },
                    { nombre: 'Renta de vibrador', cantidad: 2, unidad: 'servicio', precio: 550 },
                    { nombre: 'Transporte y descarga', cantidad: 4, unidad: 'servicio', precio: 650 }
                ]
            }
        ];

        guardarCotizaciones(demo);
    }

    function convertirFecha(fechaTexto) {
        if (!fechaTexto) return null;

        if (fechaTexto.includes('/')) {
            const partes = fechaTexto.split('/');
            if (partes.length === 3) {
                const dia = partes[0].padStart(2, '0');
                const mes = partes[1].padStart(2, '0');
                const anio = partes[2];
                return new Date(`${anio}-${mes}-${dia}T00:00:00`);
            }
        }

        return new Date(fechaTexto);
    }

    function filtrarCotizaciones() {
        const cotizaciones = obtenerCotizaciones();

        const busqueda = normalizarTexto(document.getElementById('inputBusqueda')?.value);
        const estatus = document.getElementById('selectEstatus')?.value || '';
        const desde = document.getElementById('inputDesde')?.value;
        const hasta = document.getElementById('inputHasta')?.value;

        return cotizaciones.filter(c => {
            const cliente = c.cliente || {};
            const texto = [
                c.folio,
                cliente.nombre,
                c.estatus,
                c.vendedor
            ].map(normalizarTexto).join(' ');

            const coincideBusqueda = !busqueda || texto.includes(busqueda);
            const coincideEstatus = !estatus || c.estatus === estatus;

            const fechaCotizacion = convertirFecha(c.fecha);
            const fechaDesde = desde ? new Date(`${desde}T00:00:00`) : null;
            const fechaHasta = hasta ? new Date(`${hasta}T23:59:59`) : null;

            const coincideDesde = !fechaDesde || fechaCotizacion >= fechaDesde;
            const coincideHasta = !fechaHasta || fechaCotizacion <= fechaHasta;

            return coincideBusqueda && coincideEstatus && coincideDesde && coincideHasta;
        });
    }

    function renderizarMetricas(cotizaciones) {
        const total = cotizaciones.length;
        const nuevas = cotizaciones.filter(c => c.estatus === 'nueva').length;
        const seguimiento = cotizaciones.filter(c => c.estatus === 'en seguimiento').length;
        const cerradas = cotizaciones.filter(c => c.estatus === 'cerrada').length;
        const perdidas = cotizaciones.filter(c => c.estatus === 'perdida').length;
        const montoTotal = cotizaciones.reduce((acc, c) => acc + Number(c.total || 0), 0);
        const conversion = total > 0 ? (cerradas / total) * 100 : 0;

        document.getElementById('metricTotal').textContent = total;
        document.getElementById('metricNuevas').textContent = nuevas;
        document.getElementById('metricSeguimiento').textContent = seguimiento;
        document.getElementById('metricCerradas').textContent = cerradas;
        document.getElementById('metricPerdidas').textContent = perdidas;
        document.getElementById('metricMonto').textContent = formatoMoneda(montoTotal);
        document.getElementById('metricPipeline').textContent = formatoMoneda(montoTotal);
        document.getElementById('metricConversion').textContent = `${conversion.toFixed(1)}%`;
    }

    function obtenerClaseEstatus(estatus) {
        return `badge-${String(estatus || 'nueva').replace(/\s+/g, '-')}`;
    }

    function capitalizarEstatus(estatus) {
        return String(estatus || 'nueva')
            .split(' ')
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }

    function renderizarTablaCotizaciones(cotizaciones) {
        const tbody = document.getElementById('tablaCotizaciones');
        if (!tbody) return;

        if (cotizaciones.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        No hay cotizaciones que coincidan con los filtros.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = cotizaciones.map(c => {
            const cliente = c.cliente || {};

            return `
                <tr>
                    <td><strong>${c.folio || '--'}</strong></td>
                    <td>
                        <div class="client-cell">
                            <strong>${cliente.nombre || '--'}</strong>
                            <span>${cliente.telefono || ''}</span>
                        </div>
                    </td>
                    <td>${c.vendedor || '--'}</td>
                    <td>${formatoMoneda(c.total)}</td>
                    <td>
                        <span class="status-badge ${obtenerClaseEstatus(c.estatus)}">
                            ${capitalizarEstatus(c.estatus)}
                        </span>
                    </td>
                    <td>${c.fecha || '--'}</td>
                    <td>
                        <div class="table-actions">
                            <button type="button" class="btn-table btn-detail" data-action="detalle" data-folio="${c.folio}">
                                Ver detalle
                            </button>
                            <button type="button" class="btn-table btn-follow" data-action="en seguimiento" data-folio="${c.folio}">
                                Seguimiento
                            </button>
                            <button type="button" class="btn-table btn-close" data-action="cerrada" data-folio="${c.folio}">
                                Cerrada
                            </button>
                            <button type="button" class="btn-table btn-lost" data-action="perdida" data-folio="${c.folio}">
                                Perdida
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function renderizarGraficaEstatus(cotizaciones) {
        const chart = document.getElementById('estatusChart');
        if (!chart) return;

        const conteo = ESTATUS.reduce((acc, estatus) => {
            acc[estatus] = cotizaciones.filter(c => c.estatus === estatus).length;
            return acc;
        }, {});

        const maximo = Math.max(...Object.values(conteo), 1);

        chart.innerHTML = ESTATUS.map(estatus => {
            const valor = conteo[estatus];
            const porcentaje = (valor / maximo) * 100;

            return `
                <div class="status-bar-row">
                    <div class="status-bar-label">
                        <span>${capitalizarEstatus(estatus)}</span>
                        <strong>${valor}</strong>
                    </div>
                    <div class="status-bar-track">
                        <div 
                            class="status-bar-fill ${obtenerClaseEstatus(estatus)}" 
                            style="width: ${porcentaje}%">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderizarPanel() {
        const cotizacionesFiltradas = filtrarCotizaciones();

        renderizarMetricas(cotizacionesFiltradas);
        renderizarTablaCotizaciones(cotizacionesFiltradas);
        renderizarGraficaEstatus(cotizacionesFiltradas);
    }

    function obtenerCotizacionPorFolio(folio) {
        return obtenerCotizaciones().find(c => c.folio === folio);
    }

    function abrirDetalleCotizacion(folio) {
        const cotizacion = obtenerCotizacionPorFolio(folio);
        const modal = document.getElementById('detalleModal');
        const contenido = document.getElementById('detalleContenido');

        if (!cotizacion || !modal || !contenido) return;

        const cliente = cotizacion.cliente || {};
        const items = Array.isArray(cotizacion.items) ? cotizacion.items : [];

        const productosHtml = items.length > 0
            ? `
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Precio unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td>${item.nombre || '--'}</td>
                                <td>${item.cantidad || 0}</td>
                                <td>${item.unidad || '--'}</td>
                                <td>${formatoMoneda(item.precio)}</td>
                                <td>${formatoMoneda((item.precio || 0) * (item.cantidad || 0))}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `
            : '<p>No hay productos registrados en esta cotización.</p>';

        contenido.innerHTML = `
            <div class="detail-header">
                <div>
                    <span class="admin-kicker">Detalle completo</span>
                    <h3>${cotizacion.folio || '--'}</h3>
                </div>
                <span class="status-badge ${obtenerClaseEstatus(cotizacion.estatus)}">
                    ${capitalizarEstatus(cotizacion.estatus)}
                </span>
            </div>

            <div class="detail-grid">
                <div><span>Cliente</span><strong>${cliente.nombre || '--'}</strong></div>
                <div><span>Teléfono</span><strong>${cliente.telefono || '--'}</strong></div>
                <div><span>Correo</span><strong>${cliente.correo || '--'}</strong></div>
                <div><span>Ubicación</span><strong>${cliente.ubicacion || '--'}</strong></div>
                <div><span>Tipo de obra</span><strong>${cliente.tipoObra || '--'}</strong></div>
                <div><span>Fecha</span><strong>${cotizacion.fecha || '--'}</strong></div>
                <div><span>Vendedor asignado</span><strong>${cotizacion.vendedor || '--'}</strong></div>
                <div><span>Total</span><strong>${formatoMoneda(cotizacion.total)}</strong></div>
            </div>

            <h4>Productos cotizados</h4>
            ${productosHtml}

            <h4>Comentarios</h4>
            <p class="detail-comments">
                ${cotizacion.comentarios || cliente.comentarios || 'Sin comentarios registrados.'}
            </p>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('show');
    }

    function cerrarDetalleCotizacion() {
        const modal = document.getElementById('detalleModal');
        if (!modal) return;

        modal.classList.remove('show');
        modal.classList.add('hidden');
    }

    function cambiarEstatusCotizacion(folio, nuevoEstatus) {
        const cotizaciones = obtenerCotizaciones();
        const index = cotizaciones.findIndex(c => c.folio === folio);

        if (index === -1) return;

        cotizaciones[index].estatus = nuevoEstatus;
        guardarCotizaciones(cotizaciones);
        renderizarPanel();
    }

    function registrarEventos() {
        const inputBusqueda = document.getElementById('inputBusqueda');
        const selectEstatus = document.getElementById('selectEstatus');
        const inputDesde = document.getElementById('inputDesde');
        const inputHasta = document.getElementById('inputHasta');
        const btnLimpiar = document.getElementById('btnLimpiarFiltros');
        const tabla = document.getElementById('tablaCotizaciones');
        const modal = document.getElementById('detalleModal');
        const modalClose = document.getElementById('detalleModalClose');

        [inputBusqueda, selectEstatus, inputDesde, inputHasta].forEach(control => {
            if (!control) return;

            const evento = control.tagName === 'INPUT' && control.type === 'text' ? 'input' : 'change';
            control.addEventListener(evento, renderizarPanel);
        });

        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', () => {
                if (inputBusqueda) inputBusqueda.value = '';
                if (selectEstatus) selectEstatus.value = '';
                if (inputDesde) inputDesde.value = '';
                if (inputHasta) inputHasta.value = '';
                renderizarPanel();
            });
        }

        if (tabla) {
            tabla.addEventListener('click', e => {
                const boton = e.target.closest('button[data-action]');
                if (!boton) return;

                const folio = boton.dataset.folio;
                const action = boton.dataset.action;

                if (action === 'detalle') {
                    abrirDetalleCotizacion(folio);
                    return;
                }

                cambiarEstatusCotizacion(folio, action);
            });
        }

        if (modalClose) {
            modalClose.addEventListener('click', cerrarDetalleCotizacion);
        }

        if (modal) {
            modal.addEventListener('click', e => {
                if (e.target === modal) cerrarDetalleCotizacion();
            });
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                cerrarDetalleCotizacion();
            }
        });
    }

    function initAdminPanel() {
        if (!document.getElementById('tablaCotizaciones')) return;

        cargarCotizacionesDemo();
        registrarEventos();
        renderizarPanel();
    }

    document.addEventListener('DOMContentLoaded', initAdminPanel);
})();