import styled from 'styled-components'

import { HtmlHead } from '../layout'
import { Menu } from '../navigation'
import { GlobalStyle, Footer } from '../../styled'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Container = styled.section`
  flex-grow: 1;
  margin: auto;
  padding: ${props => !props.fullWidth && '1rem'};
  width: 100%;

  @media screen and (min-width: 600px) {
    padding: ${props => !props.fullWidth && '2rem'};
    width: ${props => !props.fullWidth && '75vw'};
  }
`

const Page = ({ children, full, title }) => (
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

export default Page
