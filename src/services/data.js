/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/

import { userPreferencesAdd, userPreferencesUpdate } from "./api";

export const limpiarTodoLocalStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// Data del local storage
export const enviarDatosUsuario = async (tokenSesion, type, dataUser, component=false) => {
  console.log("type", type);
  console.log("data.js => dataUser", dataUser);

  try {
    console.log("entra a try");

    if (type === "update") {
      const datosTransformadosUpdate = {
        genders: (component) ? dataUser?.genders?.map((item) => item.gender.id) : dataUser.genders?.id ? [dataUser.genders.id] : [],
        lookingFors: (component) ? dataUser?.lookingFors?.map((item) => item.lookingFor.id) : dataUser.lookingFors?.id ? [dataUser.lookingFors.id] : [],
        perceptions: (component) ? dataUser?.perceptions?.map((item) => item.perception.id) : dataUser.perceptions?.id ? [dataUser.perceptions.id] : [],
        pronouns: dataUser.pronouns?.map((item) => item.id) || [],
        relationshipStatus: dataUser.relationshipStatus?.map((item) => item.id) || [],
        sexualIdentities: (component) ? dataUser?.sexualIdentities?.map((item) => item.sexualIdentity.id) : dataUser.sexualIdentities?.id ? [dataUser.sexualIdentities.id] : [],
        pets: dataUser.pets?.map((item) => item.id) || [],
        roles: dataUser.roles?.map((item) => item.id) || [],
        interests: dataUser.interests?.map((item) => item.id) || [],
        zodiacs: dataUser.zodiacs?.id ? [dataUser.zodiacs.id] : [],
        smokes: dataUser.smokes?.map((item) => item.id) || [],
        userPhotos: (component) ? dataUser.userPhotos || [] : [],
        name: dataUser.name || "",
        lastName: dataUser.lastName || "",
        email: dataUser.email || "",
        birthDate: `${dataUser.birthDate}.000Z` || "",
        height: parseInt(dataUser.height) || 0,
        aboutMe: dataUser.aboutMe || "",
      };
      console.log({ datosTransformadosUpdate });
      const respuesta = await userPreferencesUpdate(datosTransformadosUpdate, tokenSesion);
      return respuesta;
    } else {
      const datosTransformadosAdd = {
        genders: dataUser.genders?.map((item) => item.id) || [],
        lookingFors: dataUser.lookingFors?.map((item) => item.id) || [],
        perceptions: dataUser.perceptions?.map((item) => item.id) || [],
        pronouns: dataUser.pronouns?.map((item) => item.id) || [],
        relationshipStatus: dataUser.relationshipStatus?.map((item) => item.id) || [],
        sexualIdentities: dataUser.sexualIdentities?.map((item) => item.id) || [],
        pets: dataUser.pets?.map((item) => item.id) || [],
        roles: dataUser.roles?.map((item) => item.id) || [],
        interests: dataUser.interests?.map((item) => item.id) || [],
        zodiacs: dataUser.zodiacs?.id ? [dataUser.zodiacs.id] : [],
        smokes: dataUser.smokes?.map((item) => item.id) || [],
        userPhotos: dataUser.userPhotos || [],
        name: dataUser.name || "",
        lastName: dataUser.lastName || "",
        email: dataUser.email || "",
        birthDate: `${dataUser.birthDate}.000Z` || "",
        height: parseInt(dataUser.height) || 0,
        aboutMe: dataUser.aboutMe || "",
      };
      console.log("entro al else datos transformados");
      const respuesta = await userPreferencesAdd(datosTransformadosAdd, tokenSesion);
      return respuesta; // Devuelve la respuesta
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};
