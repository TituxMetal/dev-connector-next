import { useState, createContext } from 'react'
import Router from 'next/router'

import { getAllProfiles } from '../lib'
export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [profileList, setProfileList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchProfiles = async () => {
    try {
      const { data } = await getAllProfiles()
      setError(false)
      setProfileList(data)
      setLoading(false)
    } catch (err) {
      const msg = (err.response.data && err.response.data.errors) || err.message
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <ProfileContext.Provider value={{ error, loading, profileList, fetchProfiles }}>
      {children}
    </ProfileContext.Provider>
  )
}
