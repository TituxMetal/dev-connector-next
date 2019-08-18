import Link from 'next/link'

import { Page } from '../components/layout'
import { Landing } from '../components/sections'
import { Button, Lead } from '../components/UI'
import { Wrapper } from '../styled'

const Home = () => {
  return (
    <Page full title='Home Page'>
      <Landing>
        <Lead
          text='DevConnector'
          subText='Create a developer profile/portfolio, share posts and get help from other developers'
          center
          large
        />
        <Wrapper center spaced='evenly'>
          <Link href='/register' passHref>
            <Button as='a' color='info'>
              Register
            </Button>
          </Link>
          <Link href='/login' passHref>
            <Button as='a' color='success'>
              Login
            </Button>
          </Link>
        </Wrapper>
      </Landing>
    </Page>
  )
}

export default Home
