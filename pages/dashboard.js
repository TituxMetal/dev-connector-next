import { useEffect } from 'react'

import { useProtectedRoute } from '../hooks'
import { Wrapper } from '../styled'
import { Page } from '../components/layout'
import { Board } from '../components/sections'
import { Lead } from '../components/UI'

const Dashboard = () => {
  useProtectedRoute(true)

  return (
    <Page title='Dashboard Page'>
      <Lead text='Dashboard' subText='Add/Edit your profile, add experiences and educations' />
      <Wrapper vertical>
        <Board.Controls />
        <p>Experiences</p>
        <p>Educations</p>
      </Wrapper>
    </Page>
  )
}

export default Dashboard
