import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		gap: 12,
	},
	profileImage: {
		width: 160,
		height: 160,
		borderRadius: 160 / 2,
		marginHorizontal: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
});
