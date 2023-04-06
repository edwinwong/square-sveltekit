import { BASE_PATH, SQ_APPLICATION_ID } from '$env/static/private'
const md5 = require('md5')
const scopes = [
  "ITEMS_READ",
  "MERCHANT_PROFILE_READ",
  "PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS",
  "PAYMENTS_WRITE",
  "PAYMENTS_READ"]

export async function load({ cookies }) {
  const state = md5(Date.now())
  const url = `${BASE_PATH}/oauth2/authorize?client_id=${SQ_APPLICATION_ID}&response_type=code&scope=${scopes.join('+')}&state=${state}`
  cookies.set('Auth_State', state, { expires: new Date(Date.now() + 300000) })
  return { url }
}
