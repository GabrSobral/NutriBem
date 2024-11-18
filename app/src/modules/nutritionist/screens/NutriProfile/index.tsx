import { DietPlanItem } from './components/DietPlanItem';
import { ProfileHeader } from './components/ProfileHeader';

import { ThemedText } from '@/components/design-system/ThemedText';
import ParallaxScrollView from '@/components/design-system/ParallaxScrollView';

import { Colors } from '@/constants/Colors';
import { useNutritionist } from '../../contexts/nutri/hook';
import { useColorScheme, View } from 'react-native';

export function NutriProfile() {
	const colorScheme = useColorScheme() as 'light' | 'dark';
	const { nutritionistState } = useNutritionist();

	return (
		<ParallaxScrollView
			headerBackgroundColor={{
				light: Colors.light.secondary,
				dark: Colors.dark.secondary,
			}}
			headerHeight={300}
			headerImage={<ProfileHeader />}
		>
			<ThemedText type="title">Planos alimentares</ThemedText>

			<ThemedText>
				Receba planos alimentares personalizados criados pelo seu nutricionista para atender às suas necessidades e
				objetivos específicos.
			</ThemedText>

			{nutritionistState.currentNutritionist?.dietPlan.length === 0 && (
				<View
					style={{
						backgroundColor: Colors[colorScheme].background,
						padding: 12,
						borderWidth: 1,
						borderColor: Colors[colorScheme].primary,
						borderRadius: 8,
					}}
				>
					<ThemedText
						type="defaultSemiBold"
						style={{ textAlign: 'center' }}
					>
						Nenhum plano alimentar disponível. Peça para seu nutricionista montar um para você.
					</ThemedText>
				</View>
			)}

			{nutritionistState.dietPlans.map(dietPlan => (
				<DietPlanItem
					key={dietPlan.id}
					dietPlan={dietPlan}
				/>
			))}
		</ParallaxScrollView>
	);
}
