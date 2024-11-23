import { View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { styles } from './style';
import { RecipeItem } from './RecipeItem';
import { useRecipes } from '@/modules/recipes/contexts/hook';

export function SavedRecipes() {
	const textColor = useThemeColor({}, 'text');
	const { recipesState } = useRecipes();

	return (
		<View>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Receitas salvas</ThemedText>
			</ThemedView>

			<ThemedText>Aqui você encontra as receitas que você salvou guardadas com carinho 🥖.</ThemedText>

			<View style={{ gap: 12, marginTop: 12 }}>
				{recipesState.savedRecipes.map(item => (
					<RecipeItem
						item={item}
						key={item.recipeId}
					/>
				))}
			</View>
		</View>
	);
}
