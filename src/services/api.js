/***** 🤖 En este documento se declaran variables de entorno, endpoints, y funciones para consumo de apis de backend con la librería Axios https://axios-http.com/es/docs/req_config, solo funciones de exportación 🤖 *****/
import axios from "axios";

const hostApi = 'https://lahplataforma.azurewebsites.net/'

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
    profileData: `${hostApi}Profile/Me`,
    userPhotoGet: `${hostApi}UserPhoto`,
    userAddPreferences: `${hostApi}UserPreferences/Add`,
    userUpdatePreferences: `${hostApi}UserPreferences/Update`,
    userMeProfile: `${hostApi}Profile/Me`,
    userIdProfile: `${hostApi}Profile`,
    suscriptionUser: `${hostApi}UserSuscription`, // *
    googleLogin: `${hostApi}Login/Google`, // *
    addUbication: `${hostApi}UserLocation/Add`,
}

export const obtenerImagenPerfil = () => {
    return axios({
        method: 'GET',
        url: endpoints.perfilImagen,
    }).then(response => response.data);
}

export const obtenerImagenPerfilAleatoria = () => {
    return axios({
        method: 'GET',
        url: endpoints.fotoPerfil,
    }).then(response => (
        response, 
        console.log(response)
    ));
}

export const obtenerCodigo = async (numeroTel) => {
      
    let config = {
        method: 'GET',
        url: endpoints.getCode,
        headers: { 
          'Accept': '/',
        },
        params: {
            'phoneNumber': numeroTel,
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data; // Devuelve la data de la respuesta
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error; // Lanza el error para manejarlo en el nivel superior
    }
} 

export const validaCodigoToken = async (telUsuario, codigoIngresado) => {
    let data = {
        'phoneNumber' : telUsuario,
        'code' : codigoIngresado,
    }

    let config = {
        method: 'POST',
        url : endpoints.getCode,
        headers : {
            'Accept': '/',
            'Content-Type': 'application/json',
        },
        data : data
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Pronouns
export const getPronouns = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.pronouns,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data; // Devuelve la data de la respuesta
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error; // Lanza el error para manejarlo en el nivel superior
    }
} 

// Get SexualIdentity
export const getSexualIdentity = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.sexualIdentity,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data; // Devuelve la data de la respuesta
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error; // Lanza el error para manejarlo en el nivel superior
    }
} 

// Get Perception
export const getPerception = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.perception,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data; // Devuelve la data de la respuesta
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error; // Lanza el error para manejarlo en el nivel superior
    }
} 

// Get 
export const getGender = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.genders,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get RelationshipStatus
export const getRelationshipStatus = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.relationshipStatus,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get LookingFor
export const getLookingFor = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.lookingFor,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Role
export const getRole = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.roles,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Interest
export const getInterest = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.interest,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Pet
export const getPet = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.pets,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Zodiac
export const getZodiac = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.zodiacs,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Smoke
export const getSmoke = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.smoke,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get Suscription
export const getSuscription = async () => {
      
    let config = {
        method: 'GET',
        url: endpoints.suscription,
        headers: { 
          'Accept': 'text/plain',
        },
    };
    try {        
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
}

// Get UserPhoto
export const getUserPhoto = async (imgB64) => {
    const dataImg = encodeURIComponent(imgB64); // Asegúrate de codificar el base64

    let config = {
        method: 'GET',
        url: `${endpoints.userPhotoGet}?base64=${dataImg}`,  // Concatenar el base64 a la URL
        headers: { 
            'Accept': 'text/plain',
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

// Get userPreferencesUpdate UserPreferences/Add
export const userPreferencesAdd = async (dataUser, tokenSesion) => {
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
    console.log("tokenSesion userPreferencesUpdate", tokenSesion);
    
    let config = {
        method: "PUT",
        url: endpoints.userUpdatePreferences,
        headers: {
            Accept: "text/plain",
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
        }
    };

    try {
        const response = await axios.request(config);
        console.log("userProfileMe", response);
        return response.data;
    } catch (error) {
        console.error("Error en userPreferencesUpdate:", error);
        throw error;
    }
};

// Get Profile
export const profileUserID = async (tokenSesion, idUser) => {
    console.log("idUser", idUser);
    
    let config = {
        method: "GET",
        url: endpoints.userIdProfile,
        headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenSesion}`,
        },
        params: {
            'userId': idUser,
        },
    };

    try {
        const response = await axios.request(config);
        console.log("profileUserID", response);
        return response.data;
    } catch (error) {
        console.error("Error en userPreferencesUpdate:", error);
        throw error;
    }
};

// Get UserSuscription
export const userSuscription = async (tokenSesion) => {
    let config = {
        method: "POST",
        url: endpoints.suscriptionUser,
        Authorization: `Bearer ${tokenSesion}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: {
            "suscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "stripeTransactionId": "string",
            "stripeStatus": "string"
        }
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en userPreferencesUpdate:", error);
        throw error;
    }
};

// Get GoogleLogin
export const loginGoogle = async (tokenSesion) => {
    let config = {
        method: "POST",
        url: endpoints.suscriptionUser,
        Authorization: `Bearer ${tokenSesion}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: {
            "googleToken": "string"
        }
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en userPreferencesUpdate:", error);
        throw error;
    }
};

// Get GoogleLogin
export const ubicationAdd = async (tokenSesion, ubicacion ) => {

    let config = {
        method: "POST",
        url: endpoints.addUbication,
        Authorization: `Bearer ${tokenSesion}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: {
            "latitude": ubicacion.latitude,
            "longitude": ubicacion.longitude
        }
    };

    try {
        const response = await axios.request(config);        
        return response;;
    } catch (error) {
        console.error("Error en userPreferencesUpdate:", error);
        throw error;
    }
};

// Get ClientSecret for Stripe
export const getClientSecret = async (priceId) => {
    console.log("Api priceId", priceId);
    const config = {
        method: 'POST',
        url: 'http://localhost:3001/create-payment-intent', // Asegúrate de que la URL sea correcta
        headers: {
            'Content-Type': 'application/json',
        },
        data: { priceId }, // Usar data en lugar de body para axios
    };
  
    try {
        const response = await axios.request(config);
        return response.data.clientSecret; // Devuelve el clientSecret
    } catch (error) {
        console.error('Error al obtener el clientSecret:', error);
        throw error;
    }
};
