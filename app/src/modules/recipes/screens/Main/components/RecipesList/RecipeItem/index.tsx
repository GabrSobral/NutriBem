import { useNavigation } from 'expo-router';
import { Image, Pressable, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { Recipes } from '@/modules/recipes/services/get-recipes';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '@/modules/recipes/contexts/hook';

interface Props {
	item: Recipes['recipes']['recipe'][number];
}

export function RecipeItem({ item }: Props) {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const { recipesState } = useRecipes();

	return (
		<Pressable
			style={[styles.recipeItem, { borderColor: colorScheme === 'light' ? '#00000020' : '#FFFFFF40' }]}
			android_ripple={{ color: Colors.light.primary }}
			onPress={() => {
				navigation.navigate('user/recipes/recipe-detail', { recipeId: item.recipe_id });
			}}
		>
			<View style={[styles.imageItem, { position: 'relative' }]}>
				{!item.recipe_image ? (
					<View style={styles.imageItem} />
				) : (
					<Image
						resizeMode="cover"
						source={{ uri: item.recipe_image }}
						style={styles.imageItem}
					/>
				)}

				{recipesState.savedRecipes.some(savedRecipe => savedRecipe.recipeId === item.recipe_id) && (
					<>
						<View
							style={{
								flex: 1,
								position: 'absolute',
								backgroundColor: '#00000050',
								height: 130,
								width: 130,
								borderTopLeftRadius: 8,
								borderBottomLeftRadius: 8,
							}}
						/>

						<View
							style={{
								borderRadius: 90,
								padding: 6,
								position: 'absolute',
								top: 8,
								right: 8,
								backgroundColor: '#00000050',
							}}
						>
							<Ionicons
								name="bookmark"
								color={Colors.light.primary}
								size={26}
							/>
						</View>
					</>
				)}
			</View>

			<View style={styles.recipeTitleContainer}>
				<ThemedText
					type="defaultSemiBold"
					style={{ fontSize: 18 }}
				>
					{item.recipe_name}
				</ThemedText>

				<ThemedText numberOfLines={3}>{item.recipe_description}</ThemedText>
				<ThemedText
					type="defaultSemiBold"
					style={{ color: Colors.light.primary }}
				>
					{item.recipe_nutrition.calories} kcal
				</ThemedText>
			</View>
		</Pressable>
	);
}
