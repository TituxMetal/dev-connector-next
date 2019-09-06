import { tint } from 'polished'
import styled from 'styled-components'

import Education from './Education'
import Experience from './Experience'
import { Message, Wrapper } from '../../../styled'

const CareerBlock = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0;

  @media screen and (min-width: 600px) {
    flex-direction: row;

    & > :first-child,
    & > :last-child {
      margin-top: 0;
      width: calc(50% - 1rem);
    }
  }
`

const Career = ({ profile: { experience, education } }) => (
  <CareerBlock>
    <Wrapper vertical color='info'>
      <Experience experiences={experience} />
    </Wrapper>
    <Wrapper vertical color='info'>
      <Education educations={education} />
    </Wrapper>
  </CareerBlock>
)

export default Career
