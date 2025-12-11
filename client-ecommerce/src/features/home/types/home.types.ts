export interface BannerSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    discount: number;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
    category?: string;
}