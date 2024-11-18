import { useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { router, useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView, useColorScheme, View } from 'react-native';

import { FoodItem } from './components/FoodItem';
import { MacroNutrients } from './components/MacroNutrients';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { styles } from './style';
import { SearchedFood } from '@/modules/home/services/search-food';
import { useNutritionistDietPlan } from '../../contexts/diet-plan/hook';
import { useNutritionistProfile } from '../../contexts/profile/hook';

type Food = SearchedFood['foods']['food'][number];

export function AddMeal() {
	// const router = useNavigation();
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
	const { mealId, dietPlanId } = useLocalSearchParams() as { mealId: string; dietPlanId: string };

	const [isFocus, setIsFocus] = useState(false);
	const [value, setValue] = useState<Food | null>(null);
	const [foods, setFoods] = useState<SearchedFood['foods']['food']>([]);
	const prevAbortController = useRef<AbortController | null>(null);

	const { searchFoodAsync, dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();
	const { patientsState } = useNutritionistProfile();

	const meal = useMemo(
		() => dietPlanState.dailyMeals.find(item => item.id === mealId),
		[dietPlanState.dailyMeals, mealId]
	);

	const dietPlan = patientsState.selectedPatient?.dietPlans.find(item => item.id === dietPlanId);

	const ingestedKcal = meal?.foods
		.map(item => Number(item.servingCalories) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedCarbs = meal?.foods
		.map(item => Number(item.servingCarbohydrates) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedFats = meal?.foods
		.map(item => Number(item.servingFats) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedProteins = meal?.foods
		.map(item => Number(item.servingProteins) * item.quantity)
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
				<View style={styles.searchContainer}>
					<Dropdown
						style={[styles.dropdown, isFocus && { borderColor: Colors.light.primary }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={foods || []}
						search
						maxHeight={300}
						labelField="food_name"
						valueField="food_name"
						placeholder={!isFocus ? 'Select item' : '...'}
						searchPlaceholder="Pesquisar"
						value={value}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChangeText={async value => {
							prevAbortController.current?.abort();
							const abortController = new AbortController();

							const result = await searchFoodAsync(value, abortController.signal);
							prevAbortController.current = abortController;

							setFoods(result?.foods.food || []);
						}}
						onChange={food => {
							setValue(food);

							router.navigate({
								pathname: '/nutritionist/diet-plan/add-food-diet-plan',
								params: { foodId: food.food_id, mealId },
							});

							setIsFocus(false);
						}}
					/>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 16,
					}}
				>
					<ThemedText type="subtitle">Ingestão diária</ThemedText>
					<ThemedText style={{ color: Colors.light.primary, fontWeight: 'bold' }}>{ingestedKcal} kcal</ThemedText>
				</View>

				<MacroNutrients
					carbs={{ current: ingestedCarbs || 0, max: 0 }}
					fats={{ current: ingestedFats || 0, max: 0 }}
					proteins={{ current: ingestedProteins || 0, max: 0 }}
				/>

				<ThemedText
					type="subtitle"
					style={{ marginTop: 12 }}
				>
					Refeições sugeridas ({meal?.foods.length})
				</ThemedText>

				<GestureHandlerRootView>
					<View style={styles.foodsList}>
						{meal?.foods.length === 0 && (
							<View
								style={{
									paddingHorizontal: 16,
									width: 'auto',
									paddingVertical: 6,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 16,
									backgroundColor: `${Colors.light.primary}20`,
								}}
							>
								<ThemedText>Nenhum alimento sugerido</ThemedText>
							</View>
						)}

						{meal?.foods?.map(food => (
							<FoodItem
								item={food}
								key={`${food.foodId}_${food.servingId}`}
								meal={meal}
								handleRemove={() =>
									dietPlanDispatch({
										type: 'REMOVE_FOOD_FROM_MEAL',
										payload: {
											foodId: food.foodId,
											mealId: meal?.id || '',
										},
									})
								}
							/>
						))}
					</View>
				</GestureHandlerRootView>
			</ScrollView>
		</ThemedView>
	);
}
