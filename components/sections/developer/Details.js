import styled from 'styled-components'
import { Facebook, Globe, Linkedin, Twitter, Youtube } from 'styled-icons/feather'

import { Lead } from '../../UI'
import { Avatar, Icon, Wrapper } from '../../../styled'

const DetailsBlock = styled(Wrapper)`
  padding-top: 2rem;
`

const Text = styled.span`
  margin: 0 0 2rem 0;
`

const Details = ({ profile }) => {
  const { user, status, location, company, website, social } = profile
  const { name, avatar } = user
  const statusText = `${status} ${company && `at ${company}`}`
  const linkAttr = { target: '_blank', rel: 'noopener noreferer' }

  return (
    <DetailsBlock vertical center color='complementary'>
      <Wrapper vertical center>
        <Avatar src={avatar} alt={name} size='200px' />
      </Wrapper>
      <Lead as='h2' text={name} subText={statusText} center />
      {location && <Text>{location}</Text>}
      <Wrapper center>
        {website && (
          <Icon>
            <a href={website} title={`${name} Website`} {...linkAttr}>
              <Globe size='35' />
            </a>
          </Icon>
        )}
        {social && (
          <>
            {social.youtube && (
              <Icon>
                <a href={social.youtube} title='Youtube Social Media' {...linkAttr}>
                  <Youtube size='35' />
                </a>
              </Icon>
            )}
            {social.linkedin && (
              <Icon>
                <a href={social.linkedin} title='LinkedIn Social Media' {...linkAttr}>
                  <Linkedin size='35' />
                </a>
              </Icon>
            )}
            {social.twitter && (
              <Icon>
                <a href={social.twitter} title='Twitter Social Media' {...linkAttr}>
                  <Twitter size='35' />
                </a>
              </Icon>
            )}
            {social.facebook && (
              <Icon>
                <a href={social.facebook} title='Facebook Social Media' {...linkAttr}>
                  <Facebook size='35' />
                </a>
              </Icon>
            )}
          </>
        )}
      </Wrapper>
    </DetailsBlock>
  )
}

export default Details
