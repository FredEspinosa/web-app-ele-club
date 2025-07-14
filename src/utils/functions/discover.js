export default function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tab-panel-${index}`,
  };
}

export const dateTransform = (date) => {
  if (!date) return;
  const fecha = new Date(date + "T00:00:00");
  if (isNaN(fecha)) {
    console.warn("Fecha inválida:", date);
    return null;
  }
  const opciones = {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  };

  const formateador = new Intl.DateTimeFormat("es-MX", opciones);
  const partes = formateador.formatToParts(fecha);
  const dia = partes.find((p) => p.type === "day")?.value;
  const mes = partes.find((p) => p.type === "month")?.value;
  if (!dia || !mes) return null;
  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

  return `${dia} ${mesCapitalizado}`;
};
