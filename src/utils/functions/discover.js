export default function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tab-panel-${index}`,
  };
}

export const dateTransform = (dateString) => {
  if (!dateString || typeof dateString !== "string") return null;
  let year, month, day;
  const datePart = dateString.split("T")[0];
  if (datePart.includes("-")) {
    // Asume el formato YYYY-MM-DD
    [year, month, day] = datePart.split("-").map(Number);
  } else if (datePart.includes("/")) {
    // Asume el formato MM/DD/YYYY
    [month, day, year] = datePart.split("/").map(Number);
  } else {
    console.error("Formato de fecha no reconocido:", dateString);
    return dateString;
  }
  const fecha = new Date(Date.UTC(year, month - 1, day));
  if (isNaN(fecha.getTime())) {
    return dateString;
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

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
