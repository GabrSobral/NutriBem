import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Image, StatusBar, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';
import ParallaxScrollView from '@/components/design-system/ParallaxScrollView';

import { useNutritionist } from '../../contexts/nutri/hook';
import { associateNutritionistApi } from '@/modules/home/services/associate-nutritionist';

import { useAuth } from '@/contexts/AuthContext/hook';

import { styles } from './styles';
import { ConnectToNutri } from './ConnectToNutri';
import { ProfileDontFilled } from './ProfileDontFilled';

export function NotConnectedScreen() {
	const { accessToken, user } = useAuth();
	const { nutritionistDispatch } = useNutritionist();

	const [code, setCode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const params = useLocalSearchParams() as any as { code: string };

	useEffect(() => {
		if (params.code) {
			setCode(params.code);
		}
	}, [params]);

	async function handleConnectNutri() {
		setIsLoading(true);
		try {
			var nutritionist = await associateNutritionistApi({ nutritionistId: code }, { accessToken: accessToken || '' });
			nutritionistDispatch({ type: 'SELECT_CURRENT_NUTRITIONIST', payload: nutritionist });
		} catch (error) {
			console.log(error);

			setErrorMessage('Não foi possível conectar-se ao nutricionista. Verifique o código e tente novamente.');
			setTimeout(() => setErrorMessage(''), 5000);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<Image
					source={require('../../../../assets/images/nutri-background.jpg')}
					style={{ flex: 1, width: '100%', height: 300 }}
					height={300}
					width={300}
				/>
			}
		>
			<StatusBar
				animated
				barStyle={'dark-content'}
			/>

			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Nutricionista</ThemedText>
			</ThemedView>

			<ThemedText>Você pode se vincular a um nutricionista para receber:</ThemedText>

			<ThemedView style={{ gap: 4 }}>
				<View style={[styles.nutriBadge, { backgroundColor: '#4682B4' }]}>
					<Ionicons
						name="stats-chart"
						size={24}
						color="white"
					/>
					<ThemedText
						style={{ color: 'white' }}
						type="defaultSemiBold"
					>
						Acompanhamento sobre seu progresso
					</ThemedText>
				</View>

				<View style={[styles.nutriBadge, { backgroundColor: '#4682B4' }]}>
					<Ionicons
						name="restaurant"
						size={24}
						color="white"
					/>
					<ThemedText
						style={{ color: 'white' }}
						type="defaultSemiBold"
					>
						Planos alimentares personalizados
					</ThemedText>
				</View>

				<View style={[styles.nutriBadge, { backgroundColor: '#4682B4' }]}>
					<Ionicons
						name="chatbox"
						size={24}
						color="white"
					/>
					<ThemedText
						style={{ color: 'white' }}
						type="defaultSemiBold"
					>
						Chat para tirar dúvidas
					</ThemedText>
				</View>
			</ThemedView>

			<ThemedText>Conecte-se a um nutricionista apontando a sua camera ou digitando o código de vínculo.</ThemedText>

			{user?.weight && user?.height && user.mainObjective && user.address && user.sex && user.age ? (
				<ConnectToNutri
					code={code}
					isLoading={isLoading}
					setCode={setCode}
					errorMessage={errorMessage}
					handleConnectNutri={handleConnectNutri}
					setErrorMessage={setErrorMessage}
				/>
			) : (
				<ProfileDontFilled />
			)}
		</ParallaxScrollView>
	);
}
