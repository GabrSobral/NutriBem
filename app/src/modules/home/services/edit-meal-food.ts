import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	mealFoodId: string;
	foodId?: string;
	foodName?: string;
	servingId?: string;
	servingName?: string;
	quantity?: number;
	servingCalories?: number;
	servingCarbohydrates?: number;
	servingFats?: number;
	servingProteins?: number;
}

type Response = { mealFoodId: string };

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function editMealFoodApi(
	{
		foodId,
		foodName,
		mealFoodId,
		quantity,
		servingCalories,
		servingCarbohydrates,
		servingFats,
		servingId,
		servingName,
		servingProteins,
	}: Request,
	{ accessToken }: ServiceOptions
): Promise<Response> {
	console.log('Adding food to meal', { foodName, servingName, quantity });

	const response = await fetch(`${apiUrl}/meals/food/${mealFoodId}`, {
		method: 'PATCH',
		body: JSON.stringify({
			foodId,
			foodName,
			quantity,
			servingCalories,
			servingCarbohydrates,
			servingFats,
			servingId,
			servingName,
			servingProteins,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken || '<no-access-token-provided>'}`,
		},
	});

	if (!response.ok) {
		const body = await response.json();
		throw new Error(`Something went wrong: ${JSON.stringify(body)}`);
	}
	const body = (await response.json()) as Response;

	return body;
}
