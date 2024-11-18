import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, useColorScheme, View } from 'react-native';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { IMeal } from '@/modules/home/contexts/reducers/home-reducer';
import { MacroNutrientsChart } from '@/modules/home/screens/FoodDetail/components/MacroNutrientsChart';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';
import { FoodItem } from './components/FoodItem';

import { styles } from './style';
import { useLocalSearchParams } from 'expo-router';
import { useNutritionist } from '../../contexts/nutri/hook';

export function DietPlan() {
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
	const colorScheme = useColorScheme();

	const { nutritionistState } = useNutritionist();

	const { dietPlanId } = useLocalSearchParams() as { dietPlanId: string };

	const dietPlan = nutritionistState.dietPlans.find(dietPlan => dietPlan.id === dietPlanId);

	const ingestedKcal = dietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingCalories) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedCarbs = dietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingCarbohydrates) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedFats = dietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingFats) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedProteins = dietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingProteins) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	return (
		<View style={{ backgroundColor, flex: 1 }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

			<AppHeader title="Plano Alimentar A" />

			<ScrollView>
				<View style={styles.container}>
					<ThemedText type="subtitle">Descrição</ThemedText>

					<ThemedText>{dietPlan?.description}</ThemedText>

					<ThemedText type="subtitle">Ingestão diária</ThemedText>
					<ThemedText
						type="subtitle"
						style={{ color: Colors.light.primary, fontSize: 18 }}
					>
						{ingestedKcal} kcal
					</ThemedText>

					<ThemedText type="subtitle">Refeições diárias</ThemedText>

					<View style={{ gap: 8 }}>
						{dietPlan?.meals.map(meal => (
							<FoodItem
								key={meal.id}
								totalKcal={meal.foods.reduce((acc, food) => acc + food.servingCalories * food.quantity, 0)}
								meal={meal}
								dietPlanId={dietPlanId}
							/>
						))}
					</View>

					<MacroNutrientsChart
						calories={ingestedKcal || 0}
						carbohydrates={ingestedCarbs || 0}
						fats={ingestedFats || 0}
						proteins={ingestedProteins || 0}
					/>

					<ThemedText type="subtitle">Notas Adicionais</ThemedText>
					<ThemedView style={[styles.additionalInformationContainer, { backgroundColor: `${Colors.light.primary}10` }]}>
						{dietPlan?.additionalNote.split(';').map((note, index) => (
							<ThemedView
								style={styles.ingredientItem}
								key={index}
							>
								<ThemedText type="defaultSemiBold">{(index + 1).toString().padStart(2, '0')}.</ThemedText>
								<ThemedText style={{ flex: 1 }}>{note}</ThemedText>
							</ThemedView>
						))}
					</ThemedView>
				</View>
			</ScrollView>
		</View>
	);
}
