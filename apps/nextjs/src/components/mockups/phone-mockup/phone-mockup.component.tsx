import { FC, ReactNode } from 'react'

interface PhoneMockupProps {
  children: ReactNode
}

const PhoneMockup: FC<PhoneMockupProps> = ({ children }) => {
  return (
    <div className="mockup-phone">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard artboard-demo phone-1">{children}</div>
      </div>
    </div>
  )
}

export default PhoneMockup
