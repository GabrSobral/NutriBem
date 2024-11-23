import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';

import { Colors } from '@/constants/Colors';
import { styles } from './style';
import { SavedRecipe } from '@/modules/recipes/services/get-saved-recipe';

interface Props {
	item: SavedRecipe;
}

export function RecipeItem({ item }: Props) {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();

	return (
		<Pressable
			style={[styles.recipeItem, { borderColor: colorScheme === 'light' ? '#00000020' : '#FFFFFF40' }]}
			android_ripple={{ color: Colors.light.primary }}
			onPress={() => {
				navigation.navigate('user/recipes/recipe-detail', { recipeId: item.recipeId });
			}}
		>
			<View style={[styles.imageItem, { position: 'relative' }]}>
				{!item.photoUrl ? (
					<View style={styles.imageItem} />
				) : (
					<Image
						resizeMode="cover"
						source={{ uri: item.photoUrl }}
						style={styles.imageItem}
					/>
				)}

				<View
					style={{
						flex: 1,
						position: 'absolute',
						backgroundColor: '#00000050',
						height: 130,
						width: 130,
						borderTopLeftRadius: 8,
						borderBottomLeftRadius: 8,
					}}
				/>

				<View
					style={{
						borderRadius: 90,
						padding: 6,
						position: 'absolute',
						top: 8,
						right: 8,
						backgroundColor: '#00000050',
					}}
				>
					<Ionicons
						name="bookmark"
						color={Colors.light.primary}
						size={26}
					/>
				</View>
			</View>

			<View style={styles.recipeTitleContainer}>
				<ThemedText
					type="defaultSemiBold"
					style={{ fontSize: 18 }}
				>
					{item.title}
				</ThemedText>

				<ThemedText style={{ fontSize: 16 }}>{item.description}</ThemedText>
				<ThemedText>{item.calories} kcal</ThemedText>
			</View>
		</Pressable>
	);
}
