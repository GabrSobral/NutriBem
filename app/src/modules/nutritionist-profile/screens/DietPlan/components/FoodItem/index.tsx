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
import { IDietPlanMeal } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/diet-plan-reducer';

interface Props {
	meal: IDietPlanMeal;
	dietPlanId: string;
}

export function FoodItem({ meal, dietPlanId }: Props) {
	const totalKcal = meal.foods.reduce((acc, food) => acc + food.servingCalories * food.quantity, 0);

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

				<ThemedText style={{ fontWeight: 'bold' }}>{totalKcal} kcal</ThemedText>
			</View>

			<Link
				style={styles.addButton}
				href={{ pathname: '/nutritionist/diet-plan/meal-detail', params: { mealId: meal.id, dietPlanId } }}
				aria-label="Adicionar alimento"
				onPress={() => {}}
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
