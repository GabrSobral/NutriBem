import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	name: string;
	order: number;
	registeredAt: Date;
}

interface Response {
	mealId: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function addMealApi(
	{ name, order, registeredAt }: Request,
	{ accessToken }: ServiceOptions
): Promise<Response> {
	const response = await fetch(`${apiUrl}/meals`, {
		method: 'POST',
		body: JSON.stringify({ name, order, registeredAt }),
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
