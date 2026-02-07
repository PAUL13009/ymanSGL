'use client'

import React, { useState, Children, useRef, useLayoutEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Stepper.css'

interface StepperProps {
  children: React.ReactNode
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  backButtonText?: string
  nextButtonText?: string
  completeButtonText?: string
  disableStepIndicators?: boolean
  /** 'light' = fond clair (bordures/texte sombres), 'dark' = fond sombre (bordures/texte clairs) */
  variant?: 'light' | 'dark'
  renderStepIndicator?: (props: {
    step: number
    currentStep: number
    onStepClick: (step: number) => void
  }) => React.ReactNode
  [key: string]: unknown
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Précédent',
  nextButtonText = 'Suivant',
  completeButtonText = 'Terminer',
  disableStepIndicators = false,
  variant = 'dark',
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [direction, setDirection] = useState(0)
  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep)
    if (newStep > totalSteps) {
      onFinalStepCompleted()
    } else {
      onStepChange(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1)
      updateStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setDirection(-1)
    setCurrentStep(1)
    onStepChange(1)
    onFinalStepCompleted()
  }

  return (
    <div className={`stepper-outer-container stepper--${variant}`} {...rest}>
      <div className={`stepper-step-circle-container ${stepCircleContainerClassName}`}>
        <div className={`stepper-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1
            const isNotLastStep = index < totalSteps - 1
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    variant={variant}
                    onClickStep={(clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} variant={variant} />}
              </React.Fragment>
            )
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`stepper-content-default ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`stepper-footer-container ${footerClassName}`}>
            <div className={`stepper-footer-nav ${currentStep !== 1 ? 'stepper-footer-spread' : 'stepper-footer-end'}`}>
              {currentStep !== 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`stepper-back-button ${currentStep === 1 ? 'stepper-inactive' : ''}`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                type="button"
                onClick={isLastStep ? handleComplete : handleNext}
                className="stepper-next-button"
                {...nextButtonProps}
              >
                {isLastStep ? completeButtonText : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className
}: {
  isCompleted: boolean
  currentStep: number
  direction: number
  children: React.ReactNode
  className: string
}) {
  const [parentHeight, setParentHeight] = useState(0)
  const lastHeightRef = useRef(0)
  const onHeightReady = useCallback((h: number) => {
    if (h === lastHeightRef.current) return
    lastHeightRef.current = h
    setParentHeight(h)
  }, [])

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={onHeightReady}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SlideTransition({
  children,
  direction,
  onHeightReady
}: {
  children: React.ReactNode
  direction: number
  onHeightReady: (height: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const rafId = requestAnimationFrame(() => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight
        onHeightReady(h)
      }
    })
    return () => cancelAnimationFrame(rafId)
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  )
}

const stepVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0
  })
}

export function Step({ children }: { children: React.ReactNode }) {
  return <div className="stepper-step-default">{children}</div>
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
  variant = 'dark'
}: {
  step: number
  currentStep: number
  onClickStep: (step: number) => void
  disableStepIndicators: boolean
  variant?: 'light' | 'dark'
}) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step)
  }

  const variantsLight = {
    inactive: { scale: 1, backgroundColor: '#f3f4f6', color: '#374151' },
    active: { scale: 1, backgroundColor: '#e5e7eb', color: '#111827' },
    complete: { scale: 1, backgroundColor: '#e5e7eb', color: '#111827' }
  }
  const variantsDark = {
    inactive: { scale: 1, backgroundColor: '#ffffff', color: '#000000' },
    active: { scale: 1, backgroundColor: '#ffffff', color: '#000000' },
    complete: { scale: 1, backgroundColor: '#ffffff', color: '#000000' }
  }
  const variants = variant === 'light' ? variantsLight : variantsDark

  return (
    <motion.div onClick={handleClick} className="stepper-step-indicator" animate={status} initial={false}>
      <motion.div
        variants={variants}
        transition={{ duration: 0.3 }}
        className="stepper-step-indicator-inner"
      >
        {status === 'complete' ? (
          <CheckIcon className="stepper-check-icon" />
        ) : status === 'active' ? (
          <div className="stepper-active-dot" />
        ) : (
          <span className="stepper-step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  )
}

function StepConnector({ isComplete, variant = 'dark' }: { isComplete: boolean; variant?: 'light' | 'dark' }) {
  const lineVariants =
    variant === 'light'
      ? {
          incomplete: { width: '100%' as const, backgroundColor: '#d1d5db' },
          complete: { width: '100%' as const, backgroundColor: '#374151' }
        }
      : {
          incomplete: { width: '100%' as const, backgroundColor: '#000000' },
          complete: { width: '100%' as const, backgroundColor: '#ffffff' }
        }

  return (
    <div className="stepper-connector">
      <motion.div
        className="stepper-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
