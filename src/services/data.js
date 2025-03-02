/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/

import { userPreferencesAdd, userPreferencesUpdate } from "./api";

export const limpiarTodoLocalStorage = () => {
    localStorage.clear()
    sessionStorage.clear()
}

// Data del local storage
export const enviarDatosUsuario = async (tokenSesion, type, dataUser) => {
    console.log("type", type);
    console.log("dataUser data", dataUser);
    
    const datosTransformados = {
        genders: dataUser.genders?.map((item) => item.id) || [],
        lookingFors: dataUser.lookingFors?.map((item) => item.id) || [],
        perceptions: dataUser.perceptions?.map((item) => item.id) || [],
        pronouns: dataUser.pronouns?.map((item) => item.id) || [],
        relationshipStatus: dataUser.relationshipStatus?.map((item) => item.id) || [],
        sexualIdentities: dataUser.sexualIdentities?.map((item) => item.id) || [],
        pets: dataUser.pets?.map((item) => item.id) || [],
        roles: dataUser.roles?.map((item) => item.id) || [],
        interests: dataUser.interests?.map((item) => item.id) || [],
        zodiacs: dataUser.zodiacs?.id ? [dataUser.zodiacs.id] : [], // Solo el ID
        smokes: dataUser.smokes?.map((item) => item.id) || [],
        userPhotos: dataUser.userPhotos || [],
        name: dataUser.name || "",
        lastName: dataUser.lastName || "",
        email: dataUser.email || "",
        birthDate: dataUser.birthDate || "",
        height: parseInt(dataUser.height) || 0, // Convertir a número
        aboutMe: dataUser.aboutMe || "", // Por defecto "string"
    };
    console.log("Datos transformados para enviar:", datosTransformados);

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
  
