import { ServiceOptions } from '@/types/ServiceOptions';

export interface CreateDietRequest {
	patientId: string;
	name: string;
	description: string;
	additionalNotes: string;
	startDate: Date;
	endDate: Date;
	meals: {
		name: string;
		foods: {
			foodId: string;
			foodName: string;

			servingId: string;
			servingName: string;

			servingFats: number;
			servingProteins: number;
			servingCarbohydrates: number;
			servingCalories: number;

			quantity: number;
		}[];
	}[];
}

type Response = { dietPlanId: string };

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function createDietPlanApi(
	requestBody: CreateDietRequest,
	{ accessToken }: ServiceOptions
): Promise<Response[]> {
	console.log(JSON.stringify(requestBody));
	const response = await fetch(`${apiUrl}/diet-plan/${requestBody.patientId}`, {
		method: 'POST',
		body: JSON.stringify(requestBody),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken || '<no-access-token-provided>'}`,
		},
	});

	if (!response.ok) {
		const body = await response.json();
		throw new Error(`Something went wrong: ${JSON.stringify(body)}`);
	}

	const body = (await response.json()) as Response[];

	return body;
}
