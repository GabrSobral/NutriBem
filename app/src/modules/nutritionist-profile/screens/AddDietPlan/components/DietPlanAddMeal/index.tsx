import { Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NestableDraggableFlatList, ScaleDecorator } from 'react-native-draggable-flatlist';

import { Button } from '@/components/design-system/Button';
import { ThemedText } from '@/components/design-system/ThemedText';

import { useNutritionistDietPlan } from '@/modules/nutritionist-profile/contexts/diet-plan/hook';

import { FoodItem } from './FoodItem';
import { MacroNutrientsChart } from '../../../FoodDetail/components/MacroNutrientsChart';

import { Colors } from '@/constants/Colors';
import { AddMealModal } from './AddMealModal';
import { styles } from './style';
import { IDietPlanMeal } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/diet-plan-reducer';

export function DietPlanAddMeal() {
	const { dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();

	const [showMealModal, setShowMealModal] = useState(false);

	const ingestedKcal = dietPlanState.dailyMeals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingCalories) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedCarbs = dietPlanState.dailyMeals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingCarbohydrates) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedFats = dietPlanState.dailyMeals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingFats) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedProteins = dietPlanState.dailyMeals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingProteins) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	return (
		<Fragment>
			<AddMealModal
				visible={showMealModal}
				onRequestClose={() => setShowMealModal(false)}
			/>

			<View style={styles.buttonContainer}>
				<ThemedText type="subtitle">Refeições diárias</ThemedText>

				<Button
					style={{
						width: 180,
						backgroundColor: Colors.light.primary,
						paddingVertical: 8,
						marginTop: 0,
					}}
					onPress={() => setShowMealModal(true)}
				>
					Adicionar refeição
				</Button>
			</View>

			<GestureHandlerRootView>
				<View style={{ gap: 8 }}>
					<NestableDraggableFlatList
						data={dietPlanState.dailyMeals}
						keyExtractor={item => item.id}
						onDragEnd={({ data }) =>
							dietPlanDispatch({
								type: 'SET_DAILY_MEALS',
								payload: data,
							})
						}
						ListEmptyComponent={
							<ThemedText style={{ marginHorizontal: 'auto', padding: 12 }}>Nenhuma refeição cadastrada</ThemedText>
						}
						renderItem={({ item, drag, isActive, getIndex }) => (
							<ScaleDecorator activeScale={1.05}>
								<TouchableOpacity
									activeOpacity={1}
									onLongPress={drag}
									disabled={isActive}
								>
									<FoodItem
										meal={item as IDietPlanMeal}
										isActive={isActive}
									/>
								</TouchableOpacity>
							</ScaleDecorator>
						)}
					/>
				</View>
			</GestureHandlerRootView>

			{dietPlanState.dailyMeals.length > 0 && (
				<MacroNutrientsChart
					calories={ingestedKcal}
					carbohydrates={ingestedCarbs}
					fats={ingestedFats}
					proteins={ingestedProteins}
				/>
			)}
		</Fragment>
	);
}
