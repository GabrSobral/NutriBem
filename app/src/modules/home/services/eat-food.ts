import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	mealId: string;
	mealFoodId: string;
}

type Response = void;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function eatFoodApi({ mealId, mealFoodId }: Request, { accessToken }: ServiceOptions): Promise<Response> {
	const response = await fetch(`${apiUrl}/meals/${mealId}/${mealFoodId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken || '<no-access-token-provided>'}`,
		},
	});

	if (!response.ok) {
		const body = await response.json();
		throw new Error(`Something went wrong: ${JSON.stringify(body)}`);
	}
}
