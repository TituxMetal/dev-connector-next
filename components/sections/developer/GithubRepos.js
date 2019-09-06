import { useContext, useEffect, useState } from 'react'
import { shade } from 'polished'
import styled from 'styled-components'
import { MarkGithub as Github } from 'styled-icons/octicons/MarkGithub'

import { ProfileContext } from '../../../context'
import { Icon, Wrapper } from '../../../styled'
import { Spinner } from '../../UI'

const GithubReposBlock = styled(Wrapper)`
  margin-bottom: 0;
`

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const Repo = styled(Wrapper)`
  padding: 1rem;

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`

const Details = styled.div`
  flex-grow: 1;
  @media screen and (min-width: 800px) {
    width: 75%;
  }
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`

const Li = styled.li`
  background-color: ${({ theme }) => shade(0.5, theme.danger)};
  margin: 0.5rem 0;
  padding: 0.5rem;
  flex-grow: 1;
`

const GithubRepos = ({ username }) => {
  const { githubrepos, fetchGithubRepos } = useContext(ProfileContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGithubRepos(username)
    setIsLoading(false)
  }, [])

  return (
    <>
      {(isLoading && <Spinner />) ||
        (githubrepos && (
          <GithubReposBlock vertical>
            <Title>
              <Icon>
                <Github size='28' />
              </Icon>
              Github Repos
            </Title>
            {githubrepos.map(repo => (
              <Repo key={repo.id} vertical color='danger'>
                <Details>
                  <h4>
                    <a href={repo.html_url} target='_blank' rel='noopener noreferer'>
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </Details>
                <Ul>
                  <Li>Stars: {repo.stargazers_count}</Li>
                  <Li>Watchers: {repo.watchers_count}</Li>
                  <Li>Forks: {repo.forks_count}</Li>
                </Ul>
              </Repo>
            ))}
          </GithubReposBlock>
        ))}
    </>
  )
}

export default GithubRepos
