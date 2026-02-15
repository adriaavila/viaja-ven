import { RoutePreset } from '@/lib/types';

export const routes: RoutePreset[] = [
    {
        id: 'r1',
        slug: 'cafe-strudel',
        title: 'Café & Strudel',
        description: 'Tradición alemana, pausas largas y sabores locales.',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
        experienceSlugs: [
            'cafe-muhstall',
            'strudel-de-manzana',
            'chocolates-moritz',
            'mermeladas-de-montana',
        ],
    },
    {
        id: 'r2',
        slug: 'comida-tipica',
        title: 'Comida típica',
        description: 'Restaurantes clásicos y platos imperdibles.',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
        experienceSlugs: [
            'restaurante-bergland',
            'embutidos-tovarenses',
            'oktoberfest-platter',
            'bratwurst-tradicional',
        ],
    },
    {
        id: 'r3',
        slug: 'en-familia',
        title: 'En familia',
        description: 'Opciones cómodas, accesibles y para todos.',
        imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop',
        experienceSlugs: [
            'fresas-con-crema',
            'mercado-tovarense',
            'paseo-mirador',
            'selva-negra-cake',
        ],
    },
];
