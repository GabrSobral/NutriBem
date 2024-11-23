import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	recipeId: string;
	title: string;
	description: string;
	calories: number;
	photoUrl?: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function handleRecipeSave(
	{ calories, description, recipeId, title, photoUrl }: Request,
	{ accessToken, cancellationToken }: ServiceOptions
): Promise<void> {
	const response = await fetch(`${apiUrl}/users/recipe/save`, {
		body: JSON.stringify({ calories, description, recipeId, title, photoUrl }),
		signal: cancellationToken,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) throw new Error(response?.body?.toString() || 'Erro ao buscar tipos de receitas.');

	// (await response.json()) as Promise<void>;
}
