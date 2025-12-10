import Banner from '../components/Home/Banner'
import Category from '../components/Home/Category'
import Features from '../components/Home/Features'
import ProductShowCase from '../components/Product/ProductShowCase'
import Trends from '../components/Product/Trends'
import type { EmblaOptionsType } from 'embla-carousel'
import Products from '../components/Product/Products'
import Promotion from '../components/Home/Promotion'
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react'
import CTA from '../components/Home/CTA'

const OPTIONS: EmblaOptionsType = { 
  loop: true,
  direction: 'ltr'
}

const HomePage = () => {
  const ref = useRef(null)
  const refShow = useRef(null)
  const isInView = useInView(ref, {once: false})
  const isInViewShow = useInView(refShow, {once: false})

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 }},
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5 }}
  }

  const variantsShow = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 }},
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5 }}
  }

  return (
    <div className='bg-linear-to-br from-slate-900 via-slate-800 to-slate-900'>      
        {/* useLocalData={true} para usar datos locales */}
        {/* useLocalData={false} para usar API */}
        <Banner options={OPTIONS} useLocalData={true} />     
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