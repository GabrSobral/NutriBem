import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	recipeId: string;
}

export interface RecipeById {
	recipe: {
		cooking_time_min: string;
		directions: {
			direction: {
				direction_description: string;
				direction_number: string;
			}[];
		};
		grams_per_portion: string;
		ingredients: {
			ingredient: {
				food_id: string;
				food_name: string;
				ingredient_description: string;
				ingredient_url: string;
				measurement_description: string;
				number_of_units: string;
				serving_id: string;
			}[];
		};
		number_of_servings: string;
		preparation_time_min: string;
		rating: string;
		recipe_categories: {
			recipe_category: {
				recipe_category_name: string;
				recipe_category_url: string;
			}[];
		};
		recipe_description: string;
		recipe_id: string;
		recipe_images: {
			recipe_image: string[];
		};
		recipe_name: string;
		recipe_types: {
			recipe_type: string[];
		};
		recipe_url: string;
		serving_sizes: {
			serving: {
				calcium: string;
				calories: string;
				carbohydrate: string;
				cholesterol: string;
				fat: string;
				fiber: string;
				iron: string;
				monounsaturated_fat: string;
				polyunsaturated_fat: string;
				potassium: string;
				protein: string;
				saturated_fat: string;
				serving_size: string;
				sodium: string;
				sugar: string;
				trans_fat: string;
				vitamin_a: string;
				vitamin_c: string;
			};
		};
	};
}

export async function getRecipeById(
	{ recipeId }: Request,
	{ accessToken, cancellationToken }: ServiceOptions
): Promise<RecipeById> {
	const response = await fetch(`https://platform.fatsecret.com/rest/recipe/v2?recipe_id=${recipeId}&format=json`, {
		signal: cancellationToken,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) throw new Error(response?.body?.toString() || 'Erro ao buscar receita por ID.');

	return (await response.json()) as Promise<RecipeById>;
}
