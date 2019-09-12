import Link from 'next/link'
import { tint } from 'polished'
import styled from 'styled-components'

import { Button } from '../../UI'
import { Wrapper } from '../../../styled'

const BtnWrapper = styled(Wrapper)`
  margin-top: 0;
  flex-direction: column;

  @media screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
`

const Btn = styled(Button)`
  margin: 1rem 0;
`

const Controls = () => (
  <BtnWrapper as='div'>
    <Link href='/profile/edit' passHref>
      <Btn as='a' color='info'>
        Edit Profile
      </Btn>
    </Link>
    <Link href='/' passHref>
      <Btn as='a' color='info'>
        Add Experience
      </Btn>
    </Link>
    <Link href='/' passHref>
      <Btn as='a' color='info'>
        Add Education
      </Btn>
    </Link>
  </BtnWrapper>
)

export default Controls
