import { ServiceResponse } from '@/types/ServiceOptions';

interface Request {
	crn?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface Response {
	user: {
		id: string;
		firstName: string;
		lastName: string;
		address: string | null;
		email: string;
		createdAt: Date;
		photoUrl: string | null;
		crn: string | null;
		age: number | null;
		weight: number | null;
		height: number | null;
		mainObjective: string | null;
		sex: 'male' | 'female' | null;
	};
	accessToken: string;
	refreshToken: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function signUpApi({
	crn,
	firstName,
	lastName,
	email,
	password,
}: Request): Promise<ServiceResponse<Response>> {
	try {
		const response = await fetch(`${apiUrl}/auth/sign-up`, {
			method: 'POST',
			body: JSON.stringify({ crn, firstName, lastName, email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorBody = await response.json();
			console.error(`Something went wrong: ${JSON.stringify(errorBody)}; ${errorBody.message}`);
		}

		const body = (await response.json()) as Response;

		return {
			status: response.status,
			payload: body,
		};
	} catch (error) {
		return {
			status: 500,
			payload: error as any,
		};
	}
}
