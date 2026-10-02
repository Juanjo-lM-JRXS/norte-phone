/** Paradas del menú. El orden sigue el de la página. */
export interface ItemNavegacion {
  id: string;
  texto: string;
}

export const ITEMS_NAVEGACION: ItemNavegacion[] = [
  { id: 'como-funciona', texto: 'Cómo funciona' },
  { id: 'planes', texto: 'Planes' },
  { id: 'confianza', texto: 'Confianza' },
  { id: 'el-parche', texto: 'El Parche' },
  { id: 'preguntas', texto: 'Preguntas' },
];

export const IDS_SECCIONES = ['inicio', ...ITEMS_NAVEGACION.map((i) => i.id), 'contacto'];
