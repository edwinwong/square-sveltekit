import { BASE_PATH, SQ_APPLICATION_ID, SQ_APPLICATION_SECRET } from '$env/static/private'
import { ApiError, Client, Environment } from 'square'

let environment
if (BASE_PATH === 'https://connect.squareup.com') environment = Environment.Production
else environment = Environment.Sandbox

const squareClient = new Client({
	environment: environment,
	userAgentDetail: 'sample_app_oauth_node' // Remove or replace this detail when building your own app
})
const oauthInstance = squareClient.oAuthApi

export async function load({ cookies, url }) {
	if (cookies.get('Auth_State') !== url.searchParams.get('state')) {
		return { 'error': 'Authorization Failed\nInvalid state parameter' }
	}
	else if (url.searchParams.get('error')) {
		if (('access_denied' === url.searchParams.get('error')) && ('user_denied' === url.searchParams.get('error_description'))) {
			return { 'error': 'Authorization denied\nYou chose to deny access to the app.' }
		}
		else return { 'error': url.searchParams.get('error')+'\n'+url.searchParams.get('error_description') }
	}
	else if ('code' === url.searchParams.get('response_type')) {
		const code = url.searchParams.get('code')
		try {
			const { result } = await oauthInstance.obtainToken({
				code,
				clientId: SQ_APPLICATION_ID,
				clientSecret: SQ_APPLICATION_SECRET,
				grantType: 'authorization_code'
			})
			const { accessToken, refreshToken, expiresAt, merchantId } = result
			return { accessToken, refreshToken, expiresAt, merchantId }
		}
		catch (error) {
			if (error instanceof ApiError) return { 'error': JSON.stringify(error.result) }
			else return { 'error': JSON.stringify(error) }
		}
	}
	return {'error': 'Unknown parameters\nExpected parameters were not returned'}
}
