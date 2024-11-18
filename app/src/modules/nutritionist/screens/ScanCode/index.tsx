import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Dimensions, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { AppHeader } from '@/components/design-system/AppHeader';
import { ThemedText } from '@/components/design-system/ThemedText';

export function ScanNutriCode() {
	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const [permission, requestPermission] = useCameraPermissions();
	const colorScheme = useColorScheme();
	const { navigate } = useNavigation();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<ThemedText type="defaultSemiBold">We need your permission to show the camera</ThemedText>

				<Button
					onPress={requestPermission}
					title="grant permission"
				/>
			</View>
		);
	}

	function handleBarCodeScanned(data: string) {
		if (!data.startsWith('@nutribem:')) {
			setError('Código inválido!');

			setTimeout(() => {
				setError('');
			}, 3000);

			return;
		}

		setCode(data.split('@nutribem:')[1]);

		navigate('nutri', { code: data.split('@nutribem:')[1] });
	}

	return (
		<View style={styles.container}>
			<StatusBar
				animated
				barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
			/>
			<AppHeader title="Vincular Nutricionista" />

			<CameraView
				style={styles.camera}
				facing={'back'}
				barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
				onBarcodeScanned={data => handleBarCodeScanned(data.data)}
			>
				<View style={styles.target}></View>
			</CameraView>

			{error && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		position: 'relative',
	},
	errorMessage: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		position: 'absolute',
		bottom: 100,
		backgroundColor: '#FF000040',
		marginHorizontal: 16,
		width: Dimensions.get('window').width - 32,
		padding: 16,
		borderRadius: 8,
		justifyContent: 'center',
		textAlign: 'center',
	},
	target: {
		width: 300,
		height: 300,
		borderWidth: 5,
		borderStyle: 'dashed',
		borderRadius: 32,
		marginBottom: 80,
		backgroundColor: 'transparent',
		borderColor: 'white',
	},
	camera: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
