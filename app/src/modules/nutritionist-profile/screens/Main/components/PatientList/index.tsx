import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { styles } from './style';
import { Colors } from '@/constants/Colors';

import { PatientItem } from './PatientItem';
import { useNutritionistProfile } from '@/modules/nutritionist-profile/contexts/profile/hook';

export function PatientList() {
	const colorScheme = useColorScheme() as 'light' | 'dark';
	const { patientsQueryResult } = useNutritionistProfile();

	return (
		<View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<ThemedText
					type="title"
					style={styles.titleContainer}
				>
					Pacientes
				</ThemedText>

				<TouchableOpacity onPress={() => patientsQueryResult?.refetch()}>
					<Ionicons
						name="refresh"
						size={24}
						color={Colors[colorScheme].text}
					/>
				</TouchableOpacity>
			</View>

			<ThemedText>Acompanhe seus pacientes em tempo real. 🚀</ThemedText>

			<View style={{ marginTop: 12 }}>
				{(patientsQueryResult?.isPending || patientsQueryResult?.isRefetching) && <ActivityIndicator size={32} />}
				{patientsQueryResult?.isPending ||
					patientsQueryResult?.isRefetching ||
					!patientsQueryResult?.data ||
					(patientsQueryResult?.data?.length === 0 && (
						<View
							style={{
								backgroundColor: Colors[colorScheme].background,
								padding: 12,
								borderWidth: 1,
								borderColor: Colors[colorScheme].primary,
								borderRadius: 8,
							}}
						>
							<ThemedText type="defaultSemiBold">Nenhum paciente encontrado.</ThemedText>
						</View>
					))}

				{!patientsQueryResult?.isPending &&
					!patientsQueryResult?.isRefetching &&
					patientsQueryResult?.data?.map(item => (
						<PatientItem
							item={item}
							key={item.id}
						/>
					))}
			</View>
		</View>
	);
}
