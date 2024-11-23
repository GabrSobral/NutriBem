import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

export function NutriChat() {
	const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			<StatusBar
				animated
				barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		position: 'relative',
	},
});
