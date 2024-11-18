import { useState } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Modal } from '@/components/design-system/Modal';
import { useNutritionistProfile } from '@/modules/nutritionist-profile/contexts/profile/hook';
import { useNavigation } from 'expo-router';

interface Props {
	show: boolean;
	closeModal: () => void;
	submit: () => Promise<void>;
}

export function DeleteDietPlanModal({ show, closeModal, submit }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const colorScheme = useColorScheme() as 'light' | 'dark';
	const { patientsQueryResult } = useNutritionistProfile();
	const { navigate } = useNavigation();

	async function handleSubmit() {
		setIsLoading(true);
		await submit();
		await patientsQueryResult?.refetch();
		navigate('patient-detail');

		setIsLoading(false);

		closeModal();
	}

	return (
		<Modal
			visible={show}
			closeModal={closeModal}
		>
			<Modal.Title>Remover plano alimentar</Modal.Title>

			<Modal.Description>Você tem certeza de que quer remover o plano alimentar?</Modal.Description>

			<Modal.ButtonWrapper>
				<Modal.Button
					style={{ flex: 1, opacity: isLoading ? 0.5 : 1 }}
					onPress={closeModal}
					disabled={isLoading}
				>
					Não, fechar
				</Modal.Button>
				<Modal.Button
					highlight
					style={{ opacity: isLoading ? 0.5 : 1 }}
					onPress={handleSubmit}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator
							size="small"
							color={Colors[colorScheme].secondary}
						/>
					) : (
						'Sim, tenho'
					)}
				</Modal.Button>
			</Modal.ButtonWrapper>
		</Modal>
	);
}
