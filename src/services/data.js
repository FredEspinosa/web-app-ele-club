/* eslint-disable no-prototype-builtins */
/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/

import { userPreferencesAdd, userPreferencesUpdate } from "./api";

export const limpiarTodoLocalStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// Data del local storage
export const enviarDatosUsuario = async (tokenSesion, type, dataUser, usePhotoGallery = false) => {
  console.log(dataUser);
  
  try {
    const mapData = (key, singularKey) => {
      const value = dataUser?.[key];
      console.log("Value:", value);

      if (!value || !Array.isArray(value)) {
        console.error("Returning empty array due to invalid value.");
        return [];
      }

      if (value.length > 0 && value[0] && value[0].hasOwnProperty(singularKey) && value[0][singularKey] && value[0][singularKey].id) {
        console.log("Processing with singularKey:", singularKey);
        return value.map((item) => item[singularKey].id);
      } else {
        console.error("Processing without singularKey.");
        return value.map((item) => item?.id).filter(Boolean);
      }
    };

    if (type === "update") {
      const datosTransformadosUpdate = {
        genders: mapData("genders", "gender"),
        lookingFors: mapData("lookingFors", "lookingFor"),
        perceptions: mapData("perceptions", "perception"),
        pronouns: mapData("pronouns", "pronoun"),
        relationshipStatus: mapData("relationshipStatus", "relationshipStatus"),
        sexualIdentities: mapData("sexualIdentities", "sexualIdentity"),
        pets: mapData("pets", "pet"),
        roles: mapData("roles", "role"),
        interests: mapData("interests", "interest"),
        zodiacs: mapData("zodiacs", "zodiac"),
        smokes: mapData("smokes", "smoke"),
        userPhotos: usePhotoGallery ? dataUser?.userPhotos : [],
        name: dataUser?.name || "",
        lastName: dataUser?.lastName || "",
        email: dataUser?.email || "",
        birthDate: dataUser?.birthDate ? `${dataUser.birthDate}.000Z` : "",
        height: parseInt(dataUser?.height) || 0,
        aboutMe: dataUser?.aboutMe || "",
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
        birthDate: dataUser.birthDate || "",
        height: parseInt(dataUser.height) || 0,
        aboutMe: dataUser.aboutMe || "",
      };
      const respuesta = await userPreferencesAdd(datosTransformadosAdd, tokenSesion);
      return respuesta; // Devuelve la respuesta
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};
