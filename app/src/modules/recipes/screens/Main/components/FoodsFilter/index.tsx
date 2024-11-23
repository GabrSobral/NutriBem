import { Colors } from '@/constants/Colors';
import { Pressable, ScrollView, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { Lunch } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Lunch';
import { Snack } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Snack';
import { Breakfast } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Breakfast';

import { styles } from './style';
import { useRecipes } from '@/modules/recipes/contexts/hook';

export function FoodsFilter() {
	const colorScheme = useColorScheme() as 'light' | 'dark';
	const { recipesState, recipeTypesArr, setRecipeTypesArr } = useRecipes();
	const backgroundColor = Colors[colorScheme as 'light' | 'dark'].background;

	return (
		<View style={{ marginTop: 16, gap: 12 }}>
			<ThemedText type="title">Categorias ({recipeTypesArr.length})</ThemedText>

			<ScrollView
				horizontal
				style={{
					flexDirection: 'row',
					gap: 4,
				}}
			>
				{recipesState.recipeTypes?.map(recipeType => (
					<Pressable
						key={recipeType}
						onPress={() => {
							console.log(recipeTypesArr);
							setRecipeTypesArr(recipeTypesArr => {
								if (recipeTypesArr.includes(recipeType)) {
									return recipeTypesArr.filter(item => item !== recipeType);
								}
								return [...recipeTypesArr, recipeType];
							});
						}}
						android_ripple={{
							color: Colors.light.primary,
							borderless: false,
							radius: 66,
						}}
						style={[
							{
								backgroundColor: recipeTypesArr.includes(recipeType)
									? Colors[colorScheme].primarySoft
									: backgroundColor,
							},
							styles.categoryButton,
						]}
					>
						<Breakfast />
						<ThemedText
							type="defaultSemiBold"
							numberOfLines={1}
						>
							{recipeType}
						</ThemedText>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
}
