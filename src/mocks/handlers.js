import { http } from 'msw';
import { v4 as uuidv4 } from 'uuid';

let CATEGORIES = {
  Eventos: ['gastronomía', 'arte', 'música'],
  Servicios: ['Belleza', 'coaching', 'salud'],
};

let items = [
  {
    id: '827b2f4d-ded1-454c-9f83-73d7173bc9cc',
    assistants: '0',
    distance: '4km de distancia',
    type: 'Eventos',
    owner: 'Compañía o usuario',
    title: 'Festival Gastronómico de Otoño',
    location: [19.4326, -99.1332],
    date: '15/10/2025',
    start: '12:00',
    end: '20:00',
    category: 'gastronomía',
    price: 'Costo',
    amount: '$1,000',
    about:
      'Disfruta de los mejores sabores de la temporada con chefs invitados.',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '4ea26462-5dea-451a-90dd-83cabddc8f74',
    assistants: '0',
    distance: '4km de distancia',
    type: 'Eventos',
    owner: 'Compañía o usuario',
    title: 'Concierto de Jazz al Aire Libre',
    location: [19.426, -99.1677],
    date: '20/11/2025',
    start: '18:00',
    end: '22:00',
    category: 'música',
    price: 'Gratuito',
    about:
      'Una experiencia única con las mejores bandas locales e internacionales de jazz.',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '759eef71-40e2-494e-b09c-0b6099994720',
    assistants: '0',
    distance: '4km de distancia',
    type: 'Eventos',
    owner: 'Compañía o usuario',
    title: 'Exposición de Arte Contemporáneo',
    location: [19.44, -99.15],
    date: '05/12/2025',
    start: '10:00',
    end: '18:00',
    category: 'arte',
    price: 'Costo',
    amount: '$1,000',
    about:
      'Descubre las obras más impactantes de artistas emergentes en la ciudad.',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '04275b8a-d06b-42d4-8f01-8d9121720f6b',
    assistants: '0',
    distance: '4km de distancia',
    type: 'Eventos',
    owner: 'Compañía o usuario',
    title: 'Feria del Chocolate y Café',
    location: [19.42, -99.14],
    date: '10/10/2025',
    start: '11:00',
    end: '19:00',
    category: 'gastronomía',
    price: 'Gratuito',
    about:
      'Endúlzate el día con las mejores propuestas de café y chocolate artesanal.',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '9643929e-8219-4f2d-adb8-08e65952ab84',
    assistants: '0',
    distance: '4km de distancia',
    type: 'Eventos',
    owner: 'Compañía o usuario',
    title: 'Festival Internacional de Música Electrónica',
    location: [19.43, -99.16],
    date: '25/12/2025',
    start: '21:00',
    end: '04:00',
    category: 'música',
    price: 'Costo',
    amount: '$1,000',
    about:
      'Las mejores DJs del mundo en una noche inolvidable de música y luces.',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '3fab08de-0a00-4afc-b2b3-0b42e238fbf0',
    type: 'Servicios',
    title: 'Festival Gastronómico',
    location: [19.4326, -99.1332],
    category: 'Gastronomía',
    price: 'Gratuito',
    amount: '100 asistentes',
    about: 'Un evento para disfrutar de la mejor comida local.',
    includes: 'Degustaciones, música en vivo',
    schedule: '10:00 - 18:00',
    phoneCode: '+52',
    phoneNumber: '5512345678',
    email: 'contacto@festivalgastro.mx',
    website: 'https://festivalgastro.mx',
    instagramLink: 'https://instagram.com/festivalgastro',
    facebookLink: 'https://facebook.com/festivalgastro',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 'd57f8c76-0451-46b1-ba9d-c5e40d958180',
    type: 'Servicios',
    rate: '4.9',
    title: 'Salón de Belleza Glam',
    location: [19.427, -99.1276],
    category: 'Belleza',
    price: 'Costo',
    amount: 'Desde $500',
    about: 'Servicios de estética y cuidado personal premium.',
    includes: 'Corte, peinado, manicure',
    schedule: '09:00 - 20:00',
    phoneCode: '+52',
    phoneNumber: '5598765432',
    email: 'contacto@glambeauty.mx',
    website: 'https://glambeauty.mx',
    instagramLink: 'https://instagram.com/glambeauty',
    facebookLink: 'https://facebook.com/glambeauty',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 'cc7ecbb7-620e-4fbc-93b6-2bc591afc9f8',
    type: 'Servicios',
    title: 'Exposición de Arte Contemporáneo',
    location: [19.435, -99.14],
    category: 'Arte',
    price: 'Costo',
    amount: '$150 entrada general',
    about: 'Muestra de artistas emergentes y consagrados.',
    includes: 'Galería, talleres, conferencias',
    schedule: '11:00 - 19:00',
    phoneCode: '+52',
    phoneNumber: '5511122233',
    email: 'info@arteexpo.mx',
    website: 'https://arteexpo.mx',
    instagramLink: 'https://instagram.com/arteexpo',
    facebookLink: 'https://facebook.com/arteexpo',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 'd8a7fae9-30b9-4e2e-86ca-95ef4d03695c',
    type: 'Servicios',
    rate: '4.9',
    title: 'Clínica de Salud Integral',
    location: [19.4205, -99.145],
    category: 'Salud',
    price: 'Costo',
    amount: 'Consulta desde $700',
    about: 'Atención médica especializada y preventiva.',
    includes: 'Consultas, estudios básicos',
    schedule: '08:00 - 18:00',
    phoneCode: '+52',
    phoneNumber: '5533445566',
    email: 'contacto@clinicasalud.mx',
    website: 'https://clinicasalud.mx',
    instagramLink: 'https://instagram.com/clinicasalud',
    facebookLink: 'https://facebook.com/clinicasalud',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '383cfc46-4c97-45a9-b9eb-457e50c8bc97',
    type: 'Servicios',
    title: 'Concierto Música Indie',
    location: [19.428, -99.132],
    category: 'Música',
    price: 'Costo',
    amount: 'Entrada $300',
    about: 'Presentación de bandas locales independientes.',
    includes: 'Concierto, food trucks',
    schedule: '19:00 - 23:00',
    phoneCode: '+52',
    phoneNumber: '5566778899',
    email: 'tickets@indieconcert.mx',
    website: 'https://indieconcert.mx',
    instagramLink: 'https://instagram.com/indieconcert',
    facebookLink: 'https://facebook.com/indieconcert',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '2fec8f0a-3bfc-443f-bea2-177fadb4158f',
    type: 'Servicios',
    rate: '4.9',
    title: 'Coaching Personal Elite',
    location: [19.4212, -99.135],
    category: 'Coaching',
    price: 'Costo',
    amount: 'Sesión desde $1000',
    about: 'Sesiones de coaching para desarrollo personal.',
    includes: 'Coaching 1 a 1, seguimiento mensual',
    schedule: '10:00 - 19:00',
    phoneCode: '+52',
    phoneNumber: '5512340987',
    email: 'info@elitecoaching.mx',
    website: 'https://elitecoaching.mx',
    instagramLink: 'https://instagram.com/elitecoaching',
    facebookLink: 'https://facebook.com/elitecoaching',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '5ac331b4-6b95-474f-b383-9bc87ecdab21',
    type: 'Servicios',
    title: 'Feria de Libros Independientes',
    location: [19.43, -99.1333],
    category: 'Arte',
    price: 'Gratuito',
    amount: 'Entrada libre',
    about: 'Exhibición y venta de libros de editoriales pequeñas.',
    includes: 'Presentaciones, venta de libros',
    schedule: '10:00 - 17:00',
    phoneCode: '+52',
    phoneNumber: '5511223344',
    email: 'contacto@ferialibros.mx',
    website: 'https://ferialibros.mx',
    instagramLink: 'https://instagram.com/ferialibros',
    facebookLink: 'https://facebook.com/ferialibros',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '63e1107d-5aae-4824-92cf-6b102cb61095',
    type: 'Servicios',
    rate: '4.9',
    title: 'Consultorio Nutricional Vida Sana',
    location: [19.425, -99.129],
    category: 'Salud',
    price: 'Costo',
    amount: 'Plan mensual $1200',
    about: 'Asesoría nutricional personalizada.',
    includes: 'Consultas, planes de alimentación',
    schedule: '09:00 - 17:00',
    phoneCode: '+52',
    phoneNumber: '5556677889',
    email: 'info@vidasana.mx',
    website: 'https://vidasana.mx',
    instagramLink: 'https://instagram.com/vidasana',
    facebookLink: 'https://facebook.com/vidasana',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '49547129-f047-4477-b4da-c57093a8b232',
    type: 'Servicios',
    title: 'Encuentro de Jazz al Aire Libre',
    location: [19.433, -99.136],
    category: 'Música',
    price: 'Gratuito',
    amount: 'Entrada libre',
    about: 'Conciertos gratuitos de bandas de jazz locales.',
    includes: 'Música, picnic, zona de foodtrucks',
    schedule: '16:00 - 21:00',
    phoneCode: '+52',
    phoneNumber: '5519988776',
    email: 'info@jazzencuentro.mx',
    website: 'https://jazzencuentro.mx',
    instagramLink: 'https://instagram.com/jazzencuentro',
    facebookLink: 'https://facebook.com/jazzencuentro',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '6cf6805a-20cd-433c-8f64-693db79f274b',
    type: 'Servicios',
    rate: '4.9',
    title: 'Masajes Relajantes Zen',
    location: [19.4265, -99.1312],
    category: 'Belleza',
    price: 'Costo',
    amount: 'Sesión desde $800',
    about: 'Centro especializado en masajes relajantes.',
    includes: 'Masajes, aromaterapia',
    schedule: '10:00 - 20:00',
    phoneCode: '+52',
    phoneNumber: '5544332211',
    email: 'contacto@zenrelax.mx',
    website: 'https://zenrelax.mx',
    instagramLink: 'https://instagram.com/zenrelax',
    facebookLink: 'https://facebook.com/zenrelax',
    images: [
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1736264335262-8a2c9b81ec26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
];

function generateRandomName() {
  const names = ['Ana', 'Luis', 'Carlos', 'María', 'José', 'Lucía', 'Miguel', 'Sofía', 'Pedro', 'Valeria'];
  const lastNames = ['García', 'Hernández', 'Martínez', 'López', 'Gómez', 'Ramírez'];
  return `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

// Generador de objetos de perfil
function generateProfiles(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    name: generateRandomName(),
    profileImage: `https://randomuser.me/api/portraits/thumb/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`,
    profileLink: `/profile/${i + 1}`,
  }));
}

export const handlers = [
  http.get('/api/categories', () => {
    return Response.json(Object.keys(CATEGORIES));
  }),

  http.get('/api/subcategories', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    if (category && CATEGORIES[category]) {
      return Response.json(CATEGORIES[category]);
    }
    return Response.json([]);
  }),

  http.get('/api/items/:id', ({ params }) => {
    const { id } = params;
    const item = items.find((i) => i.id === id);
    if (!item) {
      return new Response(null, { status: 404 });
    }
    return Response.json(item);
  }),
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const subcategory = url.searchParams.get('subcategory');
    const search = url.searchParams.get('search')?.toLowerCase();

    let result = items;

    if (category) {
      result = result.filter((i) => i.type === category);
    }

    if (subcategory) {
      result = result.filter((i) => i.category === subcategory);
    }

    if (search) {
      result = result.filter((i) => i.title.toLowerCase().includes(search));
    }

    // ✅ Siempre agrupamos por type (en lowercase)
    const grouped = result.reduce((acc, item) => {
      const key = item.type.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    return Response.json(grouped);
  }),

  http.post('/api/items', async ({ request }) => {
    const body = await request.json();
    if (!CATEGORIES[body.category]) {
      return new Response(JSON.stringify({ error: 'Categoría inválida' }), {
        status: 400,
      });
    }
    if (!CATEGORIES[body.category].includes(body.subcategory)) {
      return new Response(JSON.stringify({ error: 'Subcategoría inválida' }), {
        status: 400,
      });
    }
    const newItem = {
      id: uuidv4(),
      assistants: '0',
      distance: '4km de distancia',
      ...body,
    };
    items.push(newItem);
    return new Response(JSON.stringify(newItem), { status: 201 });
  }),

  http.put('/api/items/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Ítem no encontrado' }), {
        status: 404,
      });
    }
    if (updates.category && !CATEGORIES[updates.category]) {
      return new Response(JSON.stringify({ error: 'Categoría inválida' }), {
        status: 400,
      });
    }
    const targetCategory = updates.category || items[index].category;
    const targetSubcategory = updates.subcategory || items[index].subcategory;
    if (!CATEGORIES[targetCategory].includes(targetSubcategory)) {
      return new Response(JSON.stringify({ error: 'Subcategoría inválida' }), {
        status: 400,
      });
    }
    items[index] = { ...items[index], ...updates };
    return new Response(JSON.stringify(items[index]), { status: 200 });
  }),

  http.delete('/api/items/:id', ({ params }) => {
    const { id } = params;
    items = items.filter((i) => i.id !== id);
    return new Response(null, { status: 204 });
  }),
  http.get('/api/assistants', ({ request }) => {
    const url = new URL(request.url);
    const all = url.searchParams.get('all');

    const profiles = generateProfiles(20);
    const result = all === 'true' ? profiles : profiles.slice(0, 4);

    return Response.json(result);
  }),
];
