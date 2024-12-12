/***** ☠️ En este documento se declaran funciones globales que ayuden al no ser repetitivo en el código, solo funciones de exportación ☠️ *****/

export const limpiarTodoLocalStorage = () => {
    localStorage.clear()
}

// Data del local storage
const localStorageData = {
    "Telefono": "5951126879",
    "CodigoPais": "+52",
    "Nombres": "Luis Alfredo",
    "Apellidos": "Espinosa Cabalero",
    "FechaNacimiento": "1991-11-26",
    "Correo": "alfredodicio490@gmail.com",
    "Edad": 33,
    "Estatura": "173 cm",
    "Pronombre": ["Ella/él", "Ella"],
    "IdentidadSexual": ["Pansexual", "Demisexual"],
    "Percibes": ["Masc", "Fem"],
    "IdentidadDeGenero": ["Mujer Trans", "No-Binarie"],
    "EstatusRelacion": ["En citas", "En pareja"],
    "Busca": ["Citas", "Relación Monógama"],
    "Rol": ["Pasiva"],
    "Intereses": ["Astrology", "Mental health walks", "Deep chats", "Writing", "Art"],
    "Mascotas": ["Otras mascotas", "No me gustan las mascotas"],
    "SignoZodiacal": "Sagitario",
    "Fumas": ["Weed", "Vape"]
};

// Función para transformar los datos
const transformData = (data) => {
    return {
        userProfile: {
            userId: "", // Campo vacío por defecto
            userName: null, // No está en la data original
            name: data.Nombres || null,
            lastName: data.Apellidos || null,
            email: data.Correo || null,
            phone: data.Telefono || null,
            birthDate: data.FechaNacimiento || null,
            height: data.Estatura ? parseInt(data.Estatura) : null, // Convierte "173 cm" a número
            aboutMe: null, // No está en la data original
            match: false, // Valor por defecto
            friend: false, // Valor por defecto
            friendRequest: false, // Valor por defecto
            genders: data.IdentidadDeGenero || [],
            lookingFors: data.Busca || [],
            perceptions: data.Percibes || [],
            pronouns: data.Pronombre || [],
            relationshipStatus: data.EstatusRelacion || [],
            sexualIdentities: data.IdentidadSexual || [],
            pets: data.Mascotas || null,
            roles: data.Rol || null,
            interests: data.Intereses || null,
            zodiacs: data.SignoZodiacal ? [data.SignoZodiacal] : null, // Convierte a array
            smokes: data.Fumas || null,
            userPhotos: [] // Campo vacío por defecto
        },
        result: null, // Valor por defecto
        isSuccess: false, // Valor por defecto
        message: "Token inválido para el UserId" // Mensaje por defecto
    };
};

// Transforma los datos
const transformedData = transformData(localStorageData);

// Muestra la data transformada
console.log(transformedData);
  
