import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { ActivityIndicator, Pressable, Text, useColorScheme, View } from 'react-native';

import { AppHeader } from '@/components/design-system/AppHeader';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useNutritionistDietPlan } from '../../contexts/diet-plan/hook';

import { DietPlanDate } from './components/DietPlanDate';
import { DietPlanAddMeal } from './components/DietPlanAddMeal';
import { AdditionalNotes } from './components/AdditionalNotes';
import { DietPlanDescription } from './components/DietPlanDescription';
import { DeleteDietPlanModal } from './components/DeleteDietPlanModal';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext/hook';
import { IPatient } from '../../contexts/profile/reducers/patients-reducer';

import { updateDietPlanApi, UpdateDietRequest } from '../../services/update-diet-plan';
import { removeDietPlanApi } from '../../services/remove-diet-plan';
import { useNutritionistProfile } from '../../contexts/profile/hook';

export function EditDietPlan() {
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const { patientId, dietPlanId } = useLocalSearchParams() as any as { patientId: IPatient['id']; dietPlanId: string };

	const { accessToken } = useAuth();
	const { goBack } = useNavigation();
	const colorScheme = useColorScheme();

	const [isLoading, setIsLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();
	const { patientsDispatch } = useNutritionistProfile();

	const isLoaded = useRef(false);

	useLayoutEffect(() => {
		dietPlanDispatch({ type: 'RESET_STATE' });
	}, []);

	useEffect(() => {
		if (dietPlanId && !isLoaded.current) {
			isLoaded.current = true;

			dietPlanDispatch({ type: 'SET_DESCRIPTION', payload: dietPlanState.selectedDietPlan?.description || '' });
			dietPlanDispatch({ type: 'SET_NAME', payload: dietPlanState.selectedDietPlan?.name || '' });
			dietPlanDispatch({
				type: 'SET_INITIAL_DATE',
				payload: new Date(dietPlanState.selectedDietPlan?.startDate) || new Date(),
			});

			dietPlanDispatch({
				type: 'SET_FINAL_DATE',
				payload: new Date(dietPlanState.selectedDietPlan?.endDate) || new Date(),
			});
			dietPlanDispatch({
				type: 'SET_ADDITIONAL_NOTES',
				payload:
					dietPlanState.selectedDietPlan?.additionalNote
						.split(';')
						.map(note => ({ note, id: (Math.random() * 100).toString(), order: 0 })) || [],
			});

			dietPlanDispatch({
				type: 'SET_DAILY_MEALS',
				payload:
					dietPlanState.selectedDietPlan?.meals.map(item => ({
						id: item.id,
						name: item.name,
						foods: item?.foods || [],
						maxKcal: item.maxKcal,
					})) || [],
			});

			isLoaded.current = true;
		}
	}, [dietPlanId, dietPlanState.selectedDietPlan]);

	async function updateDietPlan() {
		try {
			setIsLoading(true);

			console.log({
				dietPlanId: dietPlanId,
				meals: dietPlanState.dailyMeals.map(meal => ({
					id: meal.id,
					name: meal.name,
					foods: meal.foods.map(food => food.id),
				})),
			});

			await updateDietPlanApi(
				{
					dietPlanId: dietPlanId,
					patientId,
					name: dietPlanState.planName,
					description: dietPlanState.description,
					additionalNotes: dietPlanState.additionalNotes.map(note => note.note).join(';'),
					endDate: dietPlanState.planDate.final,
					startDate: dietPlanState.planDate.initial,
					meals: dietPlanState.dailyMeals.map<UpdateDietRequest['meals'][number]>(meal => ({
						id: meal.id,
						name: meal.name,
						foods: meal.foods,
					})),
				},
				{ accessToken: accessToken || '' }
			);

			goBack();
		} catch (error) {
			// console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View style={{ backgroundColor, flex: 1, position: 'relative' }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

			<DeleteDietPlanModal
				show={showDeleteModal}
				submit={async () => {
					try {
						await removeDietPlanApi({ dietPlanId }, { accessToken: accessToken || '' });
						patientsDispatch({ type: 'REMOVE_DIET_PLAN', payload: dietPlanId });
						dietPlanDispatch({ type: 'REMOVE_DIET_PLAN', payload: dietPlanId });
					} catch (error) {
						// console.error(error);

						setShowDeleteModal(false);
					}
				}}
				closeModal={() => setShowDeleteModal(false)}
			/>

			<AppHeader
				title="Plano Alimentar A"
				activeInput
				changeValue={value => dietPlanDispatch({ type: 'SET_NAME', payload: value })}
				inputValue={dietPlanState.planName}
				button={
					<Pressable
						android_ripple={{
							color: Colors.light.primary,
							borderless: false,
							radius: 18,
						}}
						aria-label="Remover"
						style={{ padding: 6, borderRadius: 20 }}
						onPress={() => setShowDeleteModal(true)}
					>
						<Ionicons
							name="trash-outline"
							color={'red'}
							size={24}
						/>
					</Pressable>
				}
			/>

			<GestureHandlerRootView>
				<NestableScrollContainer>
					<View style={styles.container}>
						<DietPlanDate />
						<DietPlanDescription />
						<DietPlanAddMeal />
						<AdditionalNotes />
					</View>
				</NestableScrollContainer>
			</GestureHandlerRootView>

			<Pressable
				style={styles.saveDietPlan}
				android_ripple={{ color: 'white' }}
				onPress={updateDietPlan}
			>
				{isLoading ? (
					<ActivityIndicator
						color={'white'}
						size="small"
					/>
				) : (
					<>
						<Text style={styles.saveDietPlanText}>Salvar alterações</Text>
						<Ionicons
							name="save-outline"
							size={24}
							color="white"
						/>
					</>
				)}
			</Pressable>
		</View>
	);
}
