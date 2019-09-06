import { tint } from 'polished'
import styled from 'styled-components'
import { Check } from 'styled-icons/fa-solid/Check'

import { Lead } from '../../UI'
import { Wrapper, Icon } from '../../../styled'

const AboutBlock = styled(Wrapper)`
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;

  p {
    padding: 1rem;
  }

  @media screen and (min-width: 600px) {
    padding: 1rem 2rem;
  }
`

const List = styled.ul`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  margin-top: 0.4rem;
  margin-bottom: 1rem;
`

const Skill = styled.li`
  display: flex;
  color: ${({ theme }) => tint(0.4, theme.complementary)};
  font-weight: 700;
  margin: 0.6rem;
`

const Title = styled.h2`
  color: ${({ theme }) => tint(0.3, theme.secondary)};
  margin: 0;
  padding: 1rem 0;
`

const About = ({ profile: { bio, skills } }) => (
  <AboutBlock vertical center>
    <Lead as={Title} text='Biography' subText={bio} center />
    {skills && (
      <>
        <Title>Skill Set</Title>
        <List>
          {skills.map((skill, key) => (
            <Skill key={key}>
              <Icon>
                <Check size='18' />
              </Icon>
              {skill}
            </Skill>
          ))}
        </List>
      </>
    )}
  </AboutBlock>
)

export default About
