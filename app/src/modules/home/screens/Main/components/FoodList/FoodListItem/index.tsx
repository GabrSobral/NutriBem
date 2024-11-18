import { Link } from 'expo-router';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { useHome } from '@/modules/home/contexts/hook';

import { styles } from './style';
import { Breakfast } from './Breakfast';
import { Lunch } from './Lunch';
import { Dinner } from './Dinner';
import { Snack } from './Snack';
import { IMealApi } from '@/modules/home/services/get-meals';
import { useState } from 'react';

interface Props {
	drag: () => void;
	disabled: boolean;
	handleRemove: () => Promise<void>;
	meal: IMealApi;
}

export function FoodListItem({ drag, handleRemove, meal, disabled }: Props) {
	const { homeDispatch } = useHome();
	const [isDeleting, setIsDeleting] = useState(false);

	const totalKcal = meal.eatenFoods
		.map(item => Number(item.servingCalories) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	async function remove() {
		setIsDeleting(true);
		await handleRemove();
		setIsDeleting(false);
	}

	return (
		<Swipeable
			overshootRight={false}
			shouldCancelWhenOutside={true}
			enabled={meal.dietPlanFoods.length === 0}
			renderRightActions={() => (
				<Animated.View>
					{isDeleting ? (
						<ActivityIndicator
							size={'large'}
							color="white"
						/>
					) : (
						<RectButton
							style={styles.buttonRemove}
							onPress={remove}
						>
							<Ionicons
								name="trash-outline"
								size={32}
								color="white"
							/>
						</RectButton>
					)}
				</Animated.View>
			)}
		>
			<TouchableOpacity
				activeOpacity={1}
				onLongPress={drag}
				disabled={disabled}
			>
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
							{totalKcal}/{meal.maxKcal} kcal
						</ThemedText>
					</View>

					<Link
						style={styles.addButton}
						href={{
							pathname: '/user/home/add-meal',
							params: meal.id,
						}}
						aria-label="Adicionar alimento"
						onPress={() => {
							homeDispatch({ type: 'SELECT_MEAL', payload: meal });
						}}
					>
						<Ionicons
							name="add"
							size={32}
							color="white"
						/>
					</Link>

					{meal.dietPlanFoods.length === 0 ? (
						<ThemedText style={styles.swipeText}>
							<Ionicons name="arrow-back" />
							<Ionicons name="arrow-up" />
							<Ionicons name="arrow-down" />
							Arraste e solte
						</ThemedText>
					) : (
						<ThemedText
							style={[styles.swipeText, { color: 'green' }]}
							type="defaultSemiBold"
						>
							Sugerido pelo plano
						</ThemedText>
					)}
				</ThemedView>
			</TouchableOpacity>
		</Swipeable>
	);
}
