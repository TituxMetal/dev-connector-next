import axios from 'axios'

const baseUri = '/api'
const usersUri = `${baseUri}/users`
const profilesUri = `${baseUri}/profiles`

axios.defaults.withCredentials = true

export const register = async data => await axios.post(`${usersUri}/register`, data)

export const login = async data => await axios.post(`${usersUri}/login`, data)

export const logout = async () => await axios.post(`${usersUri}/logout`)

export const getAllProfiles = async () => await axios.get(profilesUri)

export const getProfileById = async id => await axios.get(`${profilesUri}/user/${id}`)

export const getGithubRepos = async username => await axios.get(`${profilesUri}/github/${username}`)

export const getSessionFromClient = async () => {
  const { data } = await axios.get(`${usersUri}/me`)

  return { ...data }
}

export const getSessionFromServer = async req =>
  req.user ? { user: req.user, success: true } : { user: false, success: false }
