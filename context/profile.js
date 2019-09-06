import { useState, createContext } from 'react'
import Router from 'next/router'

import { getAllProfiles, getProfileById, getGithubRepos } from '../lib'
export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [profileList, setProfileList] = useState(null)
  const [profile, setProfile] = useState(null)
  const [githubrepos, setGithubrepos] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchProfiles = async (id = false) => {
    try {
      setError(false)
      id ? await getProfile(id) : await getProfiles()
      setLoading(false)
    } catch (err) {
      const msg = (err.response.data && err.response.data.errors) || err.message
      setError(msg)
      setLoading(false)
    }
  }

  const fetchGithubRepos = async githubusername => {
    try {
      const { data } = await getGithubRepos(githubusername)
      setGithubrepos(data)
    } catch (err) {
      return (err.response && err.response.data) || err.message
    }
  }

  const getProfiles = async () => {
    const { data } = await getAllProfiles()
    setProfileList(data)
  }

  const getProfile = async id => {
    const { data } = await getProfileById(id)
    setProfile(data)
  }

  return (
    <ProfileContext.Provider
      value={{
        error,
        githubrepos,
        loading,
        profile,
        profileList,
        fetchProfiles,
        fetchGithubRepos
      }}>
      {children}
    </ProfileContext.Provider>
  )
}
