import { ServiceOptions } from '@/types/ServiceOptions';

export interface UpdateDietRequest {
	dietPlanId: string;
	patientId: string;
	name: string;
	description: string;
	additionalNotes: string;
	startDate: Date;
	endDate: Date;
	meals: {
		id: string;
		name: string;
		foods: {
			id: string;
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

export async function updateDietPlanApi(
	requestBody: UpdateDietRequest,
	{ accessToken }: ServiceOptions
): Promise<Response[]> {
	const response = await fetch(`${apiUrl}/diet-plan/${requestBody.patientId}/${requestBody.dietPlanId}`, {
		method: 'PUT',
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
