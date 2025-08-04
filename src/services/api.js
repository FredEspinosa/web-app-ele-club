/***** 🤖 En este documento se declaran variables de entorno, endpoints, y funciones para consumo de apis de backend con la librería Axios https://axios-http.com/es/docs/req_config, solo funciones de exportación 🤖 *****/
import axios from "axios";

export const hostApi = import.meta.env.VITE_HELENA_VITE_API_BASE_URL;

const endpoints = {
  // Por el momento se utiliza una API de fotos de perritos https://dog.ceo/dog-api/breeds-list
  perfilImagen: `https://dog.ceo/api/breeds/image/random`,
  fotoPerfil: `https://randomuser.me/api/?results=10`,
  getCode: `${hostApi}Login`,
  pronouns: `${hostApi}Pronoun`,
  sexualIdentity: `${hostApi}SexualIdentity`,
  perception: `${hostApi}Perception`,
  genders: `${hostApi}Gender`,
  relationshipStatus: `${hostApi}RelationshipStatus`,
  lookingFor: `${hostApi}LookingFor`,
  roles: `${hostApi}Role`,
  interest: `${hostApi}Interest`,
  pets: `${hostApi}Pet`,
  zodiacs: `${hostApi}Zodiac`,
  smoke: `${hostApi}Smoke`,
  suscription: `${hostApi}Suscription`,
  userPhotoGet: `${hostApi}UserPhoto`,
  userAddPreferences: `${hostApi}UserPreferences/Add`,
  userUpdatePreferences: `${hostApi}UserPreferences/Update`,
  userMeProfile: `${hostApi}Profile/Me`,
  userIdProfile: `${hostApi}Profile`,
  suscriptionUser: `${hostApi}UserSuscription`, // *
  googleLogin: `${hostApi}Login/Google`, // *
  addUbication: `${hostApi}UserLocation/Add`,
  getAllConverations: `${hostApi}Conversation/GetAll`,
  createConverations: `${hostApi}Conversation/Create`,
  feedLocation: `${hostApi}Feed`,
  sendMessage: `${hostApi}Message/Send`,
  messageGet: `${hostApi}Message`,
  sendLike: `${hostApi}Likes/Send`,
  sendInviteFriend: `${hostApi}Friends/Invite`,
  friendsMe: `${hostApi}Friends/MyFriends`,
  requestsFriends: `${hostApi}Friends/Requests`,
  responseFriends: `${hostApi}Friends/ResponseRequest`,
  matchesMe: `${hostApi}Matches/MyMatches`,
  loguinFirebase: `${hostApi}Login`,
  likesMe:`${hostApi}Likes/Me`,
  createReview:`${hostApi}Review/Create`,
};

export const obtenerImagenPerfil = () => {
  return axios({
    method: "GET",
    url: endpoints.perfilImagen,
  }).then((response) => response.data);
};

export const obtenerImagenPerfilAleatoria = () => {
  return axios({
    method: "GET",
    url: endpoints.fotoPerfil,
  }).then((response) => (response, console.log(response)));
};

export const obtenerCodigo = async (numeroTel) => {
  let config = {
    method: "GET",
    url: endpoints.getCode,
    headers: {
      Accept: "/",
    },
    params: {
      phoneNumber: numeroTel,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data; // Devuelve la data de la respuesta
  } catch (error) {
    console.error("Error en obtenerCodigo:", error);
    throw error; // Lanza el error para manejarlo en el nivel superior
  }
};

export const validaCodigoToken = async (telUsuario, codigoIngresado, tokenFCM) => {
  let data = {
    phoneNumber: telUsuario,
    code: codigoIngresado,
    skip: true,
    registrationToken: tokenFCM,
  };

  console.log("data login", data);

  let config = {
    method: "POST",
    url: endpoints.getCode,
    headers: {
      Accept: "/",
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en validaCodigoToken:", error);
    throw error;
  }
};

// Get Pronouns
export const getPronouns = async () => {
  let config = {
    method: "GET",
    url: endpoints.pronouns,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data; // Devuelve la data de la respuesta
  } catch (error) {
    console.error("Error en Pronouns:", error);
    throw error; // Lanza el error para manejarlo en el nivel superior
  }
};

// Get SexualIdentity
export const getSexualIdentity = async () => {
  let config = {
    method: "GET",
    url: endpoints.sexualIdentity,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data; // Devuelve la data de la respuesta
  } catch (error) {
    console.error("Error en SexualIdentity:", error);
    throw error; // Lanza el error para manejarlo en el nivel superior
  }
};

// Get Perception
export const getPerception = async () => {
  let config = {
    method: "GET",
    url: endpoints.perception,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data; // Devuelve la data de la respuesta
  } catch (error) {
    console.error("Error en Perception:", error);
    throw error; // Lanza el error para manejarlo en el nivel superior
  }
};

// Get Gender
export const getGender = async () => {
  let config = {
    method: "GET",
    url: endpoints.genders,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Gender:", error);
    throw error;
  }
};

// Get RelationshipStatus
export const getRelationshipStatus = async () => {
  let config = {
    method: "GET",
    url: endpoints.relationshipStatus,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en RelationshipStatus:", error);
    throw error;
  }
};

// Get LookingFor
export const getLookingFor = async () => {
  let config = {
    method: "GET",
    url: endpoints.lookingFor,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en LookingFor:", error);
    throw error;
  }
};

// Get Role
export const getRole = async () => {
  let config = {
    method: "GET",
    url: endpoints.roles,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Role:", error);
    throw error;
  }
};

// Get Interest
export const getInterest = async () => {
  let config = {
    method: "GET",
    url: endpoints.interest,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Interest:", error);
    throw error;
  }
};

// Get Pet
export const getPet = async () => {
  let config = {
    method: "GET",
    url: endpoints.pets,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Pet:", error);
    throw error;
  }
};

// Get Zodiac
export const getZodiac = async () => {
  let config = {
    method: "GET",
    url: endpoints.zodiacs,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Zodiac:", error);
    throw error;
  }
};

// Get Smoke
export const getSmoke = async () => {
  let config = {
    method: "GET",
    url: endpoints.smoke,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Smoke:", error);
    throw error;
  }
};

// Get Suscription
export const getSuscription = async () => {
  let config = {
    method: "GET",
    url: endpoints.suscription,
    headers: {
      Accept: "text/plain",
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Suscription:", error);
    throw error;
  }
};

// Get UserPhoto
export const getUserPhoto = async (imgB64) => {
  const dataImg = encodeURIComponent(imgB64); // Asegúrate de codificar el base64
  let config = {
    method: "GET",
    url: endpoints.userPhotoGet, // Concatenar el base64 a la URL
    headers: {
      Accept: "text/plain",
    },
    params: {
      base64: dataImg,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en getUserPhoto:", error);
    throw error;
  }
};

// Delete UserPhoto
export const deleteUserPhoto = async (imgId, token) => {
  let config = {
    method: "DELETE",
    url: endpoints.userPhotoGet,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: imgId,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en deleteUserPhoto:", error);
    throw error;
  }
};

// Get userPreferencesUpdate UserPreferences/Add
export const userPreferencesAdd = async (dataUser, tokenSesion) => {
  console.log("data user userPreferencesAdd", dataUser);
  console.log("tokenSesion userPreferencesAdd", tokenSesion);
  let config = {
    method: "POST",
    url: endpoints.userAddPreferences,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: dataUser,
  };

  try {
    const response = await axios.request(config);
    console.log("response api", response);

    return response; // Devuelve la respuesta completa
  } catch (error) {
    console.error("Error en userPreferencesAdd:", error);
    throw error;
  }
};

// Get userPreferencesUpdate
export const userPreferencesUpdate = async (dataUser, tokenSesion) => {
  let config = {
    method: "POST",
    url: endpoints.userUpdatePreferences,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: dataUser,
  };

  try {
    const response = await axios.request(config);
    console.log("Respuesta de la API:", response); // Verifica el contenido de response
    return response.data;
  } catch (error) {
    console.error("Error en userPreferencesUpdate:", error);
    throw error;
  }
};

// Get Profile/Me
export const userProfileMe = async (tokenSesion) => {
  let config = {
    method: "GET",
    url: endpoints.userMeProfile,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Profile/Me:", error);
    throw error;
  }
};

// Get Profile
export const profileUserID = async (tokenSesion, idUser) => {
  let config = {
    method: "GET",
    url: endpoints.userIdProfile,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    params: {
      userId: idUser,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en profileUserID:", error);
    throw error;
  }
};

// Get UserSuscription
export const userSuscription = async (tokenSesion) => {
  let config = {
    method: "POST",
    url: endpoints.suscriptionUser,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: {
      suscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      stripeTransactionId: "string",
      stripeStatus: "string",
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en UserSuscription:", error);
    throw error;
  }
};

// Get GoogleLogin
export const loginGoogle = async (tokentCodeGoogle, tokenFCM) => {
  let config = {
    method: "POST",
    url: endpoints.googleLogin,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    data: {
      googleToken: tokentCodeGoogle,
      registrationToken: tokenFCM,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error en GoogleLogin:", error);
    throw error;
  }
};

// Get ubicationAdd
export const ubicationAdd = async (tokenSesion, ubicacion) => {
  let config = {
    method: "POST",
    url: endpoints.addUbication,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: {
      latitude: ubicacion.latitude,
      longitude: ubicacion.longitude,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error en ubicationAdd:", error);
    throw error;
  }
};

// Get ClientSecret for Stripe
export const getClientSecret = async (priceId) => {
  // console.log("Api priceId", priceId);
  const config = {
    method: "POST",
    url: "http://localhost:3001/create-payment-intent", // Asegúrate de que la URL sea correcta
    headers: {
      "Content-Type": "application/json",
    },
    data: { priceId }, // Usar data en lugar de body para axios
  };

  try {
    const response = await axios.request(config);
    return response.data.clientSecret; // Devuelve el clientSecret
  } catch (error) {
    console.error("Error al obtener el clientSecret:", error);
    throw error;
  }
};

export const getGoogleSecretLogin = async (token) => {
  const config = {
    method: "POST",
    url: "http://localhost:3001/crear_cuenta", // Asegúrate de que la URL sea correcta
    headers: {
      "Content-Type": "application/json",
    },
    data: { token }, // Usar data en lugar de body para axios
  };

  try {
    const response = await axios.request(config);
    return response.data.clientSecret; // Devuelve el clientSecret
  } catch (error) {
    console.error("Error al obtener el getGoogleSecretLogin:", error);
    throw error;
  }
};

// Chats Conversation/GetAll
export const conversationGetAll = async (tokenSesion) => {
  let config = {
    method: "GET",
    url: endpoints.getAllConverations,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };

  try {
    const response = await axios.request(config);
    // console.log("userProfileMe", response);
    return response.data;
  } catch (error) {
    console.error("Error en conversationGetAll:", error);
    throw error;
  }
};

// Get FEED
export const locationFeed = async (tokenSesion, data) => {
  let config = {
    method: "POST",
    url: endpoints.feedLocation,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: {
      feedRequest: {
        // Enviar dentro del campo 'feedRequest'
        latitude: data.latitude,
        longitude: data.longitude,
      },
    },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error en FEED:", error);
    throw error;
  }
};

// Get Like/Send
export const likeSend = async (tokenSesion, data) => {
  let config = {
    method: "POST",
    url: endpoints.sendLike,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: {
      likedUserId: data.likedUserId,
      liked: data.liked,
    },
  };
  try {
    const response = await axios.request(config);
    // console.log("userProfileMe", response);
    return response.data;
  } catch (error) {
    console.error("Error en Like/Send", error);
    throw error;
  }
};

// Get ConversationCreate
export const conversationCreate = async (tokenSesion, data) => {
  let config = {
    method: "POST",
    url: endpoints.createConverations,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log("response conversationCreate", response);

    return response;
  } catch (error) {
    console.error("Error en ConversationCreate:", error);
    throw error;
  }
};

// Get MessageSend
export const messageSend = async (tokenSesion, data) => {
  console.log("data", data);

  let config = {
    method: "POST",
    url: endpoints.sendMessage,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error en MessageSend:", error);
    throw error;
  }
};

// Get Message
export const getMessage = async (tokenSesion, conversationId) => {
  let config = {
    method: "GET",
    url: endpoints.messageGet,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    params: {
      conversationId: conversationId,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error en MessageSend:", error);
    throw error;
  }
};

// Get Friends/Invite
export const friendsInvite = async (tokenSesion, toUserId) => {
  let config = {
    method: "POST",
    url: endpoints.sendInviteFriend + "/" + toUserId,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error en Friends/Invite:", error);
    throw error;
  }
};

// Get MyFriends
export const myFriends = async (tokenSesion) => {
  let config = {
    method: "GET",
    url: endpoints.friendsMe,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error en Get MyFriends:", error);
    throw error;
  }
};

// Get Friends/Requests
export const friendsRequests = async (tokenSesion) => {
  let config = {
    method: "GET",
    url: endpoints.requestsFriends,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };
  try {
    const response = await axios.request(config);
    console.log("friendsRequests", response);
    return response.data;
  } catch (error) {
    console.error("Error en Friends/Requests:", error);
    throw error;
  }
};

// Get Friends/Response
export const friendsResponse = async (tokenSesion, friendRequestId, accept) => {
  let config = {
    method: "POST",
    url: endpoints.responseFriends,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
    data: {
      friendRequestId: friendRequestId,
      accept: accept,
    },
  };
  try {
    const response = await axios.request(config);
    console.log("friendsRequests", response);
    return response.data;
  } catch (error) {
    console.error("Error en Friends/Response:", error);
    throw error;
  }
};

// Get Matches/MyMatches`,
export const matchesMyMatches = async (tokenSesion) => {
  let config = {
    method: "GET",
    url: endpoints.matchesMe,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };
  try {
    const response = await axios.request(config);
    console.log("matchesMyMatches", response);
    return response.data;
  } catch (error) {
    console.error("Error en Matches/Response:", error);
    throw error;
  }
};

export const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error en la petición");
    return res.json();
});

// Get Likes/Me`,
export const likesMyLikes = async (tokenSesion) => {
  let config = {
    method: "GET",
    url: endpoints.likesMe,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenSesion}`,
    },
  };
  try {
    const response = await axios.request(config);
    console.log("matchesMyMatches", response);
    return response.data;
  } catch (error) {
    console.error("Error en Matches/Response:", error);
    throw error;
  }
};

const getToken = () => sessionStorage.getItem("AccessToken");
export const fetcherWithToken = async (url) => {
  const token = getToken();
  if (!token) throw new Error('Token no proporcionado.');

  const response = await fetch(url, {
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(errorInfo.message || 'Error en la petición a la API.');
  }
  return response.json();
};

// Get Review/Create
export const reviewCreate = async (id, userId, rating, comment) => {
  const token = getToken();
  let config = {
    method: "POST",
    url: endpoints.createReview,
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      offerId: id,
      userId: userId,
      rating: rating,
      comment: comment,
    },
  };
  try {
    const response = await axios.request(config);
    console.log("reviewCreate", response);
    return response.data;
  } catch (error) {
    console.error("Error en Review/Create: ", error);
    throw error;
  }
};

export const consultOffert = async () => {
  const token = getToken();
  let config = {
    method: "GET",
    url: "https://lahplataforma.azurewebsites.net/Offer/GetAllByUser?typeId=ab983407-1efb-4025-94cb-55388a32266f",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // data: {
    //   offerId: "id",
    //   userId: userId,
    //   rating: rating,
    //   comment: comment,
    // },
  };
  try {
    const response = await axios.request(config);
    console.log("consultOffert", response);
    return response.data;
  } catch (error) {
    console.error("Error en Review/Create: ", error);
    throw error;
  }
};
