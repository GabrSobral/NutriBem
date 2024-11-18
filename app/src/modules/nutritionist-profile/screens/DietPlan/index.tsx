import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Pressable, ScrollView, useColorScheme, View } from 'react-native';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { MacroNutrientsChart } from '@/modules/home/screens/FoodDetail/components/MacroNutrientsChart';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { FoodItem } from './components/FoodItem';

import { styles } from './style';
import { useNutritionistDietPlan } from '../../contexts/diet-plan/hook';

export function DietPlan() {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
	const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

	const { dietPlanState } = useNutritionistDietPlan();
	const selectedDietPlan = dietPlanState.selectedDietPlan;
	const { dietPlanId, patientId } = useLocalSearchParams() as any as {
		dietPlanId: string;
		patientId: string;
	};

	const ingestedKcal = selectedDietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingCalories) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedCarbs = selectedDietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingCarbohydrates) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedFats = selectedDietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingFats) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedProteins = selectedDietPlan?.meals
		.flatMap(meal => meal.foods)
		.map(item => Number(item.servingProteins) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	return (
		<View style={{ backgroundColor, flex: 1 }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

			<AppHeader
				title={selectedDietPlan?.name || ''}
				button={
					<Pressable
						android_ripple={{
							color: Colors.light.primary,
							borderless: false,
							radius: 18,
						}}
						aria-label="Editar"
						style={{ padding: 6, borderRadius: 20 }}
						onPress={() => navigation.navigate('diet-plan/edit-diet-plan', { dietPlanId, patientId })}
					>
						<Ionicons
							name="create-outline"
							size={24}
							color={textColor}
						/>
					</Pressable>
				}
			/>

			<ScrollView>
				<View style={styles.container}>
					<View>
						<ThemedText type="title">Gabriel Sobral</ThemedText>

						<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
							<ThemedText>{dayjs(selectedDietPlan?.startDate).format('DD/MM/YYYY')}</ThemedText>
							<Ionicons
								name="arrow-forward"
								size={18}
								color={Colors.light.primary}
							/>
							<ThemedText>{dayjs(selectedDietPlan?.endDate).format('DD/MM/YYYY')}</ThemedText>
						</View>
					</View>

					<View style={{ gap: 12 }}>
						<ThemedText type="subtitle">Descrição</ThemedText>

						<ThemedText>{selectedDietPlan?.description || '-'}</ThemedText>
					</View>

					<View style={{ gap: 12 }}>
						<ThemedText type="subtitle">Refeições diárias</ThemedText>

						<View style={{ gap: 8 }}>
							{selectedDietPlan?.meals?.length === 0 && <ThemedText>Nenhuma refeição encontrada</ThemedText>}
							{selectedDietPlan?.meals?.map(meal => (
								<FoodItem
									key={meal.id}
									dietPlanId={dietPlanId}
									meal={meal}
								/>
							))}
						</View>
					</View>

					{selectedDietPlan?.meals && selectedDietPlan?.meals?.length > 0 && (
						<MacroNutrientsChart
							calories={ingestedKcal || 0}
							carbohydrates={ingestedCarbs || 0}
							fats={ingestedFats || 0}
							proteins={ingestedProteins || 0}
						/>
					)}

					<ThemedText type="subtitle">Notas Adicionais</ThemedText>
					<ThemedView style={[styles.additionalInformationContainer, { backgroundColor: `${Colors.light.primary}10` }]}>
						{selectedDietPlan?.additionalNote.split(';').length === 0 && (
							<ThemedText>Nenhuma nota adicional encontrada</ThemedText>
						)}
						{selectedDietPlan?.additionalNote?.split(';').map((note, index) => (
							<ThemedView
								style={styles.ingredientItem}
								key={index}
							>
								<ThemedText type="defaultSemiBold">{String(index).padStart(2, '0')}.</ThemedText>
								<ThemedText style={{ flex: 1 }}>{note}</ThemedText>
							</ThemedView>
						))}
					</ThemedView>
				</View>
			</ScrollView>
		</View>
	);
}
