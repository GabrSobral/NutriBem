import { ulid } from 'ulidx';
import { useNavigation } from 'expo-router';
import { PredefinedMeals } from '@/constants/PreDefinedMeals';
import { FlatList, Image, Pressable, Text, useColorScheme, View } from 'react-native';

import { SlideModal } from '@/components/design-system/SlideModal';

import { useNutritionistDietPlan } from '@/modules/nutritionist-profile/contexts/diet-plan/hook';

import { styles } from './style';
import { IDietPlanMeal } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/diet-plan-reducer';

type Props = {
	visible: boolean;
	onRequestClose: () => void;
};

export function AddMealModal({ onRequestClose, visible }: Props) {
	const router = useNavigation();
	const { dietPlanDispatch } = useNutritionistDietPlan();
	const colorScheme = useColorScheme() as 'light' | 'dark';

	async function selectFood(item: any) {
		const meal: IDietPlanMeal = {
			id: ulid(),
			name: item.name,
			maxKcal: 0,
			foods: [],
		};

		dietPlanDispatch({ type: 'ADD_DAILY_MEALS', payload: meal });

		// router.navigate("diet-plan/diet-plan-meal", { mealId: item.name });
		onRequestClose();
	}

	return (
		<SlideModal
			title="Adicionar Refeição"
			visible={visible}
			onRequestClose={onRequestClose}
			height={534}
		>
			<View style={styles.container}>
				<FlatList
					data={PredefinedMeals}
					keyExtractor={item => item.name}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
					renderItem={({ item }) => (
						<Pressable
							style={[styles.mealButton, { backgroundColor: item.color }]}
							android_ripple={{ color: 'white', borderless: false }}
							onPress={async () => await selectFood(item)}
						>
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
					)}
				/>
			</View>
		</SlideModal>
	);
}
