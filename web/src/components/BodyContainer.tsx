import { ReactNode } from 'react'

interface BodyContainerProps {
  children: ReactNode
  className?: string
}

export const BodyContainer = ({ children, className="mt-[10px]" }: BodyContainerProps) => {
  return (
    <div className={`min-h-[700px] w-full ${className} `}>
      {children}
    </div>
  )
}







