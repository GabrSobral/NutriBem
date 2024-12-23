import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator, Image, Pressable, Text, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Input } from '@/components/design-system/Input';
import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';
import ParallaxScrollView from '@/components/design-system/ParallaxScrollView';

import { NutrientsContaining } from './components/NutrientsContaining';
import { MacroNutrientsChart } from './components/MacroNutrientsChart';
import { AdditionalInformation } from './components/AdditionalInformation';

import { useThemeColor } from '@/hooks/useThemeColor';

import { useAuth } from '@/contexts/AuthContext/hook';

import { styles } from './style';
import { getFoodById, IFood } from '@/modules/home/services/get-food-by-id';
import { useNutritionistDietPlan } from '../../contexts/diet-plan/hook';
import { IDietPlanMeal } from '../../contexts/diet-plan/reducers/diet-plan-reducer';
import { editMealFoodApi } from '@/modules/home/services/edit-meal-food';
import dayjs from 'dayjs';

export type Serving = IFood['food']['servings']['serving'][number];

export function FoodDetail() {
	const [isFocus, setIsFocus] = useState(false);
	const { fatSecretToken, accessToken } = useAuth();
	const { dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();
	const [quantity, setQuantity] = useState(1);

	const [isLoading, setIsLoading] = useState(false);
	const [selectedServing, setSelectedServing] = useState<Serving | null>(null);

	const { foodId, mealId, foodQuantity, isEditEnabled, mealFoodId, servingId } = useLocalSearchParams() as any as {
		foodId: IFood['food']['food_id'];
		isEditEnabled?: 'true' | 'false';
		servingId?: Serving['serving_id'];
		mealFoodId?: string;
		foodQuantity?: string;
		mealId: string;
	};

	const meal = useMemo(
		() => dietPlanState.dailyMeals.find(item => item.id === mealId),
		[dietPlanState.dailyMeals, mealId]
	);

	const [currentFood, setCurrentFood] = useState<IFood | null>(null);

	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

	useEffect(() => {
		if (isEditEnabled === 'true' && foodQuantity) {
			setQuantity(Number(foodQuantity));
		}

		if (isEditEnabled === 'true' && servingId) {
			const serving = currentFood?.food?.servings.serving.find(s => s.serving_id === servingId);
			serving && setSelectedServing(serving);
		}
	}, [isEditEnabled, foodQuantity, servingId, currentFood?.food?.servings.serving]);

	useEffect(() => {
		if (!foodId || currentFood) {
			return;
		}

		getFoodById({ foodId: foodId }, { accessToken: fatSecretToken?.access_token }).then(food => {
			setCurrentFood(food);
			setSelectedServing(food.food.servings.serving[0]);
		});
	}, [foodId, fatSecretToken, currentFood]);

	function handleAddFoodToMeal() {
		if (!meal || !currentFood || !selectedServing) {
			return;
		}

		dietPlanDispatch({
			type: 'ADD_FOOD_TO_MEAL',
			payload: {
				mealId: meal.id,
				food: currentFood['food'],
				serving: selectedServing,
				quantity,
			},
		});

		router.back();
	}

	async function handleEditFoodToMeal() {
		if (!meal || !currentFood || !selectedServing) {
			return;
		}

		try {
			setIsLoading(true);

			dietPlanDispatch({
				type: 'EDIT_FOOD_TO_MEAL',
				payload: {
					mealId: meal.id,
					food: currentFood['food'],
					serving: selectedServing,
					quantity,
				},
			});

			router.back();
		} catch (error) {
			// console.error('Error adding food to meal', error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<ThemedView style={{ flex: 1, backgroundColor }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			<AppHeader title={currentFood?.food?.food_name || 'Alimento'} />

			<ParallaxScrollView
				headerImage={
					<View style={styles.headerContainer}>
						<View style={styles.dateBadge}>
							<ThemedText type="subtitle">{meal?.name || '-'}</ThemedText>
						</View>

						{currentFood?.food.food_images?.food_image[0].image_url && (
							<Image
								source={{
									uri: currentFood?.food.food_images?.food_image[0].image_url || '',
								}}
								style={{ width: '100%', height: 230 }}
							/>
						)}
					</View>
				}
				headerHeight={230}
				headerBackgroundColor={{ dark: '#000FFF', light: '#d0d0d0' }}
			>
				<View style={[styles.quantityContainer, { backgroundColor }]}>
					<Input
						placeholder="Qt"
						keyboardType="numeric"
						style={{ width: 60, color: textColor }}
						value={String(quantity)}
						onChangeText={text => setQuantity(Number(text))}
					/>

					<Dropdown
						style={[styles.dropdown, isFocus && { borderColor: Colors.light.primary }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={currentFood?.food?.servings.serving || []}
						search
						maxHeight={300}
						labelField="serving_description"
						valueField="serving_description"
						placeholder={!isFocus ? 'Select item' : '...'}
						searchPlaceholder="Pesquisar"
						value={selectedServing}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChange={item => {
							setSelectedServing(item);
							setIsFocus(false);
						}}
					/>
				</View>

				<Pressable
					style={[styles.addFoodButton, { opacity: isLoading ? 0.5 : 1 }]}
					android_ripple={{ color: 'white', borderless: false }}
					onPress={isEditEnabled === 'true' ? handleEditFoodToMeal : handleAddFoodToMeal}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator color="white" />
					) : (
						<Text style={{ color: 'white', fontSize: 16 }}>
							{isEditEnabled === 'true' ? `Editar no cardápio "${meal?.name}"` : `Adicionar ao "${meal?.name}"`}
						</Text>
					)}
				</Pressable>

				<ThemedText type="subtitle">Informações nutricionais</ThemedText>
				<ThemedText>{selectedServing?.serving_description}</ThemedText>

				<MacroNutrientsChart
					carbohydrates={selectedServing?.carbohydrate ? quantity * Number(selectedServing?.carbohydrate) : 1}
					fats={selectedServing?.fat ? quantity * Number(selectedServing?.fat) : 1}
					proteins={selectedServing?.protein ? quantity * Number(selectedServing?.protein) : 1}
					calories={selectedServing?.calories ? quantity * Number(selectedServing?.calories) : 1}
				/>
				<NutrientsContaining allergen={currentFood?.food.food_attributes?.allergens.allergen || []} />

				<AdditionalInformation
					serving={selectedServing}
					quantity={quantity}
				/>
			</ParallaxScrollView>
		</ThemedView>
	);
}
