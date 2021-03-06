import Head from 'next/head'

const HtmlHead = props => {
  const { title } = props

  return (
    <Head>
      <title>Dev Connector Next{title && ` | ${title}`}</title>

      <meta charSet='utf-8' />
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
      />

      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
      <link rel='stylesheet' href='/static/fonts/lato.css' />
    </Head>
  )
}

export default HtmlHead
