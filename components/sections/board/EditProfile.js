import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'

import { ProfileContext } from '../../../context'
import SocialFields from './SocialFields'
import { Form, Message, Wrapper } from '../../../styled'
import { Button, InputField, SelectField, Spinner, TextHelper } from '../../UI'

const selectOptions = [
  '* Select your status',
  'Developer',
  'Junior Developer',
  'Senior Developer',
  'Manager',
  'Student or Learning',
  'Instructor or Teacher',
  'Intern',
  'Other'
]

const profileFields = {
  status: selectOptions[0],
  company: '',
  website: '',
  location: '',
  skills: '',
  githubusername: '',
  bio: '',
  social: {
    linkedin: '',
    twitter: '',
    youtube: '',
    facebook: ''
  }
}

const EditProfile = () => {
  const { error, loading, profile, handleSubmitEdit } = useContext(ProfileContext)
  const [fields, setFields] = useState(profileFields)
  const [socialLinks, setSocialLinks] = useState(false)

  useEffect(
    () => {
      profile &&
        setFields({
          status: profile.status || selectOptions[0],
          company: profile.company || '',
          website: profile.website || '',
          location: profile.location || '',
          skills: profile.skills.toString() || '',
          githubusername: profile.githubusername || '',
          bio: profile.bio || '',
          social: {
            linkedin: (profile.social && profile.social.linkedin) || profileFields.social.linkedin,
            twitter: (profile.social && profile.social.twitter) || profileFields.social.twitter,
            youtube: (profile.social && profile.social.youtube) || profileFields.social.youtube,
            facebook: (profile.social && profile.social.facebook) || profileFields.social.facebook
          }
        })
    },
    [profile]
  )

  const handleClick = () => setSocialLinks(!socialLinks)

  const handleChange = event => setFields({ ...fields, [event.target.name]: event.target.value })

  const handleSubmit = async event => {
    event.preventDefault()
    const status = fields.status === selectOptions[0] ? null : fields.status
    await handleSubmitEdit({ ...fields, social: { ...fields.social }, status })
  }

  return (
    <>
      {(loading && <Spinner />) ||
        (profile && (
          <Form onSubmit={handleSubmit}>
            {error.message && (
              <Message danger global>
                {error.message}
              </Message>
            )}
            <SelectField
              name='status'
              defaults={selectOptions[0]}
              options={selectOptions}
              change={handleChange}
              value={fields && fields.status}
              error={error.status}>
              <TextHelper>Give us an idea of where you are at in your career</TextHelper>
            </SelectField>
            <InputField
              change={handleChange}
              name='company'
              type='text'
              label='Company'
              value={fields && fields.company}
              error={error.company}>
              <TextHelper>Could be your own company or one you work for</TextHelper>
            </InputField>
            <InputField
              change={handleChange}
              name='website'
              type='text'
              label='Website'
              value={fields && fields.website}
              error={error.website}>
              <TextHelper>Could be your own or or a company website</TextHelper>
            </InputField>
            <InputField
              change={handleChange}
              name='location'
              type='text'
              label='Location'
              value={fields && fields.location}
              error={error.location}>
              <TextHelper>City & state suggested (eg. Boston, MA)</TextHelper>
            </InputField>
            <InputField
              change={handleChange}
              name='skills'
              type='text'
              label='* Skills'
              value={fields && fields.skills}
              error={error.skills}>
              <TextHelper>Please use comma separated values (eg. Html, Css)</TextHelper>
            </InputField>
            <InputField
              change={handleChange}
              name='githubusername'
              type='text'
              label='GitHub username'
              value={fields && fields.githubusername}
              error={error.githubusername}>
              <TextHelper>
                If you want your latest repos and a GitHub link, include your username
              </TextHelper>
            </InputField>
            <InputField
              change={handleChange}
              name='bio'
              type='textarea'
              label='Bio'
              value={fields && fields.bio}
              error={error.bio}>
              <TextHelper>Tell us a little about yourself</TextHelper>
            </InputField>
            <p>{JSON.stringify(fields)}</p>
            <Wrapper>
              <Button onClick={handleClick} type='button' color='complementary'>
                Add Social Network Links
              </Button>
            </Wrapper>
            {socialLinks && <SocialFields error={error} fields={fields} change={setFields} />}
            <Wrapper spaced='between'>
              <Button type='submit' color='info'>
                Submit
              </Button>
              <Link href='/dashboard' passHref>
                <Button as='a' color='secondary'>
                  Go Back
                </Button>
              </Link>
            </Wrapper>
          </Form>
        ))}
    </>
  )
}

export default EditProfile
