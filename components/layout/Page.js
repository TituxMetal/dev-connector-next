import { HtmlHead } from '../layout'
import { GlobalStyle } from '../../styled'

const Page = ({ children, title }) => (
  <>
    <GlobalStyle />
    <HtmlHead title={title} />
    <>{children}</>
    <>
      <p>Created with love by TuxiMetal</p>
    </>
  </>
)

export default Page
