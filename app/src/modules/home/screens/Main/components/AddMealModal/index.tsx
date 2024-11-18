import { FlatList, View } from 'react-native';

import { PredefinedMeals } from '@/constants/PreDefinedMeals';

import { SlideModal } from '@/components/design-system/SlideModal';

import { MealItem } from './MealItem';

import { styles } from './style';
import { useState } from 'react';

type Props = {
	visible: boolean;
	onRequestClose: () => void;
};

export function AddMealModal({ onRequestClose, visible }: Props) {
	const [isDisabled, setIsDisabled] = useState(false);

	return (
		<SlideModal
			title="Adicionar Refeição"
			visible={visible}
			onRequestClose={onRequestClose}
			height={550}
		>
			<View style={styles.container}>
				<FlatList
					data={PredefinedMeals}
					keyExtractor={item => item.name}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
					renderItem={({ item }) => (
						<MealItem
							disable={setIsDisabled}
							isDisabled={isDisabled}
							onRequestClose={onRequestClose}
							item={item}
						/>
					)}
				/>
			</View>
		</SlideModal>
	);
}
