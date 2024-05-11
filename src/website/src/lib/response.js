export const response = {
  success: (data = null, log = false) => {
    log && console.log({ success: true, data })

    return { success: true, data }
  },
  error: (message, { error = null, data = null, log = false } = {}) => {
    log && console.error({ success: false, message, error, data })

    return {
      success: false,
      error: message,
      message,
    }
  },
}
