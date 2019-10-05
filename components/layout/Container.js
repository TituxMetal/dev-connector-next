import styled from 'styled-components'

import { useAuthState } from '../../store'
import { Spinner } from '../UI'

const PageContainer = styled.section`
  flex-grow: 1;
  margin: auto;
  padding: ${props => !props.fullWidth && '1rem'};
  width: 100%;

  @media screen and (min-width: 600px) {
    padding: ${props => !props.fullWidth && '2rem'};
    width: ${props => !props.fullWidth && '75vw'};
  }
`

const Container = ({ children, fullWidth }) => {
  const { isLoading } = useAuthState()

  return <PageContainer fullWidth={fullWidth}>{isLoading ? <Spinner /> : children}</PageContainer>
}

export default Container
