import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
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

import { useHome } from '../../contexts/hook';
import { useAuth } from '@/contexts/AuthContext/hook';

import { getFoodById, IFood } from '../../services/get-food-by-id';
import { styles } from './style';
import { addMealFoodApi } from '../../services/add-meal-food';
import { IMealApi } from '../../services/get-meals';
import { editMealFoodApi } from '../../services/edit-meal-food';

export type Serving = IFood['food']['servings']['serving'][number];

export function FoodDetail() {
	const [isFocus, setIsFocus] = useState(false);
	const { fatSecretToken, accessToken } = useAuth();
	const { homeDispatch, homeState } = useHome();
	const [quantity, setQuantity] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const [selectedServing, setSelectedServing] = useState<Serving | null>(null);

	const params = useLocalSearchParams() as any as {
		foodId: IFood['food']['food_id'];
		isEditEnabled?: 'true' | 'false';
		foodQuantity?: string;
		servingId?: Serving['serving_id'];
		mealFoodId?: string;
	};

	const { foodId, isEditEnabled, foodQuantity, servingId, mealFoodId } = params;

	const [currentFood, setCurrentFood] = useState<IFood | null>(null);
	console.log({ currentFood: selectedServing });

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

	async function handleAddFoodToMeal() {
		if (!homeState.selectedMeal || !currentFood || !selectedServing) {
			return;
		}

		const mealFood: IMealApi['eatenFoods'][number] & { mealId: string } = {
			id: '',
			mealId: homeState.selectedMeal.id,
			foodId: currentFood['food']['food_id'],
			foodName: currentFood['food']['food_name'],
			quantity: quantity,
			servingFats: Number(selectedServing['fat']),
			servingProteins: Number(selectedServing['protein']),
			servingCalories: Number(selectedServing['calories']),
			servingCarbohydrates: Number(selectedServing['carbohydrate']),
			servingId: selectedServing['serving_id'],
			servingName: selectedServing['serving_description'],
		};

		try {
			setIsLoading(true);
			const { mealFoodId } = await addMealFoodApi(mealFood, { accessToken: accessToken || '' });

			homeDispatch({
				type: 'ADD_FOOD_TO_MEAL',
				payload: {
					id: mealFoodId,
					foodId: mealFood.foodId,
					foodName: mealFood.foodName,
					quantity: mealFood.quantity,
					servingId: mealFood.servingId,
					servingName: mealFood.servingName,
					mealId: mealFood.mealId,
					servingCalories: mealFood.servingCalories,
					servingCarbohydrates: mealFood.servingCarbohydrates,
					servingFats: mealFood.servingFats,
					servingProteins: mealFood.servingProteins,
				},
			});

			router.navigate({ pathname: '/user/home/add-meal' });
		} catch (error) {
			// console.error('Error adding food to meal', error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleEditFoodToMeal() {
		if (!homeState.selectedMeal || !currentFood || !selectedServing || !mealFoodId) {
			return;
		}

		const mealFood: IMealApi['eatenFoods'][number] & { mealId: string } = {
			id: mealFoodId,
			mealId: homeState.selectedMeal.id,
			foodId: currentFood['food']['food_id'],
			foodName: currentFood['food']['food_name'],
			quantity: quantity,
			servingFats: Number(selectedServing['fat']),
			servingProteins: Number(selectedServing['protein']),
			servingCalories: Number(selectedServing['calories']),
			servingCarbohydrates: Number(selectedServing['carbohydrate']),
			servingId: selectedServing['serving_id'],
			servingName: selectedServing['serving_description'],
		};

		try {
			setIsLoading(true);
			await editMealFoodApi({ ...mealFood, mealFoodId }, { accessToken: accessToken || '' });

			homeDispatch({
				type: 'EDIT_FOOD_TO_MEAL',
				payload: {
					id: mealFoodId,
					foodId: mealFood.foodId,
					foodName: mealFood.foodName,
					quantity: mealFood.quantity,
					servingId: mealFood.servingId,
					servingName: mealFood.servingName,
					mealId: mealFood.mealId,
					servingCalories: mealFood.servingCalories,
					servingCarbohydrates: mealFood.servingCarbohydrates,
					servingFats: mealFood.servingFats,
					servingProteins: mealFood.servingProteins,
				},
			});

			router.navigate({ pathname: '/user/home/add-meal' });
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
							<ThemedText type="subtitle">{homeState.selectedMeal?.name || '-'}</ThemedText>
							<ThemedText>{dayjs(homeState.selectedDate).locale('pt-br').format('dddd, DD [de] MMMM')}</ThemedText>
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
							{isEditEnabled === 'true'
								? `Editar no cardápio "${homeState.selectedMeal?.name}"`
								: `Adicionar ao "${homeState.selectedMeal?.name}"`}
						</Text>
					)}
				</Pressable>

				<ThemedText type="subtitle">Informações nutricionais</ThemedText>
				<ThemedText>
					{quantity}x {selectedServing?.serving_description}
				</ThemedText>

				<MacroNutrientsChart
					carbohydrates={selectedServing?.carbohydrate ? quantity * Number(selectedServing?.carbohydrate) : 1}
					fats={selectedServing?.fat ? quantity * Number(selectedServing?.fat) : 1}
					proteins={selectedServing?.protein ? quantity * Number(selectedServing?.protein) : 1}
					calories={selectedServing?.calories ? quantity * Number(selectedServing?.calories) : 1}
				/>
				<NutrientsContaining allergen={currentFood?.food.food_attributes?.allergens?.allergen || []} />

				<AdditionalInformation
					serving={selectedServing}
					quantity={quantity}
				/>
			</ParallaxScrollView>
		</ThemedView>
	);
}
