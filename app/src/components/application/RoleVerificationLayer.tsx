import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';

import { ThemedView } from '../design-system/ThemedView';
import { useAuth } from '@/contexts/AuthContext/hook';
import { User, USER_ID } from '@/contexts/AuthContext';

import { AsyncStorage } from '@/libs/AsyncStorage';
import { getUserByIdApi } from '@/modules/authentication/services/get-user-by-id';

export function RoleVerificationLayer() {
	const router = useRouter();
	const [userId, setUserId] = useState<{ value: string; wasFetched: boolean }>({ value: '', wasFetched: false });

	const { accessToken, user, setUser } = useAuth();

	const { data: userData, isFetching } = useQuery<User | null>({
		queryKey: ['user', userId.value],
		enabled: !!(userId.value && accessToken),
		queryFn: async () => {
			try {
				console.log('Fetching user data...', userId.value);
				return await getUserByIdApi({ id: userId.value || '' }, { accessToken: accessToken || '' });
			} catch (error) {
				console.log(error);
			}

			return null;
		},
	});

	useEffect(() => {
		if (isFetching || !user) {
			return;
		}

		const role = user?.crn ? 'nutri' : 'user';
		console.log("User's role verification...", role);

		if (role === 'user') {
			console.log("User's role is user");
			router.replace('/user/(tabs)');
		} else if (role === 'nutri') {
			console.log("User's role is nutritionist");
			router.replace('/nutritionist');
		} else {
			console.log("User doesn't have a role");
			router.replace('/auth');
		}
	}, [isFetching, router, user]);

	useEffect(() => {
		AsyncStorage.getItem(USER_ID).then(id => {
			console.log('User ID:', id);
			if (id) {
				setUserId({ value: id, wasFetched: true });
			} else {
				console.log("User ID doesn't exist");
				setUserId({ value: '', wasFetched: true });
				// router.dismissAll();
				router.replace('/auth');
			}
		});
	}, [router]);

	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
	}, [userData]);

	return (
		<View style={{ position: 'relative', flex: 1 }}>
			{isFetching && (
				<ThemedView
					style={{
						flex: 1,
						zIndex: 10,
						width: '100%',
						height: '100%',
						position: 'absolute',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ActivityIndicator size="large" />
				</ThemedView>
			)}

			<Stack
				screenOptions={{
					headerShown: false,
					animation: 'ios',
					animationDuration: 100,
				}}
			>
				<Stack.Screen name="user/(tabs)" />
				<Stack.Screen name="+not-found" />
			</Stack>
		</View>
	);
}
