/* eslint-disable no-prototype-builtins */
/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/
import { getToken } from "firebase/messaging";
import { ubicationAdd, userPreferencesAdd, userPreferencesUpdate } from "./api";
import { messaging } from "./firebaseConfig";

const vapidKeyE = import.meta.env.VITE_HELENA_FIREBASE_VAPID_KEY;

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

export const requestAndSetupNotifications = async () => {
  const permission = await askNotificationPermission();
  if (permission === "granted") {
    setupFCM();
  } else {
    console.warn("Permiso denegado para notificaciones");
  }
};

export const askNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  return permission;
};

export const setupFCM = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("entro a notifications");

    try {
      console.log("vapidKeyE", vapidKeyE);
      
      const token = await getToken(messaging, {
        // vapidKey: "BLGzBu_jD9zIhiUhD-M_eimbYRPS0Ppto9yZ9VhA3MvIIfkCnHeTcbP41KgD7Mt77D68Joxg6V3vBANZoHQdHPE", // 🔐 Este lo sacas de Firebase Console > Cloud Messaging
        vapidKey: vapidKeyE, // 🔐 Este lo sacas de Firebase Console > Cloud Messaging
        serviceWorkerRegistration: registration,
      });

      if (token) {
        console.log("📲 FCM Token:", token);
        sessionStorage.setItem("FCMToken", token);
      } else {
        console.warn("🚫 No se obtuvo token. Verifica los permisos.");
      }
    } catch (err) {
      console.error("❌ Error al obtener token FCM:", err);
    }

    // Escucha notificaciones en primer plano
    // onMessage(messaging, (payload) => {
    //   console.log("🔔 Mensaje recibido en primer plano:", payload);
    //   // Puedes mostrar una alerta personalizada si quieres
    //   setNotification(payload.notification);
    // });
  }
};

// Function to obtain gps ubication
export const getUserLocation = ({
  onSuccess = () => {},
  onError = (error) => console.error(error),
}) => {
  if (!("geolocation" in navigator)) {
    const err = new Error(
      "La geolocalización no está soportada en este navegador."
    );
    onError(err);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // console.log("📍 Ubicación obtenida:", { latitude, longitude });
      onSuccess({ latitude, longitude });
    },
    (error) => {
      console.error("❌ Error obteniendo la ubicación:", error);
      onError(error);
    }
  );
};

// Function to obtain ubication name
export const getLocationName = async (latitude, longitude) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    const locationName = data.display_name;
    const delegation = data.address?.county || "Delegación no disponible";

    return { locationName, delegation };
  } catch (error) {
    console.error("❌ Error al obtener el nombre del lugar:", error);
    throw error;
  }
};