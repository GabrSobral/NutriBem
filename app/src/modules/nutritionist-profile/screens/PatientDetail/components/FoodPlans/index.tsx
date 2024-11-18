import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';
import { DietPlanItem } from './DietPlanItem';

import { IPatient } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { useNutritionistProfile } from '@/modules/nutritionist-profile/contexts/profile/hook';

interface Props {
	patientId: IPatient['id'];
}

export function FoodPlans({ patientId }: Props) {
	const colorScheme = useColorScheme() as 'light' | 'dark';
	const { patientsState, patientsQueryResult } = useNutritionistProfile();

	return (
		<View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<ThemedText
					type="title"
					style={styles.titleContainer}
				>
					Planos alimentares
				</ThemedText>

				<TouchableOpacity onPress={() => patientsQueryResult?.refetch()}>
					<Ionicons
						name="refresh"
						size={24}
						color={Colors[colorScheme].text}
					/>
				</TouchableOpacity>
			</View>

			<ThemedText>Aqui você encontra as receitas que você salvou guardadas com carinho 🥖.</ThemedText>

			<View style={{ gap: 12, marginTop: 12 }}>
				{patientsQueryResult?.isFetching && (
					<ActivityIndicator
						size="large"
						color={Colors[colorScheme].primary}
					/>
				)}
				{!patientsQueryResult?.isFetching &&
					(!patientsState.selectedPatient?.dietPlans || patientsState.selectedPatient?.dietPlans?.length === 0) && (
						<View
							style={{
								backgroundColor: Colors[colorScheme].background,
								padding: 12,
								borderWidth: 1,
								borderColor: Colors[colorScheme].primary,
								borderRadius: 8,
							}}
						>
							<ThemedText type="defaultSemiBold">Nenhum plano alimentar encontrado.</ThemedText>
						</View>
					)}

				{!patientsQueryResult?.isFetching &&
					patientsState.selectedPatient?.dietPlans?.map(dietPlan => (
						<DietPlanItem
							key={dietPlan.id}
							patientId={patientId}
							item={dietPlan}
						/>
					))}
			</View>
		</View>
	);
}
