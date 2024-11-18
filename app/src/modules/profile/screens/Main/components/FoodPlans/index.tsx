import { useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { useNutritionist } from '@/modules/nutritionist/contexts/nutri/hook';
import { DietPlanItem } from '@/modules/nutritionist/screens/NutriProfile/components/DietPlanItem';

import { styles } from './style';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

export function FoodPlans() {
	const { nutritionistState } = useNutritionist();
	const colorScheme = useColorScheme() as 'light' | 'dark';

	return (
		<View>
			<ThemedText
				type="title"
				style={styles.titleContainer}
			>
				Planos alimentares
			</ThemedText>

			<ThemedText>Aqui você encontra os planos alimentares que seu nutricionista montou para você.</ThemedText>

			{nutritionistState.currentNutritionist?.dietPlan.length === 0 && (
				<Link
					href={'/user/nutri'}
					style={{
						backgroundColor: Colors[colorScheme].background,
						padding: 12,
						borderWidth: 1,
						borderColor: Colors[colorScheme].primary,
						borderRadius: 8,
						marginTop: 12,
					}}
				>
					<ThemedText
						type="defaultSemiBold"
						style={{ textAlign: 'center' }}
					>
						Nenhum plano alimentar disponível. Peça para seu nutricionista montar um para você.
					</ThemedText>
				</Link>
			)}

			<View style={{ gap: 12, marginTop: 12 }}>
				{nutritionistState.currentNutritionist?.dietPlan.map(dietPlan => (
					<DietPlanItem
						key={dietPlan.id}
						dietPlan={dietPlan}
					/>
				))}
			</View>
		</View>
	);
}
