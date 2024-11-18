import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions, ScrollView, useColorScheme, View } from 'react-native';

import { MacroNutrients } from './components/MacroNutrients';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useNutritionist } from '../../contexts/nutri/hook';

import { FoodItem } from './components/FoodItem';

import { styles } from './style';
import { useLocalSearchParams } from 'expo-router';

export function MealDetail() {
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const { nutritionistState } = useNutritionist();

	const { mealId, dietPlanId } = useLocalSearchParams() as { mealId: string; dietPlanId: string };

	const meal = nutritionistState.dietPlans
		.find(dietPlan => dietPlan.id === dietPlanId)
		?.meals.find(meal => meal.id === mealId);

	const ingestedKcal = meal?.foods.map(item => item.servingCalories).reduce((a, b) => Number(a) + Number(b), 0);
	const ingestedCarbs = meal?.foods.map(item => item.servingCarbohydrates).reduce((a, b) => Number(a) + Number(b), 0);
	const ingestedFats = meal?.foods.map(item => item.servingFats).reduce((a, b) => Number(a) + Number(b), 0);
	const ingestedProteins = meal?.foods.map(item => item.servingProteins).reduce((a, b) => Number(a) + Number(b), 0);

	const maxKcal = nutritionistState.dietPlans
		.find(dietPlan => dietPlan.id === dietPlanId)
		?.meals.reduce(
			(acc, meal) => acc + meal.foods.reduce((foodAcc, food) => food.servingCalories * food.quantity + foodAcc, 0),
			0
		);

	const maxCarbs = nutritionistState.dietPlans
		.find(dietPlan => dietPlan.id === dietPlanId)
		?.meals.reduce(
			(acc, meal) => acc + meal.foods.reduce((foodAcc, food) => food.servingCarbohydrates * food.quantity + foodAcc, 0),
			0
		);

	const maxFats = nutritionistState.dietPlans
		.find(dietPlan => dietPlan.id === dietPlanId)
		?.meals.reduce(
			(acc, meal) => acc + meal.foods.reduce((foodAcc, food) => food.servingFats * food.quantity + foodAcc, 0),
			0
		);

	const maxProteins = nutritionistState.dietPlans
		.find(dietPlan => dietPlan.id === dietPlanId)
		?.meals.reduce(
			(acc, meal) => acc + meal.foods.reduce((foodAcc, food) => food.servingProteins * food.quantity + foodAcc, 0),
			0
		);

	return (
		<ThemedView style={{ flex: 1, backgroundColor }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			<AppHeader title={meal?.name || ''} />

			<ScrollView style={[styles.container, { backgroundColor }]}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<ThemedText type="subtitle">Ingestão diária</ThemedText>
					<ThemedText>
						{ingestedKcal}/{maxKcal} kcal
					</ThemedText>
				</View>

				<Progress.Bar
					progress={(ingestedKcal || 1) / (maxKcal || 1)}
					height={8}
					style={{ marginTop: 12 }}
					width={Dimensions.get('window').width - 32}
					color={Colors.light.primary}
					unfilledColor="#00000010"
					borderWidth={0}
					borderRadius={16}
				/>

				<MacroNutrients
					carbs={{ current: ingestedCarbs || 0, max: maxCarbs || 0 }}
					fats={{ current: ingestedFats || 0, max: maxFats || 0 }}
					proteins={{ current: ingestedProteins || 0, max: maxProteins || 0 }}
				/>

				{meal?.foods.length !== 0 && (
					<Fragment>
						<ThemedText
							type="subtitle"
							style={{ marginTop: 12 }}
						>
							Refeições ({meal?.foods.length || 0})
						</ThemedText>

						<GestureHandlerRootView>
							<View style={styles.foodsList}>
								{meal?.foods.map((food, i) => (
									<FoodItem
										item={food}
										key={i}
										mealName={nutritionistState.selectedMeal?.name || ''}
									/>
								))}
							</View>
						</GestureHandlerRootView>
					</Fragment>
				)}
			</ScrollView>
		</ThemedView>
	);
}
