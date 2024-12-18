/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/

import { userPreferencesUpdate } from "./api";

export const limpiarTodoLocalStorage = () => {
    localStorage.clear()
}

// Data del local storage
export const enviarDatosUsuario = async () => {
    // Obtener los datos desde el localStorage
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    if (!datosUsuario) {
        console.error("No hay datos en el localStorage");
        return;
    }

    // Transformar los datos
    const datosTransformados = {
        genders: datosUsuario.genders || [],
        lookingFors: datosUsuario.lookingFors || [],
        perceptions: datosUsuario.perceptions || [],
        pronouns: datosUsuario.pronouns || [],
        relationshipStatus: datosUsuario.relationshipStatus || [],
        sexualIdentities: datosUsuario.sexualIdentities || [],
        pets: datosUsuario.pets || [],
        roles: datosUsuario.roles || [],
        interests: datosUsuario.interests?.map((item) => item.id) || [],
        zodiacs: datosUsuario.zodiacs ? [datosUsuario.zodiacs] : [],
        smokes: datosUsuario.smokes || [],
        userPhotos: datosUsuario.FotosCarrucel || [],
        name: datosUsuario.name || "",
        lastName: datosUsuario.lastName || "",
        email: datosUsuario.email || "",
        birthDate: datosUsuario.birthDate || "",
        height: parseInt(datosUsuario.height) || 0, // Convertir a número
        aboutMe: datosUsuario.aboutMe || "string", // Por defecto "string"
    };

    console.log("Datos transformados para enviar:", datosTransformados);

    // Enviar los datos
    try {
        const respuesta = await userPreferencesUpdate(datosTransformados);
        console.log("Respuesta del servidor:", respuesta);
    } catch (error) {
        console.error("Error al enviar los datos:", error);
    }
};
  
