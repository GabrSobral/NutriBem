import { Pressable, useColorScheme, View } from 'react-native';
import { useNavigation } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/design-system/ThemedText';

import { styles } from './style';
import { DietPlans } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';

interface Props {
	dietPlan: DietPlans;
}

export function DietPlanItem({ dietPlan }: Props) {
	const { navigate } = useNavigation();
	const colorScheme = useColorScheme() as 'light' | 'dark';

	return (
		<Pressable
			style={styles.planButton}
			android_ripple={{ color: Colors.light.primary }}
			onPress={() => navigate('user/nutri/diet-plan', { dietPlanId: dietPlan.id })}
		>
			<Ionicons
				name="restaurant-outline"
				size={24}
				style={{ marginVertical: 'auto' }}
				color={colorScheme === 'light' ? '#000000bb' : '#FFFFFFee'}
			/>

			<View>
				<ThemedText
					type="defaultSemiBold"
					style={{ fontSize: 18 }}
				>
					{dietPlan.name}
				</ThemedText>

				<ThemedText
					style={{ fontSize: 18 }}
					numberOfLines={1}
				>
					{dietPlan.description}
				</ThemedText>
			</View>
		</Pressable>
	);
}
