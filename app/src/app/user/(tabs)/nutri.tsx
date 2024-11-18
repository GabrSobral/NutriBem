import { ActivityIndicator, View } from 'react-native';

import { NutriProfile } from '@/modules/nutritionist/screens/NutriProfile';
import { useNutritionist } from '@/modules/nutritionist/contexts/nutri/hook';
import { NotConnectedScreen } from '@/modules/nutritionist/screens/NotConnected';
import { Colors } from '@/constants/Colors';

export default function NutriScreen() {
	const { nutritionistState, isLoading } = useNutritionist();

	if (isLoading) {
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator
				size="large"
				color={Colors.light.primary}
			/>
		</View>;
	}

	return nutritionistState.currentNutritionist ? <NutriProfile /> : <NotConnectedScreen />;
}
