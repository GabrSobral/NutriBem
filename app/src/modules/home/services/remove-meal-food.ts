import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	mealFoodId: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function removeMealFoodApi({ mealFoodId }: Request, { accessToken }: ServiceOptions): Promise<void> {
	const response = await fetch(`${apiUrl}/meals/food/${mealFoodId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken || '<no-access-token-provided>'}`,
		},
	});

	if (!response.ok) {
		const body = await response.json();
		throw new Error(`Something went wrong: ${JSON.stringify(body)}`);
	}

	return;
}
