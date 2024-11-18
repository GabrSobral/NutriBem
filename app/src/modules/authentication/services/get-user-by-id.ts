import { User } from '@/contexts/AuthContext';
import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	id: string;
}

type Response = User;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getUserByIdApi({ id }: Request, { accessToken }: ServiceOptions): Promise<Response> {
	const response = await fetch(`${apiUrl}/users/get-by-id/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken || '<no-access-token-provided>'}`,
		},
	});

	const body = (await response.json()) as Response;

	if (!response.ok) {
		throw new Error(`Something went wrong: ${JSON.stringify(body)}`);
	}

	return body;
}
