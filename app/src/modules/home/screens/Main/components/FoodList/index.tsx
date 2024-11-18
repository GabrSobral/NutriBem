import dayjs from 'dayjs';
import LottieView from 'lottie-react-native';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NestableDraggableFlatList, NestableScrollContainer, ScaleDecorator } from 'react-native-draggable-flatlist';

import { FoodListItem } from './FoodListItem';
import { useHome } from '@/modules/home/contexts/hook';

import { ThemedView } from '@/components/design-system/ThemedView';
import { ThemedText } from '@/components/design-system/ThemedText';
import { updateMealApi } from '@/modules/home/services/update-meal';
import { useAuth } from '@/contexts/AuthContext/hook';

interface Props {}

export function FoodList({}: Props) {
	const { accessToken } = useAuth();
	const { homeState, homeDispatch, removeMealAsync, isDailyMealLoading } = useHome();

	return (
		<GestureHandlerRootView>
			{isDailyMealLoading && (
				<ActivityIndicator
					size="large"
					style={{ marginTop: 16 }}
				/>
			)}

			{!isDailyMealLoading && homeState.meals.length === 0 ? (
				<ThemedView style={{ justifyContent: 'center', gap: 12 }}>
					<ThemedView
						style={{
							backgroundColor: '#00000020',
							borderRadius: 100,
							overflow: 'hidden',
							width: 170,
							height: 170,
							margin: 'auto',
							marginTop: 20,
						}}
					>
						<LottieView
							autoPlay
							style={{ width: 170, height: 170 }}
							source={require('../../../../../../assets/lottie/healthy-foods.json')}
						/>
					</ThemedView>
					<ThemedText
						style={{ textAlign: 'center' }}
						type="defaultSemiBold"
					>
						Nenhum alimento {'\n'}cadastrado em: {dayjs(homeState.selectedDate).format('DD/MM/YYYY')}
					</ThemedText>
				</ThemedView>
			) : (
				!isDailyMealLoading && (
					<NestableScrollContainer>
						<NestableDraggableFlatList
							data={homeState.meals}
							keyExtractor={item => item.id}
							onDragEnd={({ data, to }) => {
								console.log({ to });
								updateMealApi({ mealId: data[to].id, order: to + 1 }, { accessToken: accessToken || '' });
								homeDispatch({
									type: 'SET_DAILY_MEALS',
									payload: data,
								});
							}}
							ListEmptyComponent={
								<ThemedText style={{ marginHorizontal: 'auto', padding: 12 }}>Nenhuma refeição cadastrada</ThemedText>
							}
							renderItem={({ item, drag, isActive }) => (
								<ScaleDecorator activeScale={1.05}>
									<FoodListItem
										drag={drag}
										disabled={isActive}
										handleRemove={async () => removeMealAsync(item.id)}
										meal={item}
										key={item.id}
									/>
								</ScaleDecorator>
							)}
						/>
					</NestableScrollContainer>
				)
			)}
		</GestureHandlerRootView>
	);
}
