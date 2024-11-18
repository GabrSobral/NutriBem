import { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ActivityIndicator, Dimensions, Pressable, Text, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

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
import { IDietPlanMeal } from '../../contexts/diet-plan/reducers/diet-plan-reducer';
import { createDietPlanApi, CreateDietRequest } from '../../services/create-diet-plan';
import { useAuth } from '@/contexts/AuthContext/hook';
import { IPatient } from '../../contexts/profile/reducers/patients-reducer';
import { useNutritionistProfile } from '../../contexts/profile/hook';

const width = Dimensions.get('window').width;

export function AddDietPlan() {
	const { accessToken } = useAuth();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const { patientId } = useLocalSearchParams() as any as { patientId: IPatient['id'] };
	const { goBack } = useNavigation();
	const colorScheme = useColorScheme();

	const [isLoading, setIsLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();
	const { patientsQueryResult } = useNutritionistProfile();

	useLayoutEffect(() => {
		dietPlanDispatch({ type: 'RESET_STATE' });
	}, []);

	async function createDietPlan() {
		try {
			setIsLoading(true);

			await createDietPlanApi(
				{
					patientId,
					name: dietPlanState.planName,
					description: dietPlanState.description,
					additionalNotes: dietPlanState.additionalNotes.map(note => note.note).join(';'),
					endDate: dietPlanState.planDate.final,
					startDate: dietPlanState.planDate.initial,
					meals: dietPlanState.dailyMeals.map<CreateDietRequest['meals'][number]>(meal => ({
						name: meal.name,
						foods: meal.foods,
					})),
				},
				{ accessToken: accessToken || '' }
			);

			await patientsQueryResult?.refetch();

			goBack();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View style={{ backgroundColor, flex: 1, position: 'relative' }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

			<DeleteDietPlanModal
				show={showDeleteModal}
				submit={async () => {}}
				closeModal={() => setShowDeleteModal(false)}
			/>

			<AppHeader
				title="Plano Alimentar A"
				activeInput
				changeValue={value => dietPlanDispatch({ type: 'SET_NAME', payload: value })}
				inputValue={dietPlanState.planName}
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
				style={[
					styles.saveDietPlan,
					{ opacity: isLoading ? 0.5 : 1 },
					isLoading && { transform: [{ translateX: width / 2.4 }] },
				]}
				android_ripple={{ color: 'white' }}
				onPress={createDietPlan}
				disabled={isLoading}
			>
				{isLoading ? (
					<ActivityIndicator
						color={'white'}
						size="small"
					/>
				) : (
					<>
						<Text style={styles.saveDietPlanText}>Criar plano</Text>
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
