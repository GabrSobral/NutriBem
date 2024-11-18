import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './style';
import { useAuth } from '@/contexts/AuthContext/hook';

export function ProfileHeader() {
	const { user, signOutAsync } = useAuth();

	return (
		<View style={styles.profileContainer}>
			<Image
				source={require('../../../../../../assets/images/background-primary.png')}
				style={styles.profileBackgroundImage}
			/>

			<TouchableOpacity
				style={styles.profileLogoutButton}
				aria-label="Sair"
				onPress={signOutAsync}
			>
				<Ionicons
					name={'log-out-outline'}
					size={32}
					color={'#FFF'}
				/>
			</TouchableOpacity>

			{user?.photoUrl ? (
				<Image
					source={{ uri: user?.photoUrl }}
					style={styles.profileImage}
				/>
			) : (
				<View style={styles.profileImage}>
					<Ionicons
						name="person"
						size={76}
						color="white"
					/>
				</View>
			)}

			<View style={styles.profileTextContainer}>
				<Text style={styles.profileText}>
					Olá,{' '}
					<Text style={StyleSheet.flatten([styles.profileText, styles.profileTextName])}>
						{user?.firstName}
						{user?.lastName}
					</Text>
				</Text>

				<View style={styles.profileLocationWrapper}>
					<Ionicons
						name={'location'}
						size={18}
						color={'#FFF'}
					/>

					<Text style={styles.profileLocationText}>{user?.address || 'Localização não registrada...'}</Text>
				</View>
			</View>

			<Link
				href="/user/profile/edit-profile"
				style={styles.profileEditButton}
				aria-label="Editar perfil"
			>
				<Ionicons
					name={'create-outline'}
					size={32}
					color={'#FFF'}
				/>
			</Link>
		</View>
	);
}
