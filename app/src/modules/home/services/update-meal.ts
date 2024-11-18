import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	mealId: string;
	name?: string;
	order?: number;
	fatCountMax?: number;
	proteinCountMax?: number;
	carbohydratesCountMax?: number;
	registeredAt?: Date;
}

type Response = void;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function updateMealApi(
	{ name, order, registeredAt, mealId, carbohydratesCountMax, fatCountMax, proteinCountMax }: Request,
	{ accessToken }: ServiceOptions
): Promise<Response> {
	const response = await fetch(`${apiUrl}/meals/${mealId}`, {
		method: 'PATCH',
		body: JSON.stringify({
			name,
			order,
			registeredAt,
			accessToken,
			carbohydratesCountMax,
			fatCountMax,
			proteinCountMax,
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
}
