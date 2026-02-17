import sharp from 'sharp';

export interface ImageProcessOptions {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export class ImageProcessor {
    static async processImage(
        buffer: Buffer,
        options: ImageProcessOptions = {}
    ): Promise<Buffer> {
        const {
            width = 600,
            height = 600,
            quality = 85,
            fit = 'cover'
        } = options;

        try {

            const processedImage = await sharp(buffer)
                // Redimensionar
                .resize(width, height, {
                    fit: fit,
                    position: 'center',
                    background: { r: 255, g: 255, b: 255, alpha: 1 }
                })
                // Convertir a WebP
                .webp({
                    quality: quality,
                    effort: 4 // Balance entre velocidad y compresión (0-6)
                })
                .toBuffer();

            return processedImage;
        } catch (error) {
            console.error('❌ Error al procesar imagen:', error);
            throw new Error('Error al procesar la imagen');
        }
    }

    /**
     * Genera múltiples tamaños de la misma imagen
     * @param buffer - Buffer de la imagen original
     * @returns Objeto con diferentes tamaños
     */
    static async generateResponsiveSizes(buffer: Buffer): Promise<{
        thumbnail: Buffer;
        small: Buffer;
        medium: Buffer;
        large: Buffer;
    }> {
        try {

            const [thumbnail, small, medium, large] = await Promise.all([
                sharp(buffer)
                    .resize(600, 600, { fit: 'cover' })
                    .webp({ quality: 85 })
                    .toBuffer(),
            ]);

            return { thumbnail, small, medium, large };
        } catch (error) {
            console.error('❌ Error al generar tamaños:', error);
            throw new Error('Error al generar tamaños responsivos');
        }
    }

    /**
     * Obtiene metadata de la imagen
     * @param buffer - Buffer de la imagen
     * @returns Metadata de la imagen
     */
    static async getImageMetadata(buffer: Buffer): Promise<{
        width: number;
        height: number;
        format: string;
        size: number;
    }> {
        try {
            const metadata = await sharp(buffer).metadata();

            return {
                width: metadata.width || 0,
                height: metadata.height || 0,
                format: metadata.format || 'unknown',
                size: buffer.length
            };
        } catch (error) {
            console.error('❌ Error al obtener metadata:', error);
            throw new Error('Error al obtener metadata de la imagen');
        }
    }

    /**
     * Optimiza imagen sin cambiar dimensiones
     * @param buffer - Buffer de la imagen original
     * @returns Buffer de la imagen optimizada
     */
    static async optimizeImage(buffer: Buffer): Promise<Buffer> {
        try {
            const metadata = await sharp(buffer).metadata();

            // Si ya es WebP, solo optimizar
            if (metadata.format === 'webp') {
                return await sharp(buffer)
                    .webp({ quality: 85, effort: 4 })
                    .toBuffer();
            }

            // Si no es WebP, convertir y optimizar
            return await sharp(buffer)
                .webp({ quality: 85, effort: 4 })
                .toBuffer();
        } catch (error) {
            console.error('❌ Error al optimizar imagen:', error);
            throw new Error('Error al optimizar la imagen');
        }
    }
}