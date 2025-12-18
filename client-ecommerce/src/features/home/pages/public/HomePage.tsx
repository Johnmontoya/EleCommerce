import type { EmblaOptionsType } from 'embla-carousel'
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react'
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Promotion from '../../components/Promotion';
import Trends from '../../../products/components/Trends';
import ProductShowCase from '../../../products/components/ProductShowCase';
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
    <div className='bg-linear-to-br from-slate-900 via-slate-800 to-slate-900'>
      {/* useLocalData={true} para usar datos locales */}
      {/* useLocalData={false} para usar API */}
      <Banner options={OPTIONS} />
      <Category />
      <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
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