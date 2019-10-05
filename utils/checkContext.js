export const checkContext = (context, hookName, providerName) => {
  if (context === undefined) {
    throw new Error(`${hookName} must be used within a ${providerName}`)
  }
}
