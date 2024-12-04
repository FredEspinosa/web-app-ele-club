/***** 🤖 En este documento se declaran variables de entorno, endpoints, y funciones para consumo de apis de backend con la librería Axios https://axios-http.com/es/docs/req_config, solo funciones de exportación 🤖 *****/
import axios from "axios";

const hostApi = 'https://lahplataforma.azurewebsites.net/'

const endpoints = {
    // Por el momento se utiliza una API de fotos de perritos https://dog.ceo/dog-api/breeds-list
    perfilImagen: `https://dog.ceo/api/breeds/image/random`,
    fotoPerfil: `https://randomuser.me/api/?results=10`,
    getCode: `${hostApi}Login`,
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

// export const obtenerCodigo = (numeroTel) => {
//     return axios({
//         method: 'GET',
//         url: endpoints.getCode,
//         headers: {
//             'Accept': '/',
//         },
//         params: {
//             'phoneNumber': numeroTel,
//         },
//     }).then(response => response.data);
// }

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