/***** 🤖 En este documento se declaran variables de entorno, endpoints, y funciones para consumo de apis de backend con la librería Axios https://axios-http.com/es/docs/req_config, solo funciones de exportación 🤖 *****/
import axios from "axios";

const endpoints = {
    // Por el momento se utiliza una API de fotos de perritos https://dog.ceo/dog-api/breeds-list
    perfilImagen: `https://dog.ceo/api/breeds/image/random`,
    fotoPerfil: `https://randomuser.me/api/?results=10`,
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