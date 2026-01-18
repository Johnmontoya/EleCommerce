import type { EmblaOptionsType } from 'embla-carousel'
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react'
import Banner from '../../components/Banner';
import Category from '../../../categories/components/Category';
import Promotion from '../../components/Promotion';
import Trends from '../../components/Trends';
import ProductShowCase from '../../components/ProductShowCase';
import Products from '../../../products/components/Products';
import CTA from '../../components/CTA';
import Features from '../../components/Features';

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
    <div className='background-light dark:background-light'>
      {/* useLocalData={true} para usar datos locales */}
      {/* useLocalData={false} para usar API */}
      <Banner options={OPTIONS} />
      <Category />
      <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} className='max-w-7xl mx-auto flex flex-row justify-center items-center gap-6'>
        <Promotion />
      </motion.div>
      <Trends />
      <motion.div ref={refShow} variants={variantsShow} initial="hidden" animate={isInViewShow ? "visible" : "hidden"}>
        <ProductShowCase />
      </motion.div>
      <Products />
      <CTA />
      <Features />
    </div>
  )
}

export default HomePage