import type { EmblaOptionsType } from 'embla-carousel'
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react'
import Banner from '../../components/Banner';
import Category from '../../../categories/components/Category';
import Promotion from '../../components/Promotion';
import Trends from '../../components/Trends';
import Products from '../../../products/components/Products';
import CTA from '../../components/CTA';
import Features from '../../components/Features';
import ProductShowCase from '../../components/ProductShowCase';

const OPTIONS: EmblaOptionsType = {
  loop: true,
  direction: 'ltr'
}

const HomePage = () => {
  const ref = useRef(null)
  const refShow = useRef(null)
  const isInView = useInView(ref, { once: false })
  const isInViewShow = useInView(refShow, { once: false })

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } }
  }

  const variantsShow = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } }
  }

  return (
    <div className='min-h-screen bg-[#020202] text-zinc-300 font-mono relative overflow-hidden'>
      {/* Tech Grid Background (similar to Checkout) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #27272a 1px, transparent 1px),
            linear-gradient(to bottom, #27272a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Scanline overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />

      <div className="relative z-10 space-y-12">
        <Banner options={OPTIONS} />
        <Category />
        <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} className='max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4'>
          <Promotion />
        </motion.div>
        <Trends />
        <motion.div ref={refShow} variants={variantsShow} initial="hidden" animate={isInViewShow ? "visible" : "hidden"} className="px-4">
          <ProductShowCase />
        </motion.div>
        <Products />
        <CTA />
        <Features />
      </div>
    </div>
  )
}

export default HomePage