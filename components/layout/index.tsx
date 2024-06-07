import { cn } from '@/lib/utils'

interface Props {
  className?: string
  children: React.ReactNode
}

const LayoutBorder: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'min-h-[calc(100vh-5rem)] max-w-screen-2xl h-full w-full px-6',
        className
      )}
    >
      {children}
    </div>
  )
}
export default LayoutBorder
