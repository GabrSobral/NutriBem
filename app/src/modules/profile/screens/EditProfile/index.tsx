import { Ionicons } from '@expo/vector-icons';
import RadioGroup from 'react-native-radio-buttons-group';
import { ActivityIndicator, SafeAreaView, ScrollView, useColorScheme, View } from 'react-native';

import { Input } from '@/components/design-system/Input';
import { Button } from '@/components/design-system/Button';
import { AppHeader } from '@/components/design-system/AppHeader';

import { styles } from './style';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext/hook';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { editUserProfileApi } from '../../services/edit-user-profile';

export function EditProfile() {
	const { user, accessToken, setUser } = useAuth();
	const colorScheme = useColorScheme() as 'light' | 'dark';

	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName || '');
	const [address, setAddress] = useState(user?.address || '');
	const [height, setHeight] = useState(user?.height || 0);
	const [weight, setWeight] = useState('');
	const [sex, setSex] = useState<'male' | 'female'>((user?.sex as 'male' | 'female') || 'male');
	const [age, setAge] = useState(user?.age || 0);
	const [mainObjective, setMainObjetive] = useState(user?.mainObjective || '');

	console.log({ user });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setFirstName(user?.firstName || '');
		setLastName(user?.lastName || '');
		setAddress(user?.address || '');
		setHeight(user?.height || 0);
		setWeight(user?.weight?.toString() || '');
		setSex(user?.sex || 'male');
		setAge(user?.age || 0);
		setMainObjetive(user?.mainObjective || '');
	}, [user]);

	console.log({ mainObjective, asds: user?.mainObjective, sex });

	const radioButtons = useMemo(
		() => [
			{ id: 'male', label: 'Masculino', value: 'male' },
			{ id: 'female', label: 'Feminino', value: 'female' },
		],
		[]
	);

	async function handleEditProfile() {
		setIsLoading(true);
		try {
			await editUserProfileApi(
				{
					age,
					firstName,
					height,
					address,
					lastName,
					sex,
					weight: weight ? Number(weight) : 0,
					mainObjective,
				},
				{ accessToken: accessToken || '' }
			);

			setUser(state =>
				state
					? {
							...state,
							firstName: firstName ?? state?.firstName,
							lastName: lastName ?? state?.lastName,
							age: state?.age ?? age,
							address: state?.address ?? address,
							height: state?.height ?? height,
							sex: state?.sex ?? sex,
							weight: state?.weight ?? Number(weight),
							mainObjective: state?.mainObjective ?? mainObjective,
						}
					: null
			);

			setIsLoading(false);
		} catch (error) {
			// console.error(error);
			setIsLoading(false);
		}
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
				<AppHeader title="Editar usuário" />

				<View style={styles.container}>
					<View style={[styles.profileImage, { backgroundColor: '#00000010' }]}>
						<Ionicons
							name="person"
							size={64}
							color={Colors.light.primary}
						/>
					</View>

					<Input.Group>
						<Input.Label>Nome</Input.Label>
						<Input
							value={firstName}
							onChangeText={setFirstName}
							keyboardType="default"
							placeholder="Digite seu nome..."
						/>
					</Input.Group>

					<Input.Group>
						<Input.Label>Sobrenome</Input.Label>
						<Input
							value={lastName}
							onChangeText={setLastName}
							keyboardType="default"
							placeholder="Digite seu sobrenome..."
						/>
					</Input.Group>

					<Input.Group>
						<Input.Label>Localização</Input.Label>
						<Input
							value={address}
							onChangeText={setAddress}
							keyboardType="default"
							placeholder="Digite sua localização..."
						/>
					</Input.Group>

					<RadioGroup
						radioButtons={radioButtons}
						onPress={value => setSex(value as 'male' | 'female')}
						selectedId={sex}
						layout="row"
					/>

					<View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
						<Input.Group style={{ flex: 1 }}>
							<Input.Label>Altura (cm)</Input.Label>
							<Input
								value={height.toString()}
								onChangeText={value => setHeight(Number(value))}
								keyboardType="numeric"
								placeholder="Sua altura..."
							/>
						</Input.Group>

						<Input.Group style={{ flex: 1 }}>
							<Input.Label>Peso (kg)</Input.Label>
							<Input
								value={weight.toString()}
								// make the onChangeText set a value as a number and support float on the input
								onChangeText={setWeight}
								keyboardType="numeric"
								placeholder="Seu peso..."
							/>
						</Input.Group>

						<Input.Group style={{ flex: 1 }}>
							<Input.Label>Idade</Input.Label>
							<Input
								value={age.toString()}
								onChangeText={value => setAge(Number(value))}
								keyboardType="numeric"
								placeholder="Sua idade..."
							/>
						</Input.Group>
					</View>

					<Input.Group>
						<Input.Label>Objetivo principal</Input.Label>
						<Input
							value={mainObjective}
							numberOfLines={6}
							onChangeText={setMainObjetive}
							keyboardType="default"
							placeholder="Digite seu objetivo principal com nutrição..."
						/>
					</Input.Group>

					<Button
						style={{ marginTop: 16, opacity: isLoading ? 0.5 : 1 }}
						disabled={isLoading}
						onPress={handleEditProfile}
					>
						{isLoading ? (
							<ActivityIndicator
								color="white"
								size="small"
							/>
						) : (
							'Salvar'
						)}
					</Button>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
