import { StyleSheet } from 'react-native';
import { Link, Stack, useNavigation } from 'expo-router';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

export default function NotFoundScreen() {
	const navigation = useNavigation();

	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />

			<ThemedView style={styles.container}>
				<ThemedText type="title">This screen doesn't exist. Route: {navigation.getId()}</ThemedText>

				<Link
					href="/user/(tabs)"
					style={styles.link}
				>
					<ThemedText type="link">Go to home screen!</ThemedText>
				</Link>
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
