import { UserProvider, ProfileProvider } from '../context'

const ProviderComposer = ({ contexts, children }) =>
  contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  )

const ContextProvider = ({ children, authStatus, pathname }) => (
  <ProviderComposer
    contexts={[
      <UserProvider authStatus={authStatus} pathname={pathname} />,
      <ProfileProvider authStatus={authStatus} />
    ]}>
    {children}
  </ProviderComposer>
)

export { ContextProvider }
