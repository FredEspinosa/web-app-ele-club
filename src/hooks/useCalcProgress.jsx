export function useCalcProgress(userProfile) {
    let completitud = 0;
  
    // Verificar campos individuales
    // if (userProfile.userName !== null) {
    //   completitud += 0.5;
    // }
    if (userProfile.aboutMe !== null) {
      completitud += 0.5;
    }
  
    // Arreglos a verificar
    const arreglos = [
      'genders',
      'lookingFors',
      'perceptions',
      'pronouns',
      'relationshipStatus',
      'sexualIdentities',
      'pets',
      'roles',
      'interests',
      'zodiacs',
      'smokes',
      'userPhotos',
    ];
  
    // Verificar la presencia de elementos en los arreglos
    arreglos.forEach((arreglo) => {
      if (userProfile[arreglo] && userProfile[arreglo].length > 0) {
        completitud += 0.288;
      }
    });
  
    // Devolver el entero más cercano
    return Math.round(completitud);
  }