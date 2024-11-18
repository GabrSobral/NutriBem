import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	nutritionistId: string;
}

interface Response {
	id: string;
	firstName: string;
	lastName: string;
	crn: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function associateNutritionistApi(
	{ nutritionistId }: Request,
	{ accessToken }: ServiceOptions
): Promise<Response> {
	const response = await fetch(`${apiUrl}/nutritionist/associate/${nutritionistId}`, {
		method: 'POST',
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
