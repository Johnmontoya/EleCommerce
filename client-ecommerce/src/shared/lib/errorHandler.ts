import { AxiosError } from "axios";
import { toast } from "sonner";

interface ValidationError {
    [key: string]: string[];
}

interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: ValidationError;
}

export const handleApiError = (error: unknown, defaultMessage: string = 'Error al procesar la solicitud') => {
    if (error instanceof AxiosError) {
        const response = error.response?.data as ApiErrorResponse;

        // Si hay errores de validación
        if (response?.errors) {
            const errorMessages = formatValidationErrors(response.errors);

            toast.error('Errores de validación', {
                description: errorMessages.map((msg) => msg).join(' , '),
                duration: 7000,
            });

            return;
        }

        // Si hay un mensaje de error del servidor
        if (response?.message) {
            toast.error('Error', {
                description: response.message,
            });
            return;
        }

        // Errores HTTP comunes
        switch (error.response?.status) {
            case 400:
                toast.error('Solicitud incorrecta', {
                    description: 'Por favor verifica los datos ingresados',
                });
                break;
            case 401:
                toast.error('No autorizado', {
                    description: 'Debes iniciar sesión para continuar',
                });
                break;
            case 403:
                toast.error('Acceso denegado', {
                    description: 'No tienes permisos para realizar esta acción',
                });
                break;
            case 404:
                toast.error('No encontrado', {
                    description: 'El recurso solicitado no existe',
                });
                break;
            case 422:
                toast.error('Datos inválidos', {
                    description: 'Los datos enviados no son válidos',
                });
                break;
            case 500:
                toast.error('Error del servidor', {
                    description: 'Ocurrió un error interno, intenta más tarde',
                });
                break;
            default:
                toast.error('Error', {
                    description: error.message || defaultMessage,
                });
        }
    } else if (error instanceof Error) {
        toast.error('Error', {
            description: error.message,
        });
    } else {
        toast.error('Error', {
            description: defaultMessage,
        });
    }
}

const formatValidationErrors = (errors: ValidationError): string[] => {
    const messages: string[] = [];

    const fieldNames: Record<string, string> = {
        name: 'Nombre',
        slug: 'URL amigable',
        description: 'Descripción',
        price: 'Precio',
        priceDiscount: 'Precio con descuento',
        stock: 'Stock',
        sku: 'SKU',
        barcode: 'Código de barras',
        brand: 'Marca',
        category: 'Categoría',
        images: 'Imágenes',
        tags: 'Etiquetas',
        dimensions: 'Dimensiones',
        shipping: 'Envío',
    };

    Object.entries(errors).forEach(([field, fieldErrors]) => {
        const fieldName = fieldNames[field] || field;
        fieldErrors.forEach(errorMsg => {
            messages.push(`${fieldName}: ${errorMsg}`);
        });
    });

    return messages;
};

/**
 * Formatea errores para mostrar en línea (formularios)
 */
export const getFieldError = (errors: ValidationError | undefined, fieldName: string): string | undefined => {
    if (!errors || !errors[fieldName]) return undefined;
    return errors[fieldName][0]; // Retorna el primer error
};

/**
 * Hook para manejar errores en mutations
 */
export const useMutationErrorHandler = () => {
    return {
        onError: (error: unknown) => {
            handleApiError(error);
        },
    };
};