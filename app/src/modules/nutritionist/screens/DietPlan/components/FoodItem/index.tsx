import { Link } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';

import { IMeal } from '@/modules/home/contexts/reducers/home-reducer';
import { Lunch } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Lunch';
import { Snack } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Snack';
import { Dinner } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Dinner';
import { Breakfast } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Breakfast';

import { styles } from './style';
import { DietPlans } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';
import { useNutritionist } from '@/modules/nutritionist/contexts/nutri/hook';

interface Props {
	meal: DietPlans['meals'][number];
	totalKcal: number;
	dietPlanId: string;
}

export function FoodItem({ meal, totalKcal, dietPlanId }: Props) {
	const { nutritionistState } = useNutritionist();

	const dietPlan = nutritionistState.dietPlans.find(plan => plan.id === dietPlanId);
	const maxKcal = dietPlan?.meals
		.find(m => m.id === meal.id)
		?.foods.reduce((acc, curr) => acc + curr.servingCalories * curr.quantity, 0);

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.imageContainer}>
				{meal.name === 'Café da manhã' && <Breakfast />}
				{meal.name === 'Almoço' && <Lunch />}
				{meal.name === 'Jantar' && <Dinner />}
				{meal.name === 'Lanche' && <Snack />}
			</ThemedView>

			<View>
				<ThemedText
					type="subtitle"
					style={styles.title}
				>
					{meal.name}
				</ThemedText>

				<ThemedText style={{ fontWeight: 'bold' }}>
					{totalKcal}/{maxKcal} kcal
				</ThemedText>
			</View>

			<Link
				style={styles.addButton}
				aria-label="Visualizar refeição"
				href={{ pathname: '/user/nutri/meal-detail', params: { mealId: meal.id, dietPlanId } }}
			>
				<Ionicons
					name="chevron-forward"
					size={32}
					color="white"
				/>
			</Link>
		</ThemedView>
	);
}
