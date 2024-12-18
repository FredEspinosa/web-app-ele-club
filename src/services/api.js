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
    userUpdatePreferences: `${hostApi}UserPreferences/Update`,
    userMeProfile: `${hostApi}Profile/Me`,
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

// Get userPreferencesUpdate
export const userPreferencesUpdate = async (dataUser) => {
    let config = {
        method: "PUT",
        url: endpoints.userUpdatePreferences,
        headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
        },
        data: dataUser,
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("Error en userPreferencesUpdate:", error);
        throw error;
    }
};

// Get Profile/Me
export const userProfileMe = async () => {
    let config = {
        method: "GET",
        url: endpoints.userMeProfile,
        headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
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