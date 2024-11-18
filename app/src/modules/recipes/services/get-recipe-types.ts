import { ServiceOptions } from '@/types/ServiceOptions';

export interface RecipeTypes {
	recipe_types: {
		recipe_type: string[];
	};
}

export async function getRecipeTypesApi({ accessToken, cancellationToken }: ServiceOptions): Promise<RecipeTypes> {
	console.log({ accessToken });
	const response = await fetch(`https://platform.fatsecret.com/rest/recipe-types/v1?format=json`, {
		signal: cancellationToken,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) throw new Error(response?.body?.toString() || 'Erro ao buscar tipos de receitas.');

	return (await response.json()) as Promise<RecipeTypes>;
}
