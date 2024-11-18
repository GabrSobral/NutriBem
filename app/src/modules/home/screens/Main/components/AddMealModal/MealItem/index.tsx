import dayjs from 'dayjs';
import { useState } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext/hook';
import { useHome } from '@/modules/home/contexts/hook';
import { addMealApi } from '@/modules/home/services/add-meal';

import { PredefinedMeals } from '@/constants/PreDefinedMeals';

import { styles } from './style';

interface Props {
	item: (typeof PredefinedMeals)[number];
	onRequestClose: () => void;
	isDisabled?: boolean;
	disable: (value: boolean) => void;
}

export function MealItem({ item, onRequestClose, disable, isDisabled }: Props) {
	const { addMealAsync, homeState } = useHome();
	const [isLoading, setIsLoading] = useState(false);
	const { accessToken } = useAuth();
	// const router = useNavigation();

	async function selectFood(item: any) {
		try {
			disable(true);
			setIsLoading(true);

			const { mealId } = await addMealApi(
				{ name: item.name, order: homeState.meals.length + 1, registeredAt: dayjs(homeState.selectedDate).toDate() },
				{ accessToken: accessToken || '' }
			);

			await addMealAsync({
				id: mealId,
				name: item.name,
				maxKcal: 0,
				eatenFoods: [],
				dietPlanFoods: [],
			});

			onRequestClose();

			router.navigate({ pathname: '/user/home/add-meal' });
		} catch (error) {
			console.log(error);
		} finally {
			disable(false);
			setIsLoading(false);
		}
	}

	return (
		<Pressable
			style={[styles.mealButton, { backgroundColor: item.color, opacity: isDisabled ? 0.5 : 1 }]}
			android_ripple={{ color: 'white', borderless: false }}
			onPress={async () => await selectFood(item)}
			disabled={isDisabled}
		>
			{isLoading && (
				<View
					style={styles.loadingContainer}
					aria-disabled
					aria-label="Carregando..."
				>
					<ActivityIndicator
						size="large"
						color="white"
					/>
				</View>
			)}

			<View style={styles.imageContainer}>
				<Image
					source={item.image}
					style={{ width: '100%', height: 96, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
					resizeMode="cover"
				/>
			</View>

			<View style={{ padding: 16 }}>
				<Text style={[styles.mealTitle, { color: item.textColor }]}>{item.name}</Text>
				<Text style={[styles.mealDescription, { color: item.textColor }]}>{item.description}</Text>
			</View>
		</Pressable>
	);
}
