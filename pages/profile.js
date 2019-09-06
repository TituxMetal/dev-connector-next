import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ProfileContext } from '../context'
import { Message, Wrapper } from '../styled'
import { Page } from '../components/layout'
import { Spinner, Button } from '../components/UI'
import { Developer } from '../components/sections'

const Profile = () => {
  const { error, loading, profile, fetchProfiles } = useContext(ProfileContext)
  const router = useRouter()
  const userId = router.query.param || router.query.userId

  useEffect(() => {
    fetchProfiles(userId)
  }, [])

  return (
    <Page title='Developer Profile'>
      <Wrapper>
        <Link href='/profiles' passHref>
          <Button as='a' color='secondary'>
            Back to profiles list
          </Button>
        </Link>
      </Wrapper>
      {(loading && <Spinner />) ||
        (error && <Message info>{error.message}</Message>) ||
        (profile && (
          <>
            <Developer.Details profile={profile} />
            <Developer.About profile={profile} />
            <Developer.Career profile={profile} />
            {profile.githubusername && <Developer.GithubRepos username={profile.githubusername} />}
          </>
        ))}
    </Page>
  )
}

export default Profile
