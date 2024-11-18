import { useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import {
	Image,
	ScrollView,
	StatusBar,
	Switch,
	Text,
	useColorScheme,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

import { Input } from '@/components/design-system/Input';
import { Button } from '@/components/design-system/Button';
import { ThemedText } from '@/components/design-system/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/contexts/AuthContext/hook';
import { Colors } from '@/constants/Colors';

import { styles } from './styles';

export function SignUp() {
	const backgroundColor = useThemeColor({ dark: Colors.dark.background, light: Colors.light.background }, 'background');
	const colorScheme = useColorScheme() as 'light' | 'dark';

	const { isNutritionist } = useLocalSearchParams() as any as {
		isNutritionist: boolean;
	};

	const [firstName, setFirstName] = useState('');
	const [crn, setCrn] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isUserNutritionist, setIsUserNutritionist] = useState(
		typeof isNutritionist === 'string' && isNutritionist === 'true'
	);

	const [errorMessage, setErrorMessage] = useState('');

	const { signUpAsync } = useAuth();

	async function handleSignUp() {
		try {
			setErrorMessage('');

			setIsLoading(true);
			await signUpAsync({ crn, firstName, lastName, email, password });
			setIsLoading(false);
		} catch (error) {
			console.log(JSON.stringify(error));
			setIsLoading(false);

			if (error instanceof Error) {
				if (error.message === 'Invalid credentials') setErrorMessage('E-mail/Senha inválidos');
			} else {
				setErrorMessage(`Erro desconhecido: ${JSON.stringify(error)}`);
			}
		}
	}

	const doNotKnowIfIsNutritionist = typeof isNutritionist !== 'string';

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
				Cadastre-se
				{isUserNutritionist && <Text style={{ color: Colors[colorScheme].primary }}> como nutricionista</Text>}
			</Text>

			<View style={styles.formWrapper}>
				{doNotKnowIfIsNutritionist && (
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Switch
							value={isUserNutritionist}
							onValueChange={setIsUserNutritionist}
							trackColor={{
								false: colorScheme === 'dark' ? '#FFFFFF33' : '#00000033',
								true: Colors[colorScheme].primary,
							}}
							thumbColor={Colors[colorScheme].primary}
							style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], alignSelf: 'flex-start', marginLeft: 4 }}
						/>
						<TouchableOpacity onPress={() => setIsUserNutritionist(!isUserNutritionist)}>
							<ThemedText>Cadastrar como nutricionista</ThemedText>
						</TouchableOpacity>
					</View>
				)}

				{isUserNutritionist && (
					<Input.Group>
						<Input.Label>CRN (Conselho Regional de Nutricionista)</Input.Label>

						<Input.Wrapper>
							<Input
								placeholder="Digite seu CRN"
								value={crn}
								onChangeText={setCrn}
							/>
						</Input.Wrapper>
					</Input.Group>
				)}

				<Input.Group>
					<Input.Label>Nome</Input.Label>

					<Input.Wrapper>
						<Input
							placeholder="Digite seu nome"
							value={firstName}
							onChangeText={setFirstName}
						/>
					</Input.Wrapper>
				</Input.Group>

				<Input.Group>
					<Input.Label>Sobrenome</Input.Label>

					<Input.Wrapper>
						<Input
							placeholder="Digite seu sobrenome"
							value={lastName}
							onChangeText={setLastName}
						/>
					</Input.Wrapper>
				</Input.Group>

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
				</Input.Group>

				<Input.Group>
					<Input.Label>Confirme sua Senha</Input.Label>

					<Input.Wrapper>
						<Input
							placeholder="Digite sua confirmação de senha"
							secureTextEntry
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
					</Input.Wrapper>
				</Input.Group>

				<Button
					style={styles.submitButton}
					android_ripple={{ color: '#FFF', borderless: true }}
					onPress={handleSignUp}
				>
					{isLoading ? (
						<ActivityIndicator
							color="#FFF"
							size={22}
						/>
					) : (
						<Text style={{ color: '#FFF', fontWeight: 'semibold', fontSize: 18 }}>Criar minha conta</Text>
					)}
				</Button>
				<Link
					href={{
						pathname: '/auth/sign-in',
						params: { isNutritionist: isUserNutritionist ? 'true' : 'false' },
					}}
					style={[styles.signUpLink, { color: Colors[colorScheme].secondary }]}
				>
					Já possui cadastro? Entre já!
				</Link>
			</View>
		</ScrollView>
	);
}
