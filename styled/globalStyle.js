import { createGlobalStyle, css } from 'styled-components'
import { normalize, tint } from 'polished'

const reset = () => css`
  a {
    text-decoration: none;
  }
  input,
  button,
  ul,
  li {
    all: unset;
    box-sizing: border-box;
  }
`
export const theme = {
  mainBg: 'hsl(0, 0%, 20%)',
  textOnMain: 'hsl(34, 78%, 91%)',
  primary: 'hsl(200, 100%, 40%)',
  secondary: 'hsl(50, 100%, 40%)',
  complementary: 'hsl(140, 100%, 40%)',
  danger: 'hsl(5, 100%, 60%)',
  success: 'hsl(140, 100%, 60%)',
  info: 'hsl(200, 100%, 60%)'
}

export const GlobalStyle = createGlobalStyle`
  ${reset()}
  ${normalize()}

  html { box-sizing: border-box; font-family: 'Lato', sans-serif; font-size: 10px; }

  *, *:before, *:after { box-sizing: inherit; outline: none; }
  *::-moz-focus-inner { border: none; }

  body { background-color: ${theme.mainBg}; color: ${theme.textOnMain}; font-size: 2rem; }

  a { color: ${tint(0.2, theme.secondary)}; transition: all 250ms ease-in-out; font-weight: 700;}
  a:hover { color: ${tint(0.4, theme.secondary)}; }
`
