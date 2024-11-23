import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions, ScrollView, useColorScheme, View } from 'react-native';

import { FoodItem } from './components/FoodItem';
import { MacroNutrients } from './components/MacroNutrients';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { styles } from './style';
import { useNutritionistProfile } from '../../contexts/profile/hook';
import { useLocalSearchParams } from 'expo-router';

export function MealDetail() {
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const { patientsState } = useNutritionistProfile();

	const { dietPlanId, mealId } = useLocalSearchParams() as { mealId: string; dietPlanId: string };

	const dietPlan = patientsState.selectedPatient?.dietPlans.find(item => item.id === dietPlanId);
	const meal = dietPlan?.meals.find(item => item.id === mealId);

	const ingestedKcal = meal?.foods
		.map(item => item.servingCalories * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);
	const ingestedCarbs = meal?.foods
		.map(item => item.servingCarbohydrates * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);
	const ingestedFats = meal?.foods
		.map(item => item.servingFats * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);
	const ingestedProteins = meal?.foods
		.map(item => item.servingProteins * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const maxKcal = dietPlan?.meals.reduce(
		(acc, item) => item.foods.reduce((foodAcc, food) => food.servingCalories * food.quantity + foodAcc, 0) + acc,
		0
	);
	const maxCarbs = dietPlan?.meals.reduce(
		(acc, item) => item.foods.reduce((foodAcc, food) => food.servingCarbohydrates * food.quantity + foodAcc, 0) + acc,
		0
	);
	const maxFats = dietPlan?.meals.reduce(
		(acc, item) => item.foods.reduce((foodAcc, food) => food.servingFats * food.quantity + foodAcc, 0) + acc,
		0
	);
	const maxProteins = dietPlan?.meals.reduce(
		(acc, item) => item.foods.reduce((foodAcc, food) => food.servingProteins * food.quantity + foodAcc, 0) + acc,
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
										key={i}
										item={food}
										mealName={meal?.name || ''}
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
