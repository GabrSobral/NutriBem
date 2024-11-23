import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/design-system/Collapsible';
import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { Serving } from '../..';

interface Props {
	serving: Serving | null;
	quantity: number;
}

export function AdditionalInformation({ serving, quantity }: Props) {
	return (
		<Collapsible title="Informações adicionais">
			<ThemedView style={styles.container}>
				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Sódio</ThemedText>
					<ThemedText>{(quantity * Number(serving?.sodium || 0)).toFixed(2)}g</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Gordura Saturada</ThemedText>
					<ThemedText>{(quantity * Number(serving?.saturated_fat || 0)).toFixed(2)}g</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Gordura polinsaturada</ThemedText>
					<ThemedText>{(quantity * Number(serving?.polyunsaturated_fat || 0)).toFixed(2)}g</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Gordura monoinsaturada</ThemedText>
					<ThemedText>{(quantity * Number(serving?.monounsaturated_fat || 0)).toFixed(2)}g</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Colesterol</ThemedText>
					<ThemedText>{(quantity * Number(serving?.cholesterol || 0)).toFixed(2)}mg</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Potássio</ThemedText>
					<ThemedText>{(quantity * Number(serving?.potassium || 0)).toFixed(2)}mg</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Cálcio</ThemedText>
					<ThemedText>{(quantity * Number(serving?.calcium || 0)).toFixed(2)}mg</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Ferro</ThemedText>
					<ThemedText>{(quantity * Number(serving?.iron || 0)).toFixed(2)}mg</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Fibra</ThemedText>
					<ThemedText>{(quantity * Number(serving?.fiber || 0)).toFixed(2)}mg</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Açúcar</ThemedText>
					<ThemedText>{(quantity * Number(serving?.sugar || 0)).toFixed(2)}g</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Vitamina A</ThemedText>
					<ThemedText>{(quantity * Number(serving?.vitamin_a || 0)).toFixed(2)}mcg</ThemedText>
				</ThemedView>

				<ThemedView style={styles.itemWrapper}>
					<ThemedText>Vitamina C</ThemedText>
					<ThemedText>{(quantity * Number(serving?.vitamin_c || 0)).toFixed(2)}mg</ThemedText>
				</ThemedView>
			</ThemedView>
		</Collapsible>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 8,
	},
	itemWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#00000030',
		marginRight: 24,
		paddingBottom: 8,
	},
});
