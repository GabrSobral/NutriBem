import { View } from 'react-native';

import { Input } from '@/components/design-system/Input';

import { styles } from './style';
import { useRecipes } from '@/modules/recipes/contexts/hook';

export function SearchInput() {
	const { searchQuery, setSearchQuery } = useRecipes();

	return (
		<View style={styles.searchContainer}>
			<Input.Group style={{ flex: 1 }}>
				<Input.Label>Buscar receita</Input.Label>

				<Input.Wrapper>
					<Input
						placeholder="O que você gostaria de comer?"
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</Input.Wrapper>
			</Input.Group>
		</View>
	);
}
