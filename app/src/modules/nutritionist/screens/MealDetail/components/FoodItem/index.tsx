import { Link } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';
import { IMeal } from '@/modules/home/contexts/reducers/home-reducer';

import { styles } from './style';
import { DietPlans } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';

interface Props {
	item: DietPlans['meals'][number]['foods'][number];
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

				<ThemedText style={styles.kcal}>{item.servingCalories} kcal</ThemedText>

				<ThemedText>
					{item.quantity} | {item.servingName}
				</ThemedText>
			</View>

			<Link
				style={styles.addButton}
				href={{
					pathname: 'user/nutri/food-detail',
					params: {
						foodId: item.foodId,
						selectedMealName: mealName,
						servingId: item.servingId,
						quantity: item.quantity,
					},
				}}
			>
				<Ionicons
					name="arrow-forward"
					size={32}
					color="white"
				/>
			</Link>
		</ThemedView>
	);
}
