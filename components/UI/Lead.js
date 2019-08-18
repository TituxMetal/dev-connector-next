import styled from 'styled-components'

const Title = styled.h1`
  ${props => (props.large ? 'font-size: 4rem;' : 'font-size: 3rem;')}
  color: ${({ theme }) => theme.textOnMain};
  ${props => (props.center ? 'text-align: center;' : 'align-self: flex-start;')}
  margin: 0;
  padding: 1rem 0;
`

const SubTitle = styled.p`
  ${props => (props.large ? 'font-size: 2.5rem;' : 'font-size: 2rem;')}
  color: ${({ theme }) => theme.textOnMain};
  ${props => (props.center ? 'text-align: center;' : 'align-self: flex-start;')}
  margin: 0;
  padding: ${props => (props.large ? '1rem' : '1rem 0')};

  @media screen and (min-width: 600px) {
    padding: ${props => props.large && '2rem'};
  }
`

export default ({ as, children, text, subText, large, center }) => (
  <>
    <Title as={as} large={large} center={center}>
      {text}
    </Title>
    <SubTitle large={large} center={center}>
      {subText}
    </SubTitle>
    {children}
  </>
)
