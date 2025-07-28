const API_BASE_URL = 'https://lahplataforma.azurewebsites.net';

export const API_ENDPOINTS = {
    // OFFERS
    GET_OFFER_CATALOG: `${API_BASE_URL}/OfferType`,
    GET_OFFER_CATEGORY_CATALOG_BY_ID: (id) => `${API_BASE_URL}/OfferCategoryCatalog/${id}`,
    GET_OFFER_AVAILABLE: `${API_BASE_URL}/Offer/GetAvailable`,
    GET_OFFER_AVAILABLE_BY_ID: (id) => `${API_BASE_URL}/Offer/GetByOfferType/${id}`,
    GET_OFFER_BY_ID: (id) => `${API_BASE_URL}/Offer/GetById/${id}`,
    CREATE_OFFER: `${API_BASE_URL}/Offer/Create`,
    APPROBE_OFFER: (id) => `${API_BASE_URL}/Manage/Approbe/${id}`,
    UPLOAD_PHOTO: `${API_BASE_URL}/UploadFiles/upload-photo`,
    CHATBOX: {
        DELETE_CHAT: `${API_BASE_URL}/Conversation/Remove`
    },
    GET_USER_EVENTS_SERVICES:(id) => `${API_BASE_URL}/Offer/GetAllByUser/${id}`,
    POST_PARTICIPANTS_ASSIST:`${API_BASE_URL}/OfferParticipants/Create`,
};