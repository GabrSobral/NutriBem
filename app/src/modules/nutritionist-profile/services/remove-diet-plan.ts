import { ServiceOptions } from '@/types/ServiceOptions';

export interface UpdateDietRequest {
	dietPlanId: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function removeDietPlanApi(
	{ dietPlanId }: UpdateDietRequest,
	{ accessToken }: ServiceOptions
): Promise<void> {
	const response = await fetch(`${apiUrl}/diet-plan/${dietPlanId}`, {
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
}
