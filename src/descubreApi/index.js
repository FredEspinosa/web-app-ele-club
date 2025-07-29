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
    BLOCKED_USERS : {
        BLOCK_USER: `${API_BASE_URL}/UserBlock/Block`,
        GET_BLOCKED_USERS: `${API_BASE_URL}/UserBlock/Blocked`,
        UNBLOCK_USER: `${API_BASE_URL}/UserBlock/Unblock`
    }
};