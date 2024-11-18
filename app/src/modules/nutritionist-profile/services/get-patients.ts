import { ServiceOptions } from '@/types/ServiceOptions';
import { IPatient } from '../contexts/profile/reducers/patients-reducer';

type Response = IPatient;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getPatientsApi({ accessToken }: ServiceOptions): Promise<Response[]> {
	const response = await fetch(`${apiUrl}/nutritionist/patients`, {
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

	const body = (await response.json()) as Response[];

	return body;
}
