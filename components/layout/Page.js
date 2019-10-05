import styled from 'styled-components'

import { HtmlHead, Container } from '../layout'
import { Menu } from '../navigation'
import { GlobalStyle, Footer } from '../../styled'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Page = ({ children, full, title }) => {
  return (
    <Main>
      <GlobalStyle />
      <HtmlHead title={title} />
      <Menu />
      <Container fullWidth={full}>{children}</Container>
      <Footer>
        <p>Created with love by TuxiMetal</p>
      </Footer>
    </Main>
  )
}

export default Page
