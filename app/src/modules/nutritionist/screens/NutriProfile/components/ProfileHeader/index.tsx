import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';

import { styles } from './style';
import { useNutritionist } from '@/modules/nutritionist/contexts/nutri/hook';

export function ProfileHeader() {
	const { nutritionistState } = useNutritionist();

	return (
		<View style={styles.profileContainer}>
			<Image
				source={require('../../../../../../assets/images/background-primary.png')}
				style={styles.profileBackgroundImage}
			/>

			{nutritionistState.currentNutritionist?.photoUrl ? (
				<Image
					source={{ uri: nutritionistState.currentNutritionist?.photoUrl }}
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
				<Text style={[styles.profileText, styles.profileTextName]}>Gabriel Sobral</Text>

				<View style={styles.profileLocationWrapper}>
					<Ionicons
						name={'location'}
						size={18}
						color={'#FFF'}
					/>

					<Text style={styles.profileLocationText}>Santos, SP</Text>
				</View>
			</View>

			{/* <Link
        href="/profile/edit-profile"
        style={styles.profileEditButton}
        aria-label="Editar perfil"
      >
        <Ionicons name={"create-outline"} size={32} color={"#FFF"} />
      </Link> */}
		</View>
	);
}
