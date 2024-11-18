import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	search: string;
}

export interface Recipes {
	recipes: {
		max_results: string;
		page_number: string;
		recipe: {
			recipe_description: string;
			recipe_id: string;
			recipe_image: string;
			recipe_ingredients: {
				ingredient: string[];
			};
			recipe_name: string;
			recipe_nutrition: {
				calories: string;
				carbohydrate: string;
				fat: string;
				protein: string;
			};
			recipe_types: {
				recipe_type: string[];
			};
		}[];
		total_results: string;
	};
}

export async function getRecipes(
	{ search }: Request,
	{ accessToken, cancellationToken }: ServiceOptions
): Promise<Recipes> {
	const response = await fetch(
		`https://platform.fatsecret.com/rest/recipes/search/v3?format=json&search_expression=${search}&must_have_images=true`,
		{
			signal: cancellationToken,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) throw new Error(response?.body?.toString() || 'Erro ao buscar tipos de receitas.');

	return (await response.json()) as Promise<Recipes>;
}
