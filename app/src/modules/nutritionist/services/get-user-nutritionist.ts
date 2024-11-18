import { ServiceOptions } from '@/types/ServiceOptions';
import { DietPlan } from '../contexts/nutri/reducers/nutritionist-reducer';

interface Response {
	id: string;
	firstName: string;
	lastName: string;
	photoUrl: string | null;
	crn: string;
	dietPlan: DietPlan[];
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getUserNutritionistApi({ accessToken }: ServiceOptions): Promise<Response> {
	const response = await fetch(`${apiUrl}/nutritionist/my`, {
		method: 'GET',
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
