import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';
import { Pressable, View } from 'react-native';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { IMealApi } from '@/modules/home/services/get-meals';

interface Props {
	item: IMealApi['eatenFoods'][number];
}

export function FoodItemToIngest({ item }: Props) {
	return (
		<ThemedView style={[styles.container]}>
			<View>
				<ThemedText style={styles.title}>{item.foodName}</ThemedText>
				<ThemedText style={styles.kcal}>{item.servingCalories * item.quantity} kcal</ThemedText>
				<ThemedText>
					{item.quantity}x {item.servingName}
				</ThemedText>
			</View>

			<View style={{ marginLeft: 'auto', justifyContent: 'space-between', gap: 8 }}>
				<Pressable
					android_ripple={{ color: 'white', borderless: false, radius: 20 }}
					style={styles.addButton}
				>
					<Ionicons
						name="checkmark"
						size={32}
						color="white"
					/>
				</Pressable>

				<View style={styles.suggestion}>
					<ThemedText style={{ fontSize: 12, color: 'white' }}>Sugerido</ThemedText>
				</View>
			</View>
		</ThemedView>
	);
}
