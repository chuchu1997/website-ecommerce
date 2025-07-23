import { ReactNode } from 'react'

interface BodyContainerProps {
  children: ReactNode
  className?: string
}

export const BodyContainer = ({ children, className="" }: BodyContainerProps) => {
  return (
    <div className={`w-full ${className} `}>
      {children}
    </div>
  )
}







