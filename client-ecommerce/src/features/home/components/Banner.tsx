import { useState, useCallback, useEffect } from "react";
import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useBannerProducts } from "../hooks/useShowcase";
import LoadingFallback from "../../../shared/ui/LoadingFallback";

type PropType = {
    options?: EmblaOptionsType;
}

const Banner = (props: PropType) => {
    const { options } = props;
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Obtener slides (local o API)
    const { data: slides, isLoading, error } = useBannerProducts();
    
    // Configurar Autoplay
    const [emblaRef, emblaApi] = useEmblaCarousel(
        options, 
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    )

    // Sincronizar el indicador con el slide actual
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCurrentSlide(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    // Función para ir a un slide específico
    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
    }, [emblaApi])

    // Loading state
    if (isLoading) {
        return (
            <LoadingFallback />
        );
    }

    // Error state
    if (error) {
        console.error('Banner error:', error);
    }

    return (
        <section className="w-full mx-auto px-4 py-8 grid justify-center items-center gap-6">
            {/* Main Banner */}
            <div className="max-w-7xl lg:col-span-2 drop-shadow-xl/50 drop-shadow-black-500/50">
                <div className="embla overflow-hidden rounded-xl">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container flex">
                            {slides?.map((slide) => (
                                <div
                                    key={slide.id} 
                                    className="embla__slide flex-[0_0_100%] min-w-0 relative"
                                >
                                    <div 
                                        className="w-full h-[568px] p-12 text-white relative overflow-hidden"
                                        style={{
                                            backgroundImage: `url(${slide.promotionalData?.bannerImageUrl})`, 
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {/* Overlay oscuro para mejor legibilidad */}
                                        <div className="absolute inset-0 bg-black/30" />
                                        
                                        <div className="relative z-10 max-w-xl">
                                            <p className="text-amber-400 mb-4">Descuento del {slide.priceDiscount}% OFF</p>
                                            <p className="text-sm font-medium mb-2 uppercase">
                                                {slide.brand}
                                            </p>
                                            <h2 className="text-5xl font-bold mb-4">
                                                {slide.name}
                                            </h2>
                                            <p className="text-blue-200 mb-6">
                                                {slide.description}
                                            </p>
                                            <Link 
                                                to={`/products/${slide.slug}`}
                                                className="w-40 flex flex-row justify-center items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                                            >
                                                {" Comprar"}
                                                <FaArrowRight size={14} />
                                            </Link>
                                        </div>
                                        
                                        {/* Indicadores dentro del slide */}
                                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                            {slides.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`h-2 rounded-full transition-all ${
                                                        idx === currentSlide 
                                                            ? "bg-white w-8" 
                                                            : "bg-white/50 w-2"
                                                    }`}
                                                    onClick={() => scrollTo(idx)}
                                                    aria-label={`Go to slide ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            
        </section>
    );
};

export default Banner;