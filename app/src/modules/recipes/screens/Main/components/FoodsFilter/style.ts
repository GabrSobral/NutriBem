import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	categoryButton: {
		width: 91,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.light.primary,
		padding: 8,
		marginRight: 6,
	},
});
