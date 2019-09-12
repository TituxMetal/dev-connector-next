import Link from 'next/link'

import { Page } from '../../components/layout'
import { Board } from '../../components/sections'
import { Lead } from '../../components/UI'

const Edit = () => {
  return (
    <Page title='Edit Profile'>
      <Lead
        text='Edit your profile'
        subText={`Let's add some informations to make your profile stand out.`}
      />
      <Board.EditProfile />
    </Page>
  )
}

export default Edit
