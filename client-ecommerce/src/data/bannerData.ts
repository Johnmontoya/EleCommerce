import { Assets } from '../assets/assets';
import type { BannerSlide } from '../interfaces/banner';

// Datos locales (mock data)
export const localBannerSlides: BannerSlide[] = [
    {
        id: 1,
        title: 'GAME CONTROLLER',
        subtitle: 'GAMING GEAR',
        description: 'Control inalámbrico original Xbox Series X|S con diseño mejorado, agarre texturizado, cruceta híbrida y conectividad Bluetooth para PC, Xbox y dispositivos móviles.',
        imageUrl: Assets.Slide1,
        discount: 15,
        buttonText: 'SHOP NOW',
        buttonLink: '/products/gaming',
        category: 'gaming'
    },
    {
        id: 2,
        title: 'WIRELESS HEADSET',
        subtitle: 'AUDIO GEAR',
        description: 'Premium sound quality for gamers',
        imageUrl: Assets.Slide2,
        discount: 25,
        buttonText: 'SHOP NOW',
        buttonLink: '/products/audio',
        category: 'audio'
    },
    {
        id: 3,
        title: 'SMART WATCH',
        subtitle: 'WEARABLES',
        description: 'Stay connected on the go',
        imageUrl: Assets.Slide3,
        discount: 23,
        buttonText: 'SHOP NOW',
        buttonLink: '/products/wearables',
        category: 'wearables'
    },
    {
        id: 4,
        title: 'GAMING KEYBOARD',
        subtitle: 'PERIPHERALS',
        description: 'Mechanical switches for pro gamers',
        imageUrl: Assets.Slide4,
        discount: 10,
        buttonText: 'SHOP NOW',
        buttonLink: '/products/peripherals',
        category: 'peripherals'
    },
    {
        id: 5,
        title: 'VR HEADSET',
        subtitle: 'VIRTUAL REALITY',
        description: 'Experience the future of gaming',
        imageUrl: Assets.Slide5,
        discount: 34,
        buttonText: 'SHOP NOW',
        buttonLink: '/products/vr',
        category: 'vr'
    }
];