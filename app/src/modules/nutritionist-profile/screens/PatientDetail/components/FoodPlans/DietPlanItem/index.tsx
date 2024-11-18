import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/Colors';

import { ThemedText } from '@/components/design-system/ThemedText';
import { IDietPlan } from '@/modules/nutritionist-profile/contexts/diet-plan/reducers/edit-diet-plan-reducer';

import { styles } from './style';
import { useNutritionistDietPlan } from '@/modules/nutritionist-profile/contexts/diet-plan/hook';
import { IPatient } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';

dayjs.extend(isBetween);

interface Props {
	item: IDietPlan;
	patientId: IPatient['id'];
}

export function DietPlanItem({ item, patientId }: Props) {
	const { navigate } = useNavigation();
	const colorScheme = useColorScheme();

	const { dietPlanDispatch } = useNutritionistDietPlan();

	const isActive = dayjs(new Date()).isBetween(
		dayjs(item.startDate).subtract(2, 'days'),
		dayjs(item.finalDate).add(2, 'days')
	); // just fot testing

	// const isActive = dayjs(new Date()).isBetween(item.startDate, item.finalDate);

	return (
		<Pressable
			style={styles.planButton}
			android_ripple={{ color: Colors.light.primary }}
			onPress={() => {
				dietPlanDispatch({ type: 'SELECT_DIET_PLAN', payload: item });
				navigate('diet-plan/index', { dietPlanId: item.id, patientId });
			}}
		>
			<Ionicons
				name="restaurant-outline"
				size={24}
				color={colorScheme === 'light' ? '#000000bb' : '#FFFFFFbb'}
			/>

			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: 'row' }}>
					<ThemedText
						type="defaultSemiBold"
						style={{ fontSize: 18, flex: 1 }}
						numberOfLines={1}
					>
						{item.name}
					</ThemedText>

					<ThemedText
						type="defaultSemiBold"
						style={{
							padding: 2,
							backgroundColor: isActive ? 'green' : 'red',
							color: 'white',
							borderRadius: 6,
							paddingHorizontal: 6,
						}}
					>
						{isActive ? 'Ativo' : 'Não ativo'}
					</ThemedText>
				</View>
				<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
					<ThemedText>{dayjs(item.startDate).format('DD/MM/YYYY')}</ThemedText>
					<Ionicons
						name="arrow-forward"
						size={18}
						color={Colors.light.primary}
					/>

					<ThemedText>{dayjs(item.finalDate).format('DD/MM/YYYY')}</ThemedText>
				</View>
			</View>
		</Pressable>
	);
}
