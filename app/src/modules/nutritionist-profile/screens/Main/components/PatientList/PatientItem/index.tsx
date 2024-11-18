import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { Colors } from '@/constants/Colors';
import { styles } from './style';
import { IPatient } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';
import { useNutritionistProfile } from '@/modules/nutritionist-profile/contexts/profile/hook';

interface Props {
	item: IPatient;
}

export function PatientItem({ item }: Props) {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();

	const { patientsDispatch } = useNutritionistProfile();

	return (
		<Pressable
			style={[styles.recipeItem, { borderColor: colorScheme === 'light' ? '#00000020' : '#FFFFFF40' }]}
			android_ripple={{
				color: Colors.light.primary,
				borderless: false,
				radius: 200,
			}}
			onPress={() => {
				patientsDispatch({ type: 'SELECT_PATIENT', payload: item });
				navigation.navigate('patient-detail', { patientId: item.id });
			}}
		>
			<View style={[styles.imageItem, { position: 'relative' }]}>
				{item.photoUrl ? (
					<Image
						resizeMode="cover"
						source={{ uri: item.photoUrl }}
						style={styles.imageItem}
					/>
				) : (
					<View style={[styles.imageItem, { backgroundColor: '#00000010' }]}>
						<Ionicons
							name="person"
							size={48}
							color={Colors.light.primary}
						/>
					</View>
				)}
			</View>

			<View style={styles.recipeTitleContainer}>
				<ThemedText
					type="defaultSemiBold"
					style={{
						fontSize: 20,
						color: colorScheme === 'light' ? Colors.light.secondary : '#EEEEEE',
					}}
				>
					{item.firstName} {item.lastName}
				</ThemedText>

				<View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
					<ThemedText type="defaultSemiBold">Plano:</ThemedText>
					<ThemedText>28/08/2024</ThemedText>
					<Ionicons
						name="arrow-forward"
						size={18}
						color={Colors.light.primary}
					/>
					<ThemedText>28/08/2024</ThemedText>
				</View>
			</View>
		</Pressable>
	);
}
