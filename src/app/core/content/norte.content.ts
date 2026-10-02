import { ContenidoNorte } from './content.models';

/**
 * Única fuente de contenido de la página. Los valores salen de
 * "Norte — Modelo de negocio", "Norte — Marca" y "Norte — Branding".
 *
 * Reglas que se respetan aquí:
 * - El regateo NO aparece: es margen de negociación en el chat.
 * - Los pisos de precio NO van en este archivo porque se publicarían en el
 *   JavaScript del sitio. Viven en reglas-internas.ts, que solo usan las pruebas.
 */
export const NORTE_CONTENT: ContenidoNorte = {
  marca: {
    nombre: 'Norte',
    eslogan: ['Te lo traemos.', 'Lo ves llegar.'],
    beneficio:
      'iPhone originales comprados en EE. UU., más baratos que en almacén y con cada paso del camino a la vista.',
  },

  producto: { nombre: 'iPhone 18 Pro Max', fotoPendiente: true },

  pedidoEjemplo: 'N-0127',

  mediosDePago: ['transferencia', 'Nequi', 'efectivo'],

  planes: [
    {
      id: 'te-lo-traemos',
      nombre: 'Te lo traemos',
      precio: 5_650_000,
      entrega: '1 a 2 semanas',
      mensaje: 'Lo pides hoy, te lo traemos directo y ahorras 150.000. Ves cada paso del camino.',
      anticipo: 0.6,
    },
    {
      id: 'norte-ya',
      nombre: 'Norte Ya',
      precio: 5_800_000,
      entrega: 'Inmediata',
      mensaje: '¿Lo necesitas ya? Tenemos equipos listos para entrega.',
      anticipo: null,
      nota: 'Según disponibilidad. Pregúntanos por chat.',
    },
  ],

  beneficios: [
    {
      id: 'ninguno',
      nombre: 'Sin beneficio',
      mensaje: 'Solo el equipo.',
      descuentoPorEquipo: 0,
      equipos: 1,
    },
    {
      id: 'de-a-dos',
      nombre: 'De a dos',
      mensaje: 'Si compras con alguien más, a cada uno le quedan 100.000 menos.',
      descuentoPorEquipo: 100_000,
      equipos: 2,
    },
    {
      id: 'kit-de-llegada',
      nombre: 'Kit de llegada',
      mensaje: 'Tu equipo llega con cargador original y forro para que lo estrenes de una.',
      descuentoPorEquipo: 0,
      equipos: 1,
      incluye: ['Cargador original', 'Forro'],
    },
  ],

  etapas: [
    {
      id: 'comprado',
      nombre: 'Comprado',
      descripcion: 'Compramos tu equipo en EE. UU. y te mandamos la factura de compra.',
      prueba: 'Factura de compra',
      verificada: false,
    },
    {
      id: 'en-camino',
      nombre: 'En camino',
      descripcion: 'Tu equipo sale hacia Colombia y te avisamos apenas arranca.',
      prueba: 'Aviso por chat e historias',
      verificada: false,
    },
    {
      id: 'llego',
      nombre: 'Llegó a Colombia',
      descripcion: 'Ya está en manos de Norte, acá en Colombia.',
      prueba: 'Foto real del equipo',
      verificada: false,
    },
    {
      id: 'verificado',
      nombre: 'Verificado',
      descripcion: 'Revisamos el serial en la página de Apple y le ponemos el Sello Norte.',
      prueba: 'Serial en pantalla',
      verificada: true,
    },
    {
      id: 'entregado',
      nombre: 'Entregado',
      descripcion: 'Lo abres con nosotros, sin cortes, y ahí pagas el saldo.',
      prueba: 'Unboxing contigo',
      verificada: true,
    },
  ],

  pruebas: [
    {
      titulo: 'Verificamos el serial contigo',
      descripcion: 'Antes de que pagues el saldo, revisamos juntos el serial en la página de Apple.',
    },
    {
      titulo: 'Factura de compra en EE. UU.',
      descripcion: 'Te mostramos la factura de la tienda donde compramos tu equipo.',
    },
    {
      titulo: 'Caja sellada y unboxing sin cortes',
      descripcion: 'La caja se abre contigo, en video y sin edición.',
    },
  ],

  // PENDIENTE: los documentos piden "condiciones claras y escritas" pero no las definen.
  garantia: {
    definida: false,
    resumen: 'Además de la garantía del fabricante, Norte responde con garantía propia y condiciones por escrito.',
    condiciones: [],
  },

  // Testimonios de ejemplo: se reemplazan por entregas reales con permiso del cliente.
  testimonios: [
    {
      pedido: 'N-0098',
      ciudad: 'Bogotá',
      nombre: 'Laura M.',
      texto:
        'Me mandaron la factura el mismo día y fui viendo cada etapa. Cuando llegó revisamos el serial juntos antes de pagar el resto.',
      ejemplo: true,
    },
    {
      pedido: 'N-0104',
      ciudad: 'Medellín',
      nombre: 'Andrés R.',
      texto: 'Lo pedimos de a dos con mi hermano y a cada uno le quedó 100.000 más barato.',
      ejemplo: true,
    },
    {
      pedido: 'N-0112',
      ciudad: 'Cali',
      nombre: 'Valentina G.',
      texto: 'Me daba miedo pagar el anticipo a una tienda de Instagram. Ver el proceso completo me dio la confianza.',
      ejemplo: true,
    },
  ],

  parche: {
    pagoPorAmigo: 100_000,
    diasDespuesDeEntrega: 7,
    mensaje: 'Ya eres de Norte. Por cada amigo que compre, te ganas 100.000.',
    pasos: [
      { titulo: 'Compras en Norte', descripcion: 'Con tu primera entrega ya eres parte del Parche.' },
      {
        titulo: 'Tu amigo compra',
        descripcion: 'Nos escribe de tu parte. Él conserva su plan y su beneficio, no pierde nada.',
      },
      {
        titulo: 'Te pagamos 100.000',
        descripcion: 'Una semana después de que le entreguemos su equipo.',
      },
    ],
  },

  preguntas: [
    {
      id: 'original',
      pregunta: '¿Los equipos son originales?',
      respuesta:
        'Sí. Son nuevos, en caja sellada y comprados en EE. UU. con factura. Antes de que pagues el saldo revisamos el serial contigo en la página de Apple.',
    },
    {
      id: 'tiempo',
      pregunta: '¿Cuánto se demora un encargo?',
      respuesta:
        'Entre 1 y 2 semanas desde que pagas el anticipo. Te avisamos en cada etapa: comprado, en camino, llegó a Colombia, verificado y entregado.',
    },
    {
      id: 'anticipo',
      pregunta: '¿Cuánto pago al hacer el pedido?',
      respuesta:
        'En Te lo traemos pagas el 60% de anticipo (3.390.000 COP) para separar el cupo, y el saldo cuando tienes el equipo en la mano y ya verificaste el serial.',
    },
    {
      id: 'pagos',
      pregunta: '¿Cómo puedo pagar?',
      respuesta: 'Por transferencia, Nequi o en efectivo. Por ahora no recibimos tarjetas.',
    },
    {
      id: 'esim',
      pregunta: '¿Funciona con mi SIM de acá? ¿Qué pasa con la eSIM?',
      respuesta:
        'Los modelos que se venden en EE. UU. no traen bandeja para SIM física: funcionan con eSIM. Solo tienes que pedirle a tu operador que pase tu línea a eSIM y activarla en el equipo. En la entrega te acompañamos con la configuración.',
      porRevisar: true,
    },
    {
      id: 'beneficios',
      pregunta: '¿Puedo combinar beneficios?',
      respuesta:
        'Escoges uno: De a dos o Kit de llegada. El Parche es aparte, porque esos 100.000 los gana quien te refirió, así que no te quita tu beneficio.',
    },
    {
      id: 'garantia',
      pregunta: '¿Qué cubre la garantía?',
      respuesta:
        'Norte tiene garantía propia con condiciones por escrito, además de la del fabricante. Las condiciones completas están en la sección de confianza.',
      porRevisar: true,
    },
  ],
};
