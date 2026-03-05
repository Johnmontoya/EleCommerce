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
        <section className="w-full mx-auto px-4 py-8 grid justify-center items-center gap-6 mt-4">
            {/* Main Banner */}
            <div className="max-w-7xl lg:col-span-3">
                <div className="embla overflow-hidden border border-zinc-800 bg-[#050505] relative">
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] z-20" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] z-20" />

                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container flex">
                            {slides?.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="embla__slide flex-[0_0_100%] min-w-0 relative"
                                >
                                    <div
                                        className="w-full h-[568px] p-8 md:p-16 text-white relative overflow-hidden flex items-y-center"
                                        style={{
                                            backgroundImage: `url(${slide.promotionalData?.bannerImageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {/* Overlay oscuro industrial (Scanline) */}
                                        <div className="absolute inset-0 bg-black/60 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
                                        {/* Degradado duro lateral */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                                        <div className="relative z-10 max-w-xl flex flex-col justify-center h-full">
                                            <div className="inline-block border border-[#e4ff00] bg-[#e4ff00]/10 px-3 py-1 text-[#e4ff00] font-mono text-xs tracking-widest uppercase mb-6 w-fit">
                                                DESCUENTO // {slide.priceDiscount}% OFF
                                            </div>

                                            <p className="text-[#00f0ff] text-sm font-bold tracking-[0.3em] mb-2 uppercase">
                                                {slide.category.name}
                                            </p>

                                            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                                {slide.name}
                                            </h2>

                                            <p className="text-nowrap md:text-wrap text-zinc-400 mb-8 font-mono text-sm leading-relaxed border-l-2 border-zinc-700 pl-4">
                                                {slide.description}
                                            </p>

                                            <Link
                                                to={`/products/${slide.slug}`}
                                                className="w-fit flex flex-row justify-center items-center gap-4 bg-[#050505] text-[#00f0ff] border border-[#00f0ff] px-8 py-4 font-bold tracking-[0.2em] uppercase hover:bg-[#00f0ff] hover:text-black transition-all group"
                                            >
                                                <span>COMPRAR AHORA</span>
                                                <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>

                                        {/* Indicadores técnicos dentro del slide */}
                                        <div className="absolute bottom-8 right-8 flex space-x-3 z-20 font-mono text-xs items-center">
                                            {slides.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`transition-all duration-300 tracking-widest font-bold ${idx === currentSlide
                                                        ? "text-[#00f0ff] opacity-100"
                                                        : "text-zinc-600 opacity-50 hover:opacity-80"
                                                        }`}
                                                    onClick={() => scrollTo(idx)}
                                                    aria-label={`Go to slide ${idx + 1}`}
                                                >
                                                    [ {String(idx + 1).padStart(2, '0')} ]
                                                </button>
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