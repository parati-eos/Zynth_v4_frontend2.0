import React, { useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import { cn } from '../../Utils/cn.ts'
import AnimatedButon from '../Buttons/button.js'
import { useNavigate } from 'react-router-dom'

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string
    description: string
    content?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardLength = content.length
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const lastCardIndex = cardLength - 1
    const containerHeight = ref.current.offsetHeight
    const contentHeight = ref.current.scrollHeight

    // Calculate the bottom of the container
    const containerBottom = contentHeight - containerHeight

    if (containerBottom <= 0 || latest === 1) {
      // If the bottom of the container is within view or scroll position is at the bottom, highlight the last content item
      setActiveCard(lastCardIndex)
    } else {
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint)
          if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index
          }
          return acc
        },
        0
      )
      setActiveCard(closestBreakpointIndex)
    }
  })

  const backgroundColors = [
    'var(--white-900)',
    'var(--black)',
    'var(--neutral-900)',
  ]
  const linearGradients = [
    // "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    // "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    'linear-gradient(to bottom right, transparent, transparent)',
  ]
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/auth/login')
  }
  return (
    <div
      className="h-[20rem] md:h-[35.5rem] overflow-y-auto flex md:gap-5 justify-center relative space-x-10 rounded-md no-scrollbar"
      style={{ maxHeight: '100%' }} // Adjusted to fill the available space
      ref={ref}
    >
      <div className="div relative flex-col items-start md:px-4 w-[100%]">
        <h3 className="text-1xl md:text-3xl font-bold text-white dark:text-white opacity-100 pb-10">
          Leverage the Power of AI to
          <br /> Instantly Generate
          <span style={{ color: '#5480c1' }}> Structured</span> <br />
          <span style={{ color: '#5480c1' }}> & Branded Pitch Decks</span>
        </h3>
        <div className="max-w-10xl w-[100%] relative h-[50vh]">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="py-[1vh] md:py-[10vh] relative"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-[18px] md:text-[24px] font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-[14px] md:text-[18px] text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="sticky top-0 right-0 flex-col md:gap-10 max-w-10xl w-[100%]">
            <AnimatedButon onclicked={handleClick} name={'Get Started'} />
          </div>
          <div className="h-40" />
        </div>
      </div>
      <div className="div sticky top-0 right-0 flex-col md:gap-10 max-w-10xl w-[100%]">
        <motion.div
          animate={{
            background: linearGradients[activeCard % linearGradients.length],
          }}
          className={cn(
            'h-[100%] w-[90%] rounded-md bg-white sticky top-5 overflow-hidden ',
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </div>
    </div>
  )
}
