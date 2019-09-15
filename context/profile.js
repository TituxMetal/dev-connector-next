import { useEffect, useState, createContext } from 'react'
import Router from 'next/router'

import { editProfile, getAllProfiles, getProfileById, getGithubRepos, getUserProfile } from '../lib'
export const ProfileContext = createContext()

export const ProfileProvider = ({ children, authStatus }) => {
  const [profileList, setProfileList] = useState(null)
  const [profile, setProfile] = useState(null)
  const [githubrepos, setGithubrepos] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(
    () => {
      if (authStatus.success) {
        setError('')
        setLoading(true)
        fetchUserProfile()
      }
    },
    [authStatus]
  )

  const removeEmptyValues = obj => {
    for (let propName in obj) {
      !obj[propName] || obj[propName].length === 0
        ? delete obj[propName]
        : typeof obj[propName] === 'object'
          ? removeEmptyValues(obj[propName])
          : null
    }
    return obj
  }

  const handleSubmitEdit = async profileData => {
    try {
      setLoading(true)
      const clone = Object.assign({}, profileData)
      removeEmptyValues(clone)
      const { data } = await editProfile(clone)
      setProfile(data)
      setError('')
      Router.push('/dashboard')
    } catch (err) {
      const msg = (err.response.data && err.response.data.errors) || err.message
      setError(msg)
      setLoading(false)
    }
  }

  const fetchUserProfile = async () => {
    try {
      const { data } = await getUserProfile()
      setProfile(data)
      setLoading(false)
    } catch (err) {
      const msg = (err.response.data && err.response.data.errors) || err.message
      setLoading(false)
    }
  }

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
        handleSubmitEdit,
        fetchProfiles,
        fetchGithubRepos
      }}>
      {children}
    </ProfileContext.Provider>
  )
}
