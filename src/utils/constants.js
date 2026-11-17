export const COMPENSATION_LABEL = {
  PAID: "Remunerado",
  COLLABORATION: "Colaboración",
};

export const CATEGORY_CONFIG = {
  MAKEUP: { label: "Makeup", className: "specialty-sfx" },
  PHOTOGRAPHY_VIDEO: { label: "Foto / Vídeo", className: "specialty-photo" },
  MODEL_TALENT: { label: "Modelo / Talento", className: "specialty-model" },
  PRODUCTION: { label: "Producción", className: "specialty-prod" },
};

export const CATEGORIES = [
  { value: null, label: "Todos" },
  { value: "PHOTOGRAPHY_VIDEO", label: "Foto/Vídeo" },
  { value: "PRODUCTION", label: "Producción" },
  { value: "MAKEUP", label: "Maquillaje" },
  { value: "MODEL_TALENT", label: "Modelo/Talento" },
];

/** Provincias españolas: el backend espera y devuelve el nombre del enum Location. */
export const LOCATION_LABEL = {
  A_CORUNA: "A Coruña",
  ALAVA: "Álava",
  ALBACETE: "Albacete",
  ALICANTE: "Alicante",
  ALMERIA: "Almería",
  ASTURIAS: "Asturias",
  AVILA: "Ávila",
  BADAJOZ: "Badajoz",
  BARCELONA: "Barcelona",
  BURGOS: "Burgos",
  CACERES: "Cáceres",
  CADIZ: "Cádiz",
  CANTABRIA: "Cantabria",
  CASTELLON: "Castellón",
  CEUTA: "Ceuta",
  CIUDAD_REAL: "Ciudad Real",
  CORDOBA: "Córdoba",
  CUENCA: "Cuenca",
  GIRONA: "Girona",
  GRANADA: "Granada",
  GUADALAJARA: "Guadalajara",
  GUIPUZCOA: "Guipúzcoa",
  HUELVA: "Huelva",
  HUESCA: "Huesca",
  ISLAS_BALEARES: "Islas Baleares",
  JAEN: "Jaén",
  LA_RIOJA: "La Rioja",
  LAS_PALMAS: "Las Palmas",
  LEON: "León",
  LLEIDA: "Lleida",
  LUGO: "Lugo",
  MADRID: "Madrid",
  MALAGA: "Málaga",
  MELILLA: "Melilla",
  MURCIA: "Murcia",
  NAVARRA: "Navarra",
  OURENSE: "Ourense",
  PALENCIA: "Palencia",
  PONTEVEDRA: "Pontevedra",
  SALAMANCA: "Salamanca",
  SANTA_CRUZ_DE_TENERIFE: "Santa Cruz de Tenerife",
  SEGOVIA: "Segovia",
  SEVILLA: "Sevilla",
  SORIA: "Soria",
  TARRAGONA: "Tarragona",
  TERUEL: "Teruel",
  TOLEDO: "Toledo",
  VALENCIA: "Valencia",
  VALLADOLID: "Valladolid",
  VIZCAYA: "Vizcaya",
  ZAMORA: "Zamora",
  ZARAGOZA: "Zaragoza",
};

export const LOCATION_OPTIONS = Object.entries(LOCATION_LABEL).map(([value, label]) => ({
  value,
  label,
}));

/** Etiqueta legible de una ubicación; tolera datos antiguos guardados en texto libre. */
export const getLocationLabel = (location) => LOCATION_LABEL[location] ?? location;

export const STORAGE_KEYS = {
  TOKEN: "collapp_token",
  USER: "collapp_user",
};

export const STATUS_CONFIG = {
  OPEN: { label: "Abierta", className: "status-open" },
  PAUSED: { label: "Pausada", className: "status-paused" },
  COVERED: { label: "Cerrada", className: "status-closed" },
};

export const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, { label }]) => ({
  value,
  label,
}));

export const APPLICATION_STATUS_CONFIG = {
  PENDING: { label: "Pendiente de revisión", color: "blue" },
  ACCEPTED: { label: "Inscripción aceptada", color: "green" },
  REJECTED: { label: "Inscripción rechazada", color: "red" },
};