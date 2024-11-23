import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { RecipeById } from '@/modules/recipes/services/get-recipe-by-id';

interface Props {
	recipe?: RecipeById;
}

export function RecipeIngredients({ recipe }: Props) {
	return (
		<ThemedView style={[styles.container, { backgroundColor: `${Colors.light.primary}10` }]}>
			{recipe?.recipe.ingredients.ingredient.map((ingredient, index) => (
				<ThemedView
					style={styles.ingredientItem}
					key={index}
				>
					<ThemedText type="defaultSemiBold">{(index + 1).toString().padStart(2, '0')}.</ThemedText>
					<ThemedText style={{ flex: 1 }}>{ingredient.ingredient_description}</ThemedText>
				</ThemedView>
			))}
		</ThemedView>
	);
}
