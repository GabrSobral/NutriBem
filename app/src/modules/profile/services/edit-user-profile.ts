import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	firstName: string;
	lastName: string;
	address: string | null;
	age: number | null;
	weight: number | null;
	height: number | null;
	sex: 'male' | 'female' | null;
	mainObjective: string | null;
}

type Response = void;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function editUserProfileApi(
	{ age, firstName, height, lastName, sex, weight, mainObjective, address }: Request,
	{ accessToken }: ServiceOptions
): Promise<Response> {
	const response = await fetch(`${apiUrl}/users/`, {
		method: 'PUT',
		body: JSON.stringify({
			age,
			firstName,
			lastName,
			height,
			address,
			sex,
			weight,
			mainObjective,
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
