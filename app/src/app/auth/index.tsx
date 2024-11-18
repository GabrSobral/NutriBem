import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/design-system/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function AuthenticationScreen() {
	const { navigate } = useNavigation();
	const colorScheme = useColorScheme() as 'light' | 'dark';

	const backgroundColor = useThemeColor({ dark: Colors.dark.background, light: Colors.light.background }, 'background');

	return (
		<ScrollView style={[styles.container, { backgroundColor }]}>
			<StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

			<Image
				source={require('../../assets/images/Logo.png')}
				alt="NutriBem logotipo"
				height={200}
				width={200}
				style={{ width: 200, height: 200, marginHorizontal: 'auto' }}
			/>

			<Text style={styles.title}>Bem vindo!</Text>

			<ThemedText style={styles.description}>Escolha sua forma de entrar.</ThemedText>

			<Link
				asChild
				href={{
					pathname: '/auth/sign-in',
					params: { isNutritionist: false },
				}}
			>
				<Pressable
					style={styles.submitButton}
					android_ripple={{ color: '#FFF', borderless: false }}
				>
					<Ionicons
						name="log-in"
						size={24}
						color={'white'}
					/>
					<Text style={{ color: '#FFF', fontWeight: 'semibold', fontSize: 18 }}>Entrar como usuário</Text>
				</Pressable>
			</Link>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 12,
					marginVertical: 12,
				}}
			>
				<View
					style={{
						flex: 1,
						width: '100%',
						height: 1,
						backgroundColor: '#00000033',
					}}
				/>
				<ThemedText>Ou</ThemedText>
				<View style={{ flex: 1, height: 1, backgroundColor: '#00000033' }} />
			</View>

			<Link
				href={{
					pathname: '/auth/sign-in',
					params: { isNutritionist: true },
				}}
				asChild
			>
				<Pressable
					style={StyleSheet.flatten([styles.submitButton, { backgroundColor: Colors[colorScheme].primary }])}
					android_ripple={{ color: '#FFF', borderless: false }}
				>
					<Ionicons
						name="log-in"
						size={24}
						color={'white'}
					/>
					<Text style={{ color: '#FFF', fontWeight: 'semibold', fontSize: 18 }}>Entrar como nutricionista</Text>
				</Pressable>
			</Link>

			<Link
				href="/auth/sign-up"
				style={[styles.signUpLink, { color: Colors[colorScheme].secondary }]}
			>
				Não possui cadastro? Cadastre-se!
			</Link>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: Colors.light.background,
		paddingTop: 56,
	},

	title: {
		fontSize: 28,
		color: Colors.light.primary,
		fontWeight: 'bold',
		marginVertical: 16,
		textAlign: 'left',
		width: '100%',
	},

	description: {
		fontSize: 16,
	},

	forgotPasswordContainer: {
		width: '100%',
		alignItems: 'flex-end',
		marginTop: 12,
	},

	formWrapper: {
		gap: 16,
		width: '100%',
		flex: 1,
	},

	submitButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 12,
		width: '100%',
		padding: 16,
		borderRadius: 6,
		backgroundColor: Colors.light.secondary,
		alignItems: 'center',
		marginTop: 16,
	},

	oauthButton: {
		width: '100%',
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 12,
		borderRadius: 6,
		backgroundColor: 'transparent',
		borderColor: Colors.light.primary,
		borderWidth: 1,
		alignItems: 'center',
	},

	signUpLink: {
		marginTop: 18,
		fontSize: 18,
		fontWeight: 'semibold',
		marginHorizontal: 'auto',
	},
});
