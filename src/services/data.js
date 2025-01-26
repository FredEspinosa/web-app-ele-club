/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/

import { userPreferencesAdd, userPreferencesUpdate } from "./api";

export const limpiarTodoLocalStorage = () => {
    localStorage.clear()
    sessionStorage.clear()
}

// Data del local storage
export const enviarDatosUsuario = async (tokenSesion, type) => {
    console.log("type", type);
    // Obtener los datos desde el localStorage
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
    if (!datosUsuario) {
        console.error("No hay datos en el localStorage");
        return;
    }

    // Transformar los datos para enviar solo IDs
    const datosTransformados = {
        genders: datosUsuario.genders?.map((item) => item.id) || [],
        lookingFors: datosUsuario.lookingFors?.map((item) => item.id) || [],
        perceptions: datosUsuario.perceptions?.map((item) => item.id) || [],
        pronouns: datosUsuario.pronouns?.map((item) => item.id) || [],
        relationshipStatus: datosUsuario.relationshipStatus?.map((item) => item.id) || [],
        sexualIdentities: datosUsuario.sexualIdentities?.map((item) => item.id) || [],
        pets: datosUsuario.pets?.map((item) => item.id) || [],
        roles: datosUsuario.roles?.map((item) => item.id) || [],
        interests: datosUsuario.interests?.map((item) => item.id) || [],
        zodiacs: datosUsuario.zodiacs?.id ? [datosUsuario.zodiacs.id] : [], // Solo el ID
        smokes: datosUsuario.smokes?.map((item) => item.id) || [],
        userPhotos: datosUsuario.FotosCarrucel || [], // Supongo que ya son URLs
        name: datosUsuario.name || "",
        lastName: datosUsuario.lastName || "",
        email: datosUsuario.email || "",
        birthDate: datosUsuario.birthDate || "",
        height: parseInt(datosUsuario.height) || 0, // Convertir a número
        aboutMe: datosUsuario.aboutMe || "", // Por defecto "string"
    };

    console.log("Datos transformados para enviar:", datosTransformados);

    // Enviar los datos
    try {
        console.log("entra a try");
        
        if (type === 'update') {
            const respuesta = await userPreferencesUpdate(datosTransformados, tokenSesion);
            console.log("Respuesta del servidor update:", respuesta);
            return respuesta; // Devuelve la respuesta
        } else {
            console.log("entro al else datos transformados");
            
            const respuesta = await userPreferencesAdd(datosTransformados, tokenSesion);
            console.log("Respuesta del servidor add:", respuesta);
            return respuesta; // Devuelve la respuesta
        }
    } catch (error) {
        console.error("Error al enviar los datos:", error);
    }
};
  
