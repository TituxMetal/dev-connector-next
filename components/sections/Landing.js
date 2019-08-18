import styled from 'styled-components'
import { transparentize } from 'polished'

const Landing = styled.section`
  background: url('/static/img/showcase.jpg') no-repeat center center/cover;
  height: 100%;
  width: 100%;
`

const Overlay = styled.div`
  background-color: ${transparentize(0.2, 'black')};
  height: 100%;
  width: 100%;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
  text-align: center;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 80%;
  }

  @media screen and (min-width: 900px) {
    width: 60%;
  }
`

export default ({ children }) => (
  <Landing>
    <Overlay>
      <Inner>{children}</Inner>
    </Overlay>
  </Landing>
)
