import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, useColorScheme, View } from 'react-native';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';
import { RecipeDetailBadge } from './components/RecipeDetailBadge';
import { RecipeIngredients } from './components/RecipeIngredients';
import { MacroNutrientsChart } from './components/MacroNutrientsChart';
import { AdditionalInformation } from './components/AdditionalInformation';
import ParallaxScrollView from '@/components/design-system/ParallaxScrollView';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { Recipes } from '../../services/get-recipes';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById, RecipeById } from '../../services/get-recipe-by-id';
import { useAuth } from '@/contexts/AuthContext/hook';
import { handleRecipeSave } from '../../services/handle-recipe-save';
import { useRecipes } from '../../contexts/hook';

export function RecipeScreen() {
	const colorScheme = useColorScheme();
	const { fatSecretToken, accessToken } = useAuth();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const { recipeId } = useLocalSearchParams() as any as {
		recipeId: Recipes['recipes']['recipe'][number]['recipe_id'];
	};

	const { recipesState, recipesDispatch } = useRecipes();

	const { data: recipe, isFetching } = useQuery<RecipeById>({
		queryKey: ['getRecipeById', recipeId],
		enabled: !!fatSecretToken?.access_token,
		queryFn: async () => await getRecipeById({ recipeId }, { accessToken: fatSecretToken?.access_token || '' }),
	});

	async function handleBookmark() {
		recipesDispatch({
			type: 'HANDLE_SAVE_RECIPES',
			payload: {
				calories: Number(recipe?.recipe.serving_sizes.serving.calories),
				description: recipe?.recipe.recipe_description || '',
				photoUrl: recipe?.recipe.recipe_images.recipe_image[0] || '',
				recipeId: recipeId,
				title: recipe?.recipe.recipe_name || '',
			},
		});

		await handleRecipeSave(
			{
				recipeId: recipeId,
				calories: Number(recipe?.recipe.serving_sizes.serving.calories),
				description: recipe?.recipe.recipe_description || '',
				title: recipe?.recipe.recipe_name || '',
				photoUrl: recipe?.recipe.recipe_images.recipe_image[0] || '',
			},
			{ accessToken: accessToken || '' }
		);
	}

	return (
		<ThemedView style={{ flex: 1, backgroundColor }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			<AppHeader title={recipe?.recipe?.recipe_name || ''} />

			<ParallaxScrollView
				headerImage={
					<View style={styles.headerContainer}>
						{recipe?.recipe.recipe_images?.recipe_image[0] && (
							<Image
								source={{
									uri: recipe?.recipe.recipe_images.recipe_image[0] || '',
								}}
								style={{ width: '100%', height: 230 }}
							/>
						)}

						<Pressable
							onPress={handleBookmark}
							style={{
								position: 'absolute',
								top: 12,
								right: 12,
								backgroundColor: '#FFFFFFff',
								padding: 8,
								borderRadius: 24,
							}}
						>
							<Ionicons
								name={
									recipesState.savedRecipes.some(item => item.recipeId === recipeId) ? 'bookmark' : 'bookmark-outline'
								}
								size={28}
								color={Colors.light.primary}
							/>
						</Pressable>
					</View>
				}
				headerHeight={230}
				headerBackgroundColor={{ dark: '#000FFF', light: '#d0d0d0' }}
			>
				<ThemedText type="subtitle">Detalhes</ThemedText>
				<RecipeDetailBadge recipe={recipe} />

				<ThemedText type="subtitle">Tipo de refeição</ThemedText>
				<View style={{ flex: 1, flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
					{recipe?.recipe.recipe_types.recipe_type.map((item, index) => (
						<View
							style={[styles.dateBadge, { backgroundColor: `${Colors.light.primary}10` }]}
							key={index}
						>
							<ThemedText type="defaultSemiBold">{item}</ThemedText>
						</View>
					))}
				</View>

				<ThemedText type="subtitle">Ingredientes</ThemedText>
				<RecipeIngredients recipe={recipe} />

				<ThemedText type="subtitle">Preparo</ThemedText>
				{recipe?.recipe.directions.direction.map((item, index) => (
					<ThemedView
						style={styles.ingredientItem}
						key={index}
					>
						<ThemedText type="defaultSemiBold">{item.direction_number.padStart(2, '0')}.</ThemedText>
						<ThemedText style={{ flex: 1 }}>{item.direction_description}</ThemedText>
					</ThemedView>
				))}

				<ThemedText type="subtitle">Por porção ({recipe?.recipe.grams_per_portion}g)</ThemedText>
				<MacroNutrientsChart
					calories={
						recipe?.recipe.serving_sizes.serving.calories ? Number(recipe?.recipe.serving_sizes.serving.calories) : 0
					}
					carbohydrates={
						recipe?.recipe.serving_sizes.serving.carbohydrate
							? Number(recipe?.recipe.serving_sizes.serving.carbohydrate)
							: 0
					}
					fats={recipe?.recipe.serving_sizes.serving.fat ? Number(recipe?.recipe.serving_sizes.serving.fat) : 0}
					proteins={
						recipe?.recipe.serving_sizes.serving.protein ? Number(recipe?.recipe.serving_sizes.serving.protein) : 0
					}
				/>

				<AdditionalInformation
					serving={recipe?.recipe.serving_sizes.serving}
					quantity={1}
				/>
			</ParallaxScrollView>
		</ThemedView>
	);
}
