import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingTop: 16,
		gap: 16,
	},
	profileImageButton: {
		width: 160,
		height: 160,
		borderRadius: 160 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		backgroundColor: '#000000aa',
		marginHorizontal: 'auto',
	},
	profileImage: {
		width: 160,
		height: 160,
		borderRadius: 160 / 2,
		backgroundColor: '#00000050',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		marginHorizontal: 'auto',
	},
	profileImageIcon: {
		position: 'absolute',
	},
});
