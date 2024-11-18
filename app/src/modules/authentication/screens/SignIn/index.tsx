import {
	ActivityIndicator,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import { useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';

import { Input } from '@/components/design-system/Input';
import { Button } from '@/components/design-system/Button';
import { ThemedText } from '@/components/design-system/ThemedText';

import { useAuth } from '@/contexts/AuthContext/hook';

import { styles } from './styles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export function SignIn() {
	const backgroundColor = useThemeColor({ dark: Colors.dark.background, light: Colors.light.background }, 'background');
	const colorScheme = useColorScheme() as 'light' | 'dark';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const { signInAsync } = useAuth();

	const { isNutritionist } = useLocalSearchParams() as any as {
		isNutritionist: boolean;
	};

	async function handleSignIn() {
		try {
			setErrorMessage('');

			setIsLoading(true);
			await signInAsync({ email, password });
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);

			if (error instanceof Error) {
				if (error.message === 'Invalid credentials') setErrorMessage('E-mail/Senha inválidos');
			} else {
				console.error(error);
				setErrorMessage('Erro desconhecido');
			}
		}
	}

	return (
		<ScrollView style={[styles.container, { backgroundColor }]}>
			<StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

			<Image
				source={require('../../../../assets/images/Logo.png')}
				alt="NutriBem logotipo"
				height={200}
				width={200}
				style={{ width: 200, height: 200, marginHorizontal: 'auto' }}
			/>

			<Text style={styles.title}>
				Entre
				{typeof isNutritionist === 'string' && isNutritionist === 'true' ? ' como nutricionista' : ' em sua conta'}
			</Text>

			<KeyboardAvoidingView
				style={styles.formWrapper}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={20}
			>
				<Input.Group>
					<Input.Label>E-mail</Input.Label>

					<Input.Wrapper>
						<Input
							placeholder="Digite seu E-mail"
							keyboardType="email-address"
							value={email}
							onChangeText={setEmail}
						/>
					</Input.Wrapper>
				</Input.Group>

				<Input.Group>
					<Input.Label>Senha</Input.Label>

					<Input.Wrapper>
						<Input
							placeholder="Digite sua senha"
							secureTextEntry
							value={password}
							onChangeText={setPassword}
						/>
					</Input.Wrapper>

					<View style={styles.forgotPasswordContainer}>
						<TouchableOpacity>
							<ThemedText>Esqueceu a senha?</ThemedText>
						</TouchableOpacity>
					</View>
				</Input.Group>

				{errorMessage && (
					<View style={{ marginHorizontal: 'auto' }}>
						<Text style={{ color: 'red' }}>{errorMessage}</Text>
					</View>
				)}

				<Button
					onPress={handleSignIn}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator
							color="#FFF"
							size={22}
						/>
					) : (
						<Text style={{ color: '#FFF', fontWeight: 'semibold', fontSize: 18 }}>Acessar minha conta</Text>
					)}
				</Button>
			</KeyboardAvoidingView>

			<Link
				href={{
					pathname: '/auth/sign-up',
					params: { isNutritionist },
				}}
				style={[styles.signUpLink, { color: Colors[colorScheme].secondary }]}
			>
				Ainda não possui cadastro? Cadastre-se já!
			</Link>
		</ScrollView>
	);
}
