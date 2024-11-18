import { Link } from 'expo-router';
import { useColorScheme, View } from 'react-native';

import { Button } from '@/components/design-system/Button';
import { ThemedText } from '@/components/design-system/ThemedText';

import { styles } from './style';
import { Colors } from '@/constants/Colors';

export function ProfileDontFilled() {
	const colorScheme = useColorScheme() as 'light' | 'dark';

	return (
		<>
			<View style={[styles.container, { backgroundColor: `${Colors[colorScheme].primarySoft}` }]}>
				<ThemedText>
					Ops... Para se vincular a um nutricionista você precisa preencher seu perfil com informações adicionais.
				</ThemedText>
			</View>

			<Link
				href="/user/profile/edit-profile"
				asChild
			>
				<Button style={{ marginTop: 0 }}>Preencher perfil</Button>
			</Link>
		</>
	);
}
