import { Link } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';

import { styles } from './style';
import { IDietPlan } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/diet-plan-reducer';

interface Props {
	handleRemove: () => void;
	item: IDietPlan['meals'][number]['foods'][number];
	meal: IDietPlan['meals'][number];
}

export function FoodItem({ handleRemove, item, meal }: Props) {
	const text = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

	const backgroundColor = useThemeColor(
		{ light: Colors.light.backgroundSoft, dark: Colors.dark.backgroundSoft },
		'backgroundSoft'
	);

	console.log('servingCalories', item.servingCalories);
	console.log('quantity', item.quantity);

	return (
		<Swipeable
			overshootRight={false}
			renderRightActions={() => (
				<Animated.View>
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
			<ThemedView style={[styles.container, { backgroundColor }]}>
				<View>
					<ThemedText style={styles.title}>{item.foodName}</ThemedText>
					<ThemedText style={styles.kcal}>{Number(item.servingCalories || 0) * item.quantity} kcal</ThemedText>
					<ThemedText>
						{item.quantity} | {item.servingName}
					</ThemedText>
				</View>

				<Link
					style={styles.addButton}
					href={{
						pathname: '/nutritionist/diet-plan/add-food-diet-plan',
						params: {
							foodId: item.foodId,
							foodQuantity: item.quantity,
							servingId: item.servingId,
							isEditEnabled: 'true',
							mealId: meal.id,
							// mealFoodId: item.,
						},
					}}
				>
					<Ionicons
						name="add"
						size={32}
						color="white"
					/>
				</Link>

				<ThemedText style={styles.swipeText}>
					<Ionicons name="arrow-back" />
					Arraste
				</ThemedText>
			</ThemedView>
		</Swipeable>
	);
}
