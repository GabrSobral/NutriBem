import { ServiceOptions } from '@/types/ServiceOptions';

export interface SavedRecipe {
	recipeId: string;
	calories: number;
	title: string;
	description: string;
	photoUrl: string | null;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getSavedRecipes({ accessToken, cancellationToken }: ServiceOptions): Promise<SavedRecipe[]> {
	const response = await fetch(`${apiUrl}/users/recipe/save/`, {
		signal: cancellationToken,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) throw new Error(response?.body?.toString() || 'Erro ao buscar tipos de receitas.');

	return (await response.json()) as Promise<SavedRecipe[]>;
}
