(function () {
    'use strict';

    const VENDEDORES_DEMO = [
        'Ana Martínez',
        'Carlos Pérez',
        'Sofía Hernández',
        'Luis Ramírez'
    ];

    const ESTATUS = ['nueva', 'en seguimiento', 'cerrada', 'perdida'];
    const CHART_CONFIG_KEY = 'adminChartConfig';

    const DEFAULT_CHART_CONFIG = {
        mixMetrica: 'monto',
        mixTop: '5',
        tendenciaMetrica: 'monto',
        tendenciaEstatus: '',
        mapaMetrica: 'monto'
    };

    const ESTADOS_MEXICO = {
        Hidalgo: { lat: 20.0911, lng: -98.7624 },
        Querétaro: { lat: 20.5888, lng: -100.3899 },
        'Ciudad de México': { lat: 19.4326, lng: -99.1332 },
        'Estado de México': { lat: 19.4969, lng: -99.7233 },
        Puebla: { lat: 19.0414, lng: -98.2063 },
        Tlaxcala: { lat: 19.3182, lng: -98.2375 },
        Veracruz: { lat: 19.1738, lng: -96.1342 },
        Guanajuato: { lat: 21.019, lng: -101.2574 },
        Jalisco: { lat: 20.6597, lng: -103.3496 },
        'San Luis Potosí': { lat: 22.1565, lng: -100.9855 },
        'Nuevo León': { lat: 25.6866, lng: -100.3161 },
        'No identificado': { lat: 20.5888, lng: -100.3899 }
    };

    const ESTADOS_POR_FOLIO_DEMO = {
        'DEMO-001': 'Hidalgo',
        'DEMO-002': 'Hidalgo',
        'DEMO-003': 'Hidalgo',
        'DEMO-004': 'Hidalgo',
        'DEMO-005': 'Querétaro',
        'DEMO-006': 'Ciudad de México',
        'DEMO-007': 'Hidalgo',
        'DEMO-008': 'Hidalgo',
        'DEMO-009': 'Hidalgo',
        'DEMO-010': 'Hidalgo'
    };

    let mapaMexico = null;
    let capaGeoMexico = null;

    function obtenerCotizaciones() {
        try {
            const data = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
            return Array.isArray(data) ? data.map(enriquecerCotizacionConGeo) : [];
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

    function formatoNumero(valor) {
        return Number(valor || 0).toLocaleString('es-MX', {
            maximumFractionDigits: 2
        });
    }

    function normalizarTexto(texto) {
        return String(texto || '').toLowerCase().trim();
    }

    function escaparHtml(texto) {
        return String(texto || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function obtenerConfigGraficas() {
        try {
            const guardada = JSON.parse(localStorage.getItem(CHART_CONFIG_KEY) || '{}');
            return { ...DEFAULT_CHART_CONFIG, ...guardada };
        } catch (error) {
            return { ...DEFAULT_CHART_CONFIG };
        }
    }

    function guardarConfigGraficas(config) {
        localStorage.setItem(CHART_CONFIG_KEY, JSON.stringify(config));
    }

    function aplicarConfigGraficasAControles() {
        const config = obtenerConfigGraficas();

        const controles = {
            selectMixMetrica: config.mixMetrica,
            selectMixTop: config.mixTop,
            selectTendenciaMetrica: config.tendenciaMetrica,
            selectTendenciaEstatus: config.tendenciaEstatus,
            selectMapaMetrica: config.mapaMetrica
        };

        Object.entries(controles).forEach(([id, value]) => {
            const control = document.getElementById(id);
            if (control) control.value = value;
        });
    }

    function leerConfigGraficasDesdeControles() {
        const config = {
            mixMetrica: document.getElementById('selectMixMetrica')?.value || DEFAULT_CHART_CONFIG.mixMetrica,
            mixTop: document.getElementById('selectMixTop')?.value || DEFAULT_CHART_CONFIG.mixTop,
            tendenciaMetrica: document.getElementById('selectTendenciaMetrica')?.value || DEFAULT_CHART_CONFIG.tendenciaMetrica,
            tendenciaEstatus: document.getElementById('selectTendenciaEstatus')?.value || DEFAULT_CHART_CONFIG.tendenciaEstatus,
            mapaMetrica: document.getElementById('selectMapaMetrica')?.value || DEFAULT_CHART_CONFIG.mapaMetrica
        };

        guardarConfigGraficas(config);
        return config;
    }

    function clasificarProducto(item) {
        const nombre = normalizarTexto(item?.nombre);
        const unidad = normalizarTexto(item?.unidad);

        if (nombre.includes('concreto') || nombre.includes('relleno fluido')) return 'Concreto';
        if (nombre.includes('cemento') || nombre.includes('mortero')) return 'Cementos';
        if (
            nombre.includes('arena') ||
            nombre.includes('grava') ||
            nombre.includes('base') ||
            nombre.includes('sub-base') ||
            nombre.includes('tezontle') ||
            nombre.includes('piedra') ||
            nombre.includes('cascajo')
        ) return 'Agregados';
        if (
            nombre.includes('aditivo') ||
            nombre.includes('fibra') ||
            nombre.includes('pigmento') ||
            nombre.includes('plastificante') ||
            nombre.includes('sellador') ||
            nombre.includes('microsílice') ||
            unidad === 'litro' ||
            unidad === 'kg'
        ) return 'Aditivos';
        if (
            nombre.includes('servicio') ||
            nombre.includes('renta') ||
            nombre.includes('transporte') ||
            nombre.includes('asesoría') ||
            nombre.includes('aplicación')
        ) return 'Servicios';

        return 'Otros';
    }

    function calcularM3Concreto(cotizacion) {
        const items = Array.isArray(cotizacion?.items) ? cotizacion.items : [];

        return items.reduce((acc, item) => {
            const esConcreto = clasificarProducto(item) === 'Concreto' && item.unidad === 'm³';
            return esConcreto ? acc + Number(item.cantidad || 0) : acc;
        }, 0);
    }

    function formatearValorGrafica(valor, metrica) {
        if (metrica === 'monto') return formatoMoneda(valor);
        if (metrica === 'm3') return `${formatoNumero(valor)} m³`;
        return formatoNumero(valor);
    }

    function inferirEstadoDesdeUbicacion(ubicacion) {
        const texto = normalizarTexto(ubicacion);

        const coincidencias = [
            ['hidalgo', 'Hidalgo'],
            ['querétaro', 'Querétaro'],
            ['queretaro', 'Querétaro'],
            ['qro', 'Querétaro'],
            ['cdmx', 'Ciudad de México'],
            ['ciudad de mexico', 'Ciudad de México'],
            ['ciudad de méxico', 'Ciudad de México'],
            ['estado de mexico', 'Estado de México'],
            ['estado de méxico', 'Estado de México'],
            ['edomex', 'Estado de México'],
            ['puebla', 'Puebla'],
            ['tlaxcala', 'Tlaxcala'],
            ['veracruz', 'Veracruz'],
            ['guanajuato', 'Guanajuato'],
            ['jalisco', 'Jalisco'],
            ['san luis potosi', 'San Luis Potosí'],
            ['san luis potosí', 'San Luis Potosí'],
            ['nuevo leon', 'Nuevo León'],
            ['nuevo león', 'Nuevo León']
        ];

        const match = coincidencias.find(([needle]) => texto.includes(needle));
        return match ? match[1] : 'No identificado';
    }

    function enriquecerCotizacionConGeo(cotizacion) {
        const cliente = cotizacion.cliente || {};
        const estado = cliente.estado || ESTADOS_POR_FOLIO_DEMO[cotizacion.folio] || inferirEstadoDesdeUbicacion(cliente.ubicacion);
        const coords = ESTADOS_MEXICO[estado] || ESTADOS_MEXICO['No identificado'];

        cotizacion.cliente = {
            ...cliente,
            estado,
            geo: coords
        };

        return cotizacion;
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

        guardarCotizaciones(demo.map(enriquecerCotizacionConGeo));
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

    function obtenerDatosMixProductos(cotizaciones, metrica, top) {
        const acumulado = {};

        cotizaciones.forEach(cotizacion => {
            const items = Array.isArray(cotizacion.items) ? cotizacion.items : [];

            items.forEach(item => {
                const categoria = clasificarProducto(item);
                const cantidad = Number(item.cantidad || 0);
                const precio = Number(item.precio || 0);

                if (!acumulado[categoria]) {
                    acumulado[categoria] = {
                        label: categoria,
                        monto: 0,
                        cantidad: 0,
                        cotizaciones: new Set()
                    };
                }

                acumulado[categoria].monto += precio * cantidad;
                acumulado[categoria].cantidad += cantidad;
                acumulado[categoria].cotizaciones.add(cotizacion.folio);
            });
        });

        return Object.values(acumulado)
            .map(item => ({
                ...item,
                valor: metrica === 'monto' ? item.monto : item.cantidad,
                cotizaciones: item.cotizaciones.size
            }))
            .sort((a, b) => b.valor - a.valor)
            .slice(0, top);
    }

    function renderizarGraficaMixProductos(cotizaciones, config) {
        const chart = document.getElementById('mixProductosChart');
        if (!chart) return;

        const metrica = config.mixMetrica;
        const datos = obtenerDatosMixProductos(cotizaciones, metrica, Number(config.mixTop || 5));
        const maximo = Math.max(...datos.map(item => item.valor), 1);

        if (datos.length === 0) {
            chart.innerHTML = '<div class="empty-chart">No hay productos para graficar con los filtros actuales.</div>';
            return;
        }

        chart.innerHTML = datos.map((item, index) => {
            const porcentaje = Math.max((item.valor / maximo) * 100, 2);
            const detalle = metrica === 'monto'
                ? `${formatoNumero(item.cantidad)} unidades cotizadas`
                : `${formatoMoneda(item.monto)} en pipeline`;

            return `
                <div class="business-bar-row">
                    <div class="business-bar-meta">
                        <span class="bar-rank">${index + 1}</span>
                        <div>
                            <strong>${escaparHtml(item.label)}</strong>
                            <span>${detalle} · ${item.cotizaciones} cotizaciones</span>
                        </div>
                    </div>

                    <div class="business-bar-track">
                        <div class="business-bar-fill category-${escaparHtml(item.label.toLowerCase())}" style="width: ${porcentaje}%"></div>
                    </div>

                    <strong class="business-bar-value">${formatearValorGrafica(item.valor, metrica)}</strong>
                </div>
            `;
        }).join('');
    }

    function obtenerClaveFecha(fechaTexto) {
        const fecha = convertirFecha(fechaTexto);
        if (!fecha || Number.isNaN(fecha.getTime())) return 'Sin fecha';

        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short'
        });
    }

    function obtenerOrdenFecha(fechaTexto) {
        const fecha = convertirFecha(fechaTexto);
        return fecha && !Number.isNaN(fecha.getTime()) ? fecha.getTime() : 0;
    }

    function obtenerDatosTendencia(cotizaciones, config) {
        const filtradas = config.tendenciaEstatus
            ? cotizaciones.filter(c => c.estatus === config.tendenciaEstatus)
            : cotizaciones;

        const acumulado = {};

        filtradas.forEach(cotizacion => {
            const label = obtenerClaveFecha(cotizacion.fecha);
            const orden = obtenerOrdenFecha(cotizacion.fecha);

            if (!acumulado[label]) {
                acumulado[label] = {
                    label,
                    orden,
                    monto: 0,
                    cotizaciones: 0,
                    m3: 0
                };
            }

            acumulado[label].monto += Number(cotizacion.total || 0);
            acumulado[label].cotizaciones += 1;
            acumulado[label].m3 += calcularM3Concreto(cotizacion);
        });

        return Object.values(acumulado)
            .sort((a, b) => a.orden - b.orden)
            .slice(-12)
            .map(item => ({
                ...item,
                valor: item[config.tendenciaMetrica] || 0
            }));
    }

    function construirPolyline(points) {
        return points.map(point => `${point.x},${point.y}`).join(' ');
    }

    function renderizarGraficaTendencia(cotizaciones, config) {
        const chart = document.getElementById('tendenciaChart');
        if (!chart) return;

        const datos = obtenerDatosTendencia(cotizaciones, config);

        if (datos.length === 0) {
            chart.innerHTML = '<div class="empty-chart">No hay datos de tendencia con los filtros actuales.</div>';
            return;
        }

        const width = 620;
        const height = 260;
        const padX = 42;
        const padY = 34;
        const maximo = Math.max(...datos.map(item => item.valor), 1);
        const divisor = Math.max(datos.length - 1, 1);

        const puntos = datos.map((item, index) => ({
            x: padX + (index / divisor) * (width - padX * 2),
            y: height - padY - (item.valor / maximo) * (height - padY * 2),
            ...item
        }));

        const area = [
            `${puntos[0].x},${height - padY}`,
            construirPolyline(puntos),
            `${puntos[puntos.length - 1].x},${height - padY}`
        ].join(' ');

        const total = datos.reduce((acc, item) => acc + item.valor, 0);
        const promedio = total / datos.length;

        chart.innerHTML = `
            <div class="trend-summary">
                <div>
                    <span>Total visible</span>
                    <strong>${formatearValorGrafica(total, config.tendenciaMetrica)}</strong>
                </div>
                <div>
                    <span>Promedio por día</span>
                    <strong>${formatearValorGrafica(promedio, config.tendenciaMetrica)}</strong>
                </div>
            </div>

            <svg class="trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Tendencia comercial">
                <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" class="trend-axis"></line>
                <line x1="${padX}" y1="${padY}" x2="${padX}" y2="${height - padY}" class="trend-axis"></line>

                <polygon points="${area}" class="trend-area"></polygon>
                <polyline points="${construirPolyline(puntos)}" class="trend-line"></polyline>

                ${puntos.map(point => `
                    <g class="trend-point-group">
                        <circle cx="${point.x}" cy="${point.y}" r="4.5" class="trend-point"></circle>
                        <title>${point.label}: ${formatearValorGrafica(point.valor, config.tendenciaMetrica)}</title>
                    </g>
                `).join('')}

                ${puntos.map((point, index) => {
                    const mostrar = datos.length <= 7 || index === 0 || index === datos.length - 1 || index % 2 === 0;
                    return mostrar
                        ? `<text x="${point.x}" y="${height - 10}" text-anchor="middle" class="trend-label">${escaparHtml(point.label)}</text>`
                        : '';
                }).join('')}
            </svg>
        `;
    }

    function obtenerDatosGeograficos(cotizaciones, metrica) {
        const acumulado = {};

        cotizaciones.forEach(cotizacion => {
            const cliente = cotizacion.cliente || {};
            const estado = cliente.estado || inferirEstadoDesdeUbicacion(cliente.ubicacion);
            const coords = cliente.geo || ESTADOS_MEXICO[estado] || ESTADOS_MEXICO['No identificado'];

            if (!acumulado[estado]) {
                acumulado[estado] = {
                    estado,
                    lat: coords.lat,
                    lng: coords.lng,
                    monto: 0,
                    cotizaciones: 0,
                    m3: 0
                };
            }

            acumulado[estado].monto += Number(cotizacion.total || 0);
            acumulado[estado].cotizaciones += 1;
            acumulado[estado].m3 += calcularM3Concreto(cotizacion);
        });

        return Object.values(acumulado)
            .map(item => ({
                ...item,
                valor: item[metrica] || 0
            }))
            .sort((a, b) => b.valor - a.valor);
    }

    function renderizarMapaGeografico(cotizaciones, config) {
        const map = document.getElementById('geoHeatmap');
        const ranking = document.getElementById('geoRanking');
        if (!map || !ranking) return;

        const metrica = config.mapaMetrica;
        const datos = obtenerDatosGeograficos(cotizaciones, metrica);
        const maximo = Math.max(...datos.map(item => item.valor), 1);

        if (datos.length === 0) {
            map.innerHTML = '<div class="empty-chart">No hay información geográfica para mostrar.</div>';
            ranking.innerHTML = '';
            return;
        }

        if (typeof L === 'undefined') {
            map.innerHTML = '<div class="empty-chart">El mapa requiere conexión para cargar Leaflet.</div>';
        } else {
            if (!mapaMexico) {
                mapaMexico = L.map(map, {
                    scrollWheelZoom: false,
                    zoomControl: true
                }).setView([23.5, -102.2], 5);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; OpenStreetMap'
                }).addTo(mapaMexico);
            }

            if (capaGeoMexico) {
                capaGeoMexico.clearLayers();
            } else {
                capaGeoMexico = L.layerGroup().addTo(mapaMexico);
            }

            datos.forEach(item => {
                const intensidad = Math.max(item.valor / maximo, 0.12);
                const radius = 8 + intensidad * 28;
                const marker = L.circleMarker([item.lat, item.lng], {
                    radius,
                    color: '#1f2937',
                    weight: 2,
                    fillColor: '#f2b705',
                    fillOpacity: 0.28 + intensidad * 0.45
                });

                marker.bindTooltip(
                    `<strong>${escaparHtml(item.estado)}</strong><br>${formatearValorGrafica(item.valor, metrica)}`,
                    { sticky: true }
                );

                marker.bindPopup(`
                    <strong>${escaparHtml(item.estado)}</strong><br>
                    ${formatearValorGrafica(item.valor, metrica)}<br>
                    ${item.cotizaciones} cotizaciones<br>
                    ${formatoNumero(item.m3)} m³ concreto
                `);

                marker.addTo(capaGeoMexico);
            });

            const bounds = L.latLngBounds(datos.map(item => [item.lat, item.lng]));
            mapaMexico.invalidateSize();

            if (bounds.isValid()) {
                mapaMexico.fitBounds(bounds.pad(0.5), {
                    maxZoom: 7,
                    animate: false
                });
            }
        }

        ranking.innerHTML = `
            <div class="geo-ranking-header">
                <span>Top estados</span>
                <strong>${datos.length}</strong>
            </div>

            ${datos.slice(0, 6).map((item, index) => {
                const porcentaje = Math.max((item.valor / maximo) * 100, 4);

                return `
                    <div class="geo-ranking-row">
                        <div class="geo-ranking-label">
                            <span>${index + 1}</span>
                            <strong>${escaparHtml(item.estado)}</strong>
                        </div>
                        <div class="geo-ranking-track">
                            <div style="width: ${porcentaje}%"></div>
                        </div>
                        <p>${formatearValorGrafica(item.valor, metrica)}</p>
                    </div>
                `;
            }).join('')}
        `;
    }

    function renderizarGraficasNegocio(cotizaciones) {
        const config = leerConfigGraficasDesdeControles();

        renderizarGraficaMixProductos(cotizaciones, config);
        renderizarGraficaTendencia(cotizaciones, config);
        renderizarMapaGeografico(cotizaciones, config);
    }

    function renderizarPanel() {
        const cotizacionesFiltradas = filtrarCotizaciones();

        renderizarMetricas(cotizacionesFiltradas);
        renderizarTablaCotizaciones(cotizacionesFiltradas);
        renderizarGraficaEstatus(cotizacionesFiltradas);
        renderizarGraficasNegocio(cotizacionesFiltradas);
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
                <div><span>Estado</span><strong>${cliente.estado || '--'}</strong></div>
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
        const chartControls = [
            document.getElementById('selectMixMetrica'),
            document.getElementById('selectMixTop'),
            document.getElementById('selectTendenciaMetrica'),
            document.getElementById('selectTendenciaEstatus'),
            document.getElementById('selectMapaMetrica')
        ];

        [inputBusqueda, selectEstatus, inputDesde, inputHasta].forEach(control => {
            if (!control) return;

            const evento = control.tagName === 'INPUT' && control.type === 'text' ? 'input' : 'change';
            control.addEventListener(evento, renderizarPanel);
        });

        chartControls.forEach(control => {
            if (!control) return;
            control.addEventListener('change', renderizarPanel);
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
        aplicarConfigGraficasAControles();
        registrarEventos();
        renderizarPanel();
    }

    document.addEventListener('DOMContentLoaded', initAdminPanel);
})();
