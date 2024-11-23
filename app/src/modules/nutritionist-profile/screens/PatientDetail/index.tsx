import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Image, ScrollView, useColorScheme, View } from 'react-native';

import { FoodPlans } from './components/FoodPlans';
import { Button } from '@/components/design-system/Button';
import { AppHeader } from '@/components/design-system/AppHeader';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useNutritionistProfile } from '../../contexts/profile/hook';
import { IPatient } from '../../contexts/profile/reducers/patients-reducer';

import { styles } from './style';
import { ThemedText } from '@/components/design-system/ThemedText';

export function PatientDetail() {
	const navigation = useNavigation();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const { patientId } = useLocalSearchParams() as any as {
		patientId: IPatient['id'];
	};

	const colorScheme = useColorScheme() as 'light' | 'dark';
	const { patientsQueryResult, patientsDispatch, patientsState } = useNutritionistProfile();

	useEffect(() => {
		if (patientId && patientsQueryResult?.data && patientsQueryResult.data.length > 0) {
			patientsDispatch({
				type: 'SELECT_PATIENT',
				payload: patientsQueryResult?.data?.find(patient => patient.id === patientId) || null,
			});
		}
	}, [patientId, patientsQueryResult?.data]);

	return (
		<View style={{ backgroundColor, flex: 1 }}>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			<AppHeader
				title={`${patientsState.selectedPatient?.firstName || ''} ${patientsState.selectedPatient?.lastName || ''}`}
			/>

			<ScrollView>
				<View style={styles.container}>
					{patientsState.selectedPatient?.photoUrl ? (
						<Image
							resizeMode="cover"
							source={{ uri: patientsState.selectedPatient?.photoUrl }}
							style={styles.profileImage}
						/>
					) : (
						<View style={[styles.profileImage, { backgroundColor: '#00000010' }]}>
							<Ionicons
								name="person"
								size={64}
								color={Colors.light.primary}
							/>
						</View>
					)}

					<ThemedText
						type="title"
						style={styles.titleContainer}
					>
						Informações
					</ThemedText>

					<View
						style={{
							padding: 12,
							backgroundColor: Colors[colorScheme].primarySoft,
							borderColor: Colors[colorScheme].primary,
							borderWidth: 1,
							borderRadius: 12,
						}}
					>
						<ThemedText>Localização: {patientsState.selectedPatient?.address}</ThemedText>
						<ThemedText>Idade: {patientsState.selectedPatient?.age}</ThemedText>
						<ThemedText>Altura: {patientsState.selectedPatient?.height}</ThemedText>
						<ThemedText>Objetivo principal: {patientsState.selectedPatient?.mainObjective}</ThemedText>
					</View>

					<FoodPlans patientId={patientId} />

					<Button
						icon={
							<Ionicons
								name="add"
								size={24}
								color="white"
							/>
						}
						onPress={() => navigation.navigate('diet-plan/add-diet-plan', { patientId })}
					>
						Criar plano alimentar
					</Button>
				</View>
			</ScrollView>
		</View>
	);
}
