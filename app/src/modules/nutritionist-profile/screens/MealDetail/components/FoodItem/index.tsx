import { Link } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';
import { IMeal } from '@/modules/home/contexts/reducers/home-reducer';

import { styles } from './style';
import { IDietPlanMeal } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/diet-plan-reducer';

interface Props {
	item: IDietPlanMeal['foods'][number];
	mealName: IMeal['name'];
}

export function FoodItem({ item, mealName }: Props) {
	const backgroundColor = useThemeColor(
		{ light: Colors.light.backgroundSoft, dark: Colors.dark.backgroundSoft },
		'backgroundSoft'
	);

	return (
		<ThemedView style={[styles.container, { backgroundColor }]}>
			<View>
				<ThemedText style={styles.title}>{item.foodName}</ThemedText>
				<ThemedText style={styles.kcal}>{item.servingCalories * item.quantity} kcal</ThemedText>
				<ThemedText>
					{item.quantity}x {item.servingName}
				</ThemedText>
			</View>

			<Link
				style={styles.addButton}
				href={{
					pathname: '/user/nutri/food-detail',
					params: {
						foodId: item.foodId,
						selectedMealName: mealName,
						servingId: item.servingId,
						quantity: item.quantity,
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
	);
}
