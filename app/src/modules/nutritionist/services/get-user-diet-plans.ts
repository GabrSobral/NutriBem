import { ServiceOptions } from '@/types/ServiceOptions';
import { DietPlans } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';

type Response = DietPlans[];

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getUserDietPlansApi({ accessToken }: ServiceOptions): Promise<Response> {
	const response = await fetch(`${apiUrl}/diet-plan/my`, {
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
