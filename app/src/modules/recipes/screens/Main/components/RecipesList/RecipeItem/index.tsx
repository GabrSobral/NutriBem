import { useNavigation } from 'expo-router';
import { Image, Pressable, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { Recipes } from '@/modules/recipes/services/get-recipes';

interface Props {
	item: Recipes['recipes']['recipe'][number];
}

export function RecipeItem({ item }: Props) {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();

	return (
		<Pressable
			style={[styles.recipeItem, { borderColor: colorScheme === 'light' ? '#00000020' : '#FFFFFF40' }]}
			android_ripple={{ color: Colors.light.primary }}
			onPress={() => {
				navigation.navigate('user/recipes/recipe-detail', { recipeId: item });
			}}
		>
			<Image
				resizeMode="cover"
				source={{ uri: item.recipe_image }}
				style={styles.imageItem}
			/>

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
