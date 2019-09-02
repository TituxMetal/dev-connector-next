import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ProfileContext } from '../context'
import { Message } from '../styled'
import { Page } from '../components/layout'
import { Lead, Spinner } from '../components/UI'
import { Developer } from '../components/sections'

const Profiles = () => {
  const { error, loading, profileList, fetchProfiles } = useContext(ProfileContext)
  const router = useRouter()
  const profileId = router.query.param || router.query.profileId

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <Page title='Developers Profiles'>
      {profileId && <p>Params: {profileId}</p>}
      <Lead text='Developers Profiles' subText='Browse and connect with developers' />
      {(loading && <Spinner />) ||
        (error && <Message info>There is no profiles for the moment!</Message>) ||
        (profileList && <Developer.List profiles={profileList} />)}
    </Page>
  )
}

export default Profiles
