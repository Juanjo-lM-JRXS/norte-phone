export type PlanId = 'te-lo-traemos' | 'norte-ya';
export type BeneficioId = 'ninguno' | 'de-a-dos' | 'kit-de-llegada';

export interface Producto {
  nombre: string;
  /** true mientras no haya foto real del equipo (nunca imágenes oficiales). */
  fotoPendiente: boolean;
}

export interface Plan {
  id: PlanId;
  nombre: string;
  precio: number;
  entrega: string;
  mensaje: string;
  /** Porcentaje del anticipo (0–1). null cuando no aplica. */
  anticipo: number | null;
  nota?: string;
}

export interface Beneficio {
  id: BeneficioId;
  nombre: string;
  mensaje: string;
  descuentoPorEquipo: number;
  equipos: number;
  incluye?: string[];
}

export interface EtapaRuta {
  id: string;
  nombre: string;
  descripcion: string;
  prueba: string;
  /** Verde solo en verificación y entrega (regla de marca). */
  verificada: boolean;
}

export interface Prueba {
  titulo: string;
  descripcion: string;
}

export interface Testimonio {
  pedido: string;
  ciudad: string;
  nombre: string;
  texto: string;
  ejemplo: boolean;
}

export interface PreguntaFrecuente {
  id: string;
  pregunta: string;
  respuesta: string;
  /** Marcada para revisión antes de publicar. */
  porRevisar?: boolean;
}

export interface Garantia {
  definida: boolean;
  resumen: string;
  condiciones: string[];
}

export interface ProgramaParche {
  pagoPorAmigo: number;
  diasDespuesDeEntrega: number;
  mensaje: string;
  pasos: { titulo: string; descripcion: string }[];
}

export interface ContenidoNorte {
  marca: { nombre: string; eslogan: [string, string]; beneficio: string };
  producto: Producto;
  pedidoEjemplo: string;
  mediosDePago: string[];
  planes: Plan[];
  beneficios: Beneficio[];
  etapas: EtapaRuta[];
  pruebas: Prueba[];
  garantia: Garantia;
  testimonios: Testimonio[];
  parche: ProgramaParche;
  preguntas: PreguntaFrecuente[];
}
