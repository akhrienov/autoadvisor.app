import { FC, ReactNode } from 'react'

interface BrowserMockupProps {
  websiteUrl: string
  children: ReactNode
}

const BrowserMockup: FC<BrowserMockupProps> = ({ websiteUrl, children }) => {
  return (
    <div className="mockup-browser border border-base-300">
      <div className="mockup-browser-toolbar">
        <div className="input border border-base-300">{websiteUrl}</div>
      </div>
      <div className="flex justify-center border-t border-base-300 px-4 py-16">{children}</div>
    </div>
  )
}

export default BrowserMockup
