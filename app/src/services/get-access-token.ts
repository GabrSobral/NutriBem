export interface IFatSecretToken {
	access_token: string;
	expires_in: number;
	expires_in_date?: Date; // only on client
	token_type: string;
	scope: string;
}

export async function getAccessToken(): Promise<IFatSecretToken> {
	const clientId = '';
	const clientSecret = '';
	const tokenUrl = 'https://oauth.fatsecret.com/connect/token';

	// Base64 encode the client_id and client_secret
	const credentials = btoa(`${clientId}:${clientSecret}`);

	const response = await fetch(tokenUrl, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${credentials}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials',
			scope: 'basic',
		}).toString(),
	});

	const json = await response.json();

	return json as IFatSecretToken;
}
