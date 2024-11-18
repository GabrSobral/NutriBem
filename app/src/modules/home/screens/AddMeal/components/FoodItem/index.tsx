import { Link } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { ActivityIndicator, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';

import { IMealApi } from '@/modules/home/services/get-meals';
import { removeMealFoodApi } from '@/modules/home/services/remove-meal-food';
import { useAuth } from '@/contexts/AuthContext/hook';
import { styles } from './style';

interface Props {
	handleRemove: () => void;
	item: IMealApi['eatenFoods'][number];
}

export function FoodItem({ handleRemove, item }: Props) {
	const { accessToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const text = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

	const backgroundColor = useThemeColor(
		{ light: Colors.light.backgroundSoft, dark: Colors.dark.backgroundSoft },
		'backgroundSoft'
	);

	async function removeFoodItem() {
		setIsLoading(true);
		await removeMealFoodApi({ mealFoodId: item.id }, { accessToken: accessToken || '' });
		handleRemove();

		setIsLoading(false);
	}

	return (
		<Swipeable
			overshootRight={false}
			renderRightActions={() => (
				<Animated.View>
					<RectButton
						style={styles.buttonRemove}
						onPress={removeFoodItem}
						enabled={!isLoading}
					>
						{isLoading ? (
							<ActivityIndicator
								size="large"
								color="white"
							/>
						) : (
							<Ionicons
								name="trash-outline"
								size={32}
								color="white"
							/>
						)}
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
						pathname: '/user/home/add-food',
						params: {
							foodId: item.foodId,
							foodQuantity: item.quantity,
							servingId: item.servingId,
							isEditEnabled: 'true',
							mealFoodId: item.id,
						},
					}}
				>
					<Ionicons
						name="create-outline"
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
