import { View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';
import { RecipeItem } from './RecipeItem';
import { styles } from './style';
import { useRecipes } from '@/modules/recipes/contexts/hook';

export function RecipesList() {
	const { recipesState } = useRecipes();

	return (
		<View style={styles.container}>
			<ThemedText type="title">Receitas</ThemedText>

			{recipesState.recipes?.recipe?.map(item => (
				<RecipeItem
					item={item}
					key={item.recipe_id}
				/>
			))}
		</View>
	);
}
