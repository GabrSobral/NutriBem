import { Link } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';

import { Lunch } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Lunch';
import { Snack } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Snack';
import { Dinner } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Dinner';
import { Breakfast } from '@/modules/home/screens/Main/components/FoodList/FoodListItem/Breakfast';
import { useNutritionistDietPlan } from '@/modules/nutritionist-profile/contexts/diet-plan/hook';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { IDietPlanMeal } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/diet-plan-reducer';

interface Props {
	meal: IDietPlanMeal;
	isActive: boolean;
}

export function FoodItem({ meal, isActive }: Props) {
	const { dietPlanDispatch } = useNutritionistDietPlan();
	const colorScheme = useColorScheme();

	function handleRemove() {
		dietPlanDispatch({ type: 'REMOVE_DAILY_MEALS', payload: meal.id });
	}

	return (
		<Swipeable
			overshootRight={false}
			// enabled={!isActive}
			containerStyle={{
				backgroundColor: Colors[colorScheme as 'light' | 'dark'].background,
			}}
			renderRightActions={() => (
				<Animated.View style={{ marginBottom: 6 }}>
					<RectButton
						style={styles.buttonRemove}
						onPress={handleRemove}
					>
						<Ionicons
							name="trash-outline"
							size={32}
							color="white"
						/>
					</RectButton>
				</Animated.View>
			)}
		>
			<ThemedView
				style={[
					styles.container,
					{
						backgroundColor: isActive
							? `${Colors[colorScheme as 'light' | 'dark'].primarySoft}`
							: Colors[colorScheme as 'light' | 'dark'].background,
					},
				]}
			>
				<Ionicons
					name="menu-outline"
					size={16}
					color={Colors[colorScheme as 'light' | 'dark'].text}
				/>
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
						{meal.foods.reduce((acc, item) => item.servingCalories * item.quantity + acc, 0)} kcal
					</ThemedText>
				</View>

				<Link
					style={styles.addButton}
					href={{
						pathname: '/nutritionist/diet-plan/diet-plan-meal',
						params: { mealId: meal.id },
					}}
					aria-label="Adicionar alimento"
					onPress={() => {}}
				>
					<Ionicons
						name="chevron-forward"
						size={32}
						color="white"
					/>
				</Link>

				<ThemedText style={styles.swipeText}>
					<Ionicons name="arrow-back" />
					<Ionicons name="arrow-up" />
					<Ionicons name="arrow-down" />
					Arraste ou segure
				</ThemedText>
			</ThemedView>
		</Swipeable>
	);
}
