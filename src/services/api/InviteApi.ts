import fetcher from './fetcher'

export const generateInviteCode = async () => {
  return fetcher('/api/invite/generate-invite', {
    method: 'POST',
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
      throw error
    })
}
