import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { styles } from './style';
import { Input } from '@/components/design-system/Input';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/design-system/Button';
import { ThemedText } from '@/components/design-system/ThemedText';

interface Props {
	code: string;
	setCode: (value: string) => void;
	errorMessage: string;
	setErrorMessage: (value: string) => void;
	isLoading: boolean;
	handleConnectNutri: () => void;
}

export function ConnectToNutri({ code, errorMessage, handleConnectNutri, isLoading, setCode, setErrorMessage }: Props) {
	return (
		<>
			<View style={styles.scanContainer}>
				<Input.Group style={{ flex: 1 }}>
					<Input.Label style={{ fontWeight: 'bold' }}>Código de vínculo</Input.Label>

					<Input.Wrapper>
						<Input
							placeholder="Digite o código de vínculo..."
							style={{ flex: 1 }}
							value={code}
							onChangeText={setCode}
						/>
					</Input.Wrapper>
				</Input.Group>

				<Link
					asChild
					href="/user/nutri/scan-code"
				>
					<Pressable
						style={styles.scanCodeButton}
						aria-label="Escanear código de vínculo"
						android_ripple={{ color: 'white' }}
					>
						<Ionicons
							name="qr-code-outline"
							size={24}
						/>
					</Pressable>
				</Link>
			</View>

			{errorMessage && <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text>}

			<Button
				android_ripple={{ color: 'white' }}
				style={{ marginTop: 0 }}
				onPress={handleConnectNutri}
				disabled={!code || isLoading}
				icon={
					!isLoading ? (
						<Ionicons
							size={24}
							name="link"
							color="white"
						/>
					) : undefined
				}
			>
				{isLoading ? (
					<ActivityIndicator
						size="small"
						color="white"
					/>
				) : (
					<ThemedText
						style={{ color: 'white', fontSize: 18 }}
						type="defaultSemiBold"
					>
						Conectar-se ao nutricionista
					</ThemedText>
				)}
			</Button>
		</>
	);
}
