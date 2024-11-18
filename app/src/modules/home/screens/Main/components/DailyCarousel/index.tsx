import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dimensions, FlatList, Pressable, TouchableOpacity, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/design-system/ThemedText';
import { ThemedView } from '@/components/design-system/ThemedView';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useHome } from '@/modules/home/contexts/hook';

import { Colors } from '@/constants/Colors';

import { styles } from './style';

const { width } = Dimensions.get('window');

export function DailyCarousel() {
	const iconColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

	const colorScheme = useColorScheme();
	const { homeDispatch, homeState } = useHome();

	const flatListRef = useRef<FlatList>(null);
	const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

	const [currentDate, setCurrentDate] = useState(dayjs(homeState.selectedDate));
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	useEffect(() => {
		setCurrentDate(dayjs(homeState.selectedDate));
	}, [homeState.selectedDate]);

	const showDatePicker = () => setDatePickerVisibility(true);
	const hideDatePicker = () => setDatePickerVisibility(false);

	const handleConfirm = (date: Date) => {
		homeDispatch({ type: 'SELECT_DATE', payload: date });
		hideDatePicker();
	};

	const nextLimit = dayjs();
	const prevLimit = dayjs().subtract(14, 'days');

	const goToNextItem = () => {
		if (nextLimit.isBefore(currentDate)) return;

		const nextDate = currentDate.add(1, 'days');

		setCurrentDate(nextDate);
		homeDispatch({ type: 'SELECT_DATE', payload: nextDate.toDate() });
	};

	const goToPrevItem = () => {
		if (currentDate.isBefore(prevLimit)) return;

		const previousDate = currentDate.subtract(1, 'days');

		setCurrentDate(previousDate);
		homeDispatch({ type: 'SELECT_DATE', payload: previousDate.toDate() });
	};

	return (
		<>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				locale="pt-BR"
				date={currentDate.toDate()}
				isDarkModeEnabled
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				maximumDate={nextLimit.toDate()}
			/>

			<ThemedView style={styles.historicWrapper}>
				<TouchableOpacity
					onPress={goToPrevItem}
					style={[
						styles.button,
						{
							backgroundColor: colorScheme === 'light' ? '#00000010' : '#FFFFFF10',
						},
					]}
				>
					<Ionicons
						name="chevron-back"
						size={28}
						color={iconColor}
					/>
				</TouchableOpacity>

				<View style={{ width: width - 140 }}>
					<Pressable
						style={[styles.itemWrapper, { width: width - 140 }]}
						onPress={showDatePicker}
					>
						<Ionicons
							name="calendar"
							size={24}
							color={iconColor}
						/>

						<ThemedText
							type="subtitle"
							style={[styles.title, { color: iconColor }]}
						>
							{currentDate.format('DD/MM')}
						</ThemedText>
					</Pressable>
				</View>

				<TouchableOpacity
					onPress={goToNextItem}
					style={[
						styles.button,
						!nextLimit.isBefore(currentDate.add(1, 'days')) && {
							backgroundColor: colorScheme === 'light' ? '#00000010' : '#FFFFFF10',
						},
					]}
					disabled={nextLimit.isBefore(currentDate.add(1, 'days'))}
				>
					{!nextLimit.isBefore(currentDate.add(1, 'days')) && (
						<Ionicons
							name="chevron-forward"
							size={28}
							color={iconColor}
						/>
					)}
				</TouchableOpacity>
			</ThemedView>
		</>
	);
}
