import { Image, Text, useColorScheme, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Colors } from '@/constants/Colors';
import { useHome } from '@/modules/home/contexts/hook';
import { ThemedView } from '@/components/design-system/ThemedView';

import { style } from './style';

export function DailyProgress() {
	const { homeState } = useHome();
	const colorScheme = useColorScheme() as 'light' | 'dark';

	const ingestedKcal = homeState.meals
		.flatMap(meal => meal.eatenFoods)
		.map(item => Number(item.servingCalories) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedCarbs = homeState.meals
		.flatMap(meal => meal.eatenFoods)
		.map(item => Number(item.servingCarbohydrates) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedFats = homeState.meals
		.flatMap(meal => meal.eatenFoods)
		.map(item => Number(item.servingFats) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const ingestedProteins = homeState.meals
		.flatMap(meal => meal.eatenFoods)
		.map(item => Number(item.servingProteins) * item.quantity)
		.reduce((a, b) => Number(a) + Number(b), 0);

	const percentage = (ingestedKcal / homeState.meals.reduce((a, b) => a + b.maxKcal || 2000, 0)) * 100;

	return (
		<ThemedView style={style.container}>
			<Image
				source={require('../../../../../../assets/images/background-primary.png')}
				style={style.backgroundImage}
			/>

			<Text style={style.title}>Resumo Diário</Text>

			<AnimatedCircularProgress
				size={200}
				width={20}
				fill={percentage}
				tintColor={Colors.light.primary}
				rotation={240}
				arcSweepAngle={240}
				lineCap="round"
				backgroundColor="#00000080"
			>
				{() => (
					<View style={{ alignItems: 'center' }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
							<Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{ingestedKcal}</Text>
							<Text style={{ fontSize: 14, color: 'white' }}>Kcal</Text>
						</View>
						<Text style={{ fontSize: 16, color: 'white' }}>Consumidos</Text>
					</View>
				)}
			</AnimatedCircularProgress>

			<View style={style.macroNutrientContainer}>
				<View style={{ gap: 2, alignItems: 'center' }}>
					<Text style={{ color: 'white' }}>Carboidratos</Text>
					{/* <Progress.Bar
						progress={0.7}
						width={90}
						height={8}
						color={Colors.light.primary}
						unfilledColor="#00000090"
						borderWidth={0}
						borderRadius={16}
					/> */}
					<Text style={{ color: Colors[colorScheme].primary, fontWeight: 'bold', fontSize: 16 }}>
						{ingestedCarbs.toFixed(2)}g
					</Text>
				</View>

				<View style={{ gap: 2, alignItems: 'center' }}>
					<Text style={{ color: 'white' }}>Proteínas</Text>
					{/* <Progress.Bar
						progress={0.7}
						width={90}
						height={8}
						color={Colors.light.primary}
						unfilledColor="#00000090"
						borderWidth={0}
						borderRadius={16}
					/> */}
					<Text style={{ color: Colors[colorScheme].primary, fontWeight: 'bold', fontSize: 16 }}>
						{ingestedProteins.toFixed(2)}g
					</Text>
				</View>

				<View style={{ gap: 2, alignItems: 'center' }}>
					<Text style={{ color: 'white' }}>Gorduras</Text>
					{/* <Progress.Bar
						progress={0.7}
						width={90}
						height={8}
						color={Colors.light.primary}
						unfilledColor="#00000090"
						borderWidth={0}
						borderRadius={16}
					/> */}
					<Text style={{ color: Colors[colorScheme].primary, fontWeight: 'bold', fontSize: 16 }}>
						{ingestedFats.toFixed(2)}g
					</Text>
				</View>
			</View>
		</ThemedView>
	);
}
