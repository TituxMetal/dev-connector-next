import Link from 'next/link'
import { tint, transparentize } from 'polished'
import styled from 'styled-components'
import { Check } from 'styled-icons/fa-solid'
import { User } from 'styled-icons/fa-regular'
import { Location } from 'styled-icons/octicons'

import { Avatar } from '../../../styled'

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`

const H4 = styled.h4`
  margin-bottom: 1rem;
`

const Li = styled.li`
  background-color: ${({ theme }) => transparentize(0.6, theme.complementary)};
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    padding-top: 0;
  }
`

const Skill = styled.li`
  display: flex;
  align-items: center;
  color: ${({ theme }) => tint(0.2, theme.complementary)};
  font-weight: 700;
  padding: 0.5rem;
`

const Section = styled.section`
  @media screen and (min-width: 600px) {
    flex-grow: 1;
    margin-left: 2rem;
  }
`

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
`

const List = ({ profiles }) => (
  <Ul>
    {profiles.map(profile => (
      <Li key={profile._id}>
        <Avatar src={profile.user.avatar} alt={`${profile.user.name} avatar`} size='150px' />
        <Section>
          <h3>{profile.user.name}</h3>
          <p>{profile.status}</p>
          <p>
            <Icon>
              <Location size='18' />
            </Icon>
            {profile.location}
          </p>
          <p>
            <Link
              href={`/profile?profileId=${profile._id}`}
              as={`/profile/${profile._id}`}
              passHref>
              <a>
                <Icon>
                  <User size='18' />
                </Icon>
                View Developer Profile
              </a>
            </Link>
          </p>
        </Section>
        <Ul>
          <H4>Skills</H4>
          {profile.skills.map((skill, key) => (
            <Skill key={key}>
              <Icon>
                <Check size='20' />
              </Icon>
              {skill}
            </Skill>
          ))}
        </Ul>
      </Li>
    ))}
  </Ul>
)

export default List
