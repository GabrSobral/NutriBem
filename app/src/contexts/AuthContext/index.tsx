import React from 'react';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import { AsyncStorage } from '@/libs/AsyncStorage';

import { getAccessToken, IFatSecretToken } from '@/services/get-access-token';

import { signInApi } from '@/modules/authentication/services/sign-in';
import { signUpApi } from '@/modules/authentication/services/sign-up';

export interface User {
	id: string;
	crn: string | null;
	firstName: string;
	lastName: string;
	address: string | null;
	age: number | null;
	weight: number | null;
	height: number | null;
	mainObjective: string | null;
	sex: 'male' | 'female' | null;
	email: string;
	photoUrl: string | null;
	createdAt: Date;
}

interface AuthContextProps {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	fatSecretToken: IFatSecretToken | null;
	accessToken: string | null;

	signInAsync: ({ email, password }: { email: string; password: string }) => Promise<void>;
	signOutAsync: () => Promise<void>;
	signUpAsync: ({
		crn,
		firstName,
		lastName,
		email,
		password,
	}: {
		crn?: string;
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
	children: ReactNode;
}

export const USER_ID = '@NutriBem:user-id';
const ACCESS_TOKEN_KEY = '@FatSecretToken';
const API_ACCESS_TOKEN_KEY = '@NutriBem:access-token';
const API_REFRESH_TOKEN_KEY = '@NutriBem:refresh-token';

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	const [fatSecretToken, setFatSecretToken] = useState<IFatSecretToken | null>(null);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		const currentTime = new Date();
		// AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

		AsyncStorage.getItem<IFatSecretToken>(ACCESS_TOKEN_KEY).then(token => {
			if (token) {
				setFatSecretToken(token);

				let expiresIn = dayjs(token?.expires_in_date).diff(currentTime, 'second');

				if (expiresIn <= 60) {
					console.log('FatSecret Token expired! Refreshing token...');

					getAccessToken().then(newToken => {
						const updatedToken = {
							...newToken,
							expires_in_date: new Date(currentTime.getTime() + newToken.expires_in * 1000),
						};

						AsyncStorage.setItem(ACCESS_TOKEN_KEY, updatedToken);
						setFatSecretToken(updatedToken);

						expiresIn = dayjs(updatedToken.expires_in_date).diff(currentTime, 'second');
					});
				}

				timeout = setTimeout(async () => {
					console.log('FatSecret Token expired! Refreshing token...');

					const newToken = await getAccessToken();
					const expiresInDate = dayjs().add(newToken.expires_in, 'seconds').toDate();

					const updatedToken = {
						...newToken,
						expires_in_date: expiresInDate,
					};

					AsyncStorage.setItem(ACCESS_TOKEN_KEY, updatedToken);
					setFatSecretToken(updatedToken);
				}, expiresIn - 60);
			} else {
				console.log('FatSecret Token not found! Requesting it...');

				getAccessToken().then(newToken => {
					const expiresInDate = dayjs().add(newToken.expires_in, 'seconds').toDate();

					const updatedToken = {
						...newToken,
						expires_in_date: expiresInDate,
					};

					AsyncStorage.setItem(ACCESS_TOKEN_KEY, updatedToken);
					setFatSecretToken(updatedToken);
				});
			}
		});

		return () => clearTimeout(timeout);
	}, [router]);

	useEffect(() => {
		AsyncStorage.getItem<string>(API_ACCESS_TOKEN_KEY).then(token => {
			if (token === null) {
				router.replace('/auth');
				return;
			}

			const decodedToken = jwtDecode(token);
			const isExpired = (decodedToken.exp || 0) < Date.now() / 1000;

			if (isExpired) {
				// refresh token logic

				router.replace('/auth');
				return;
			}

			setAccessToken(token);
		});

		AsyncStorage.getItem<string>(API_REFRESH_TOKEN_KEY).then(token => {
			setRefreshToken(token);
		});
	}, [router]);

	const signInAsync = useCallback(
		async ({ email, password }: { email: string; password: string }) => {
			const response = await signInApi({ email, password });

			if (response.status !== 200) {
				throw new Error('Invalid credentials');
			}

			const { payload } = response;

			AsyncStorage.setItem(API_ACCESS_TOKEN_KEY, payload.accessToken);
			AsyncStorage.setItem(API_ACCESS_TOKEN_KEY, payload.refreshToken);
			AsyncStorage.setItem(USER_ID, payload.user.id);

			setUser(payload.user);
			setAccessToken(payload.accessToken);
			setRefreshToken(payload.refreshToken);

			router.dismissAll();

			if (payload.user?.crn) {
				router.replace('/nutritionist');
			} else {
				router.replace('/user');
			}
		},
		[router, setAccessToken, setRefreshToken, setUser]
	);

	const signUpAsync = useCallback(
		async ({
			crn,
			firstName,
			lastName,
			email,
			password,
		}: {
			crn?: string;
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		}) => {
			const response = await signUpApi({ crn, firstName, lastName, email, password });

			if (response.status !== 201) {
				throw new Error('Invalid credentials');
			}

			const { payload } = response;

			AsyncStorage.setItem(API_ACCESS_TOKEN_KEY, payload.accessToken);
			AsyncStorage.setItem(API_ACCESS_TOKEN_KEY, payload.refreshToken);
			AsyncStorage.setItem(USER_ID, payload.user.id);

			setUser(payload.user);
			setAccessToken(payload.accessToken);
			setRefreshToken(payload.refreshToken);

			// router.dismissAll();

			if (payload.user?.crn) {
				router.replace('/nutritionist');
			} else {
				router.replace('/user');
			}
		},
		[router, setAccessToken, setRefreshToken, setUser]
	);

	const signOutAsync = useCallback(async () => {
		await AsyncStorage.removeItem(API_ACCESS_TOKEN_KEY);
		await AsyncStorage.removeItem(API_REFRESH_TOKEN_KEY);
		await AsyncStorage.removeItem(USER_ID);

		setUser(null);
		setAccessToken(null);
		setRefreshToken(null);

		router.dismissAll();
		router.replace('/auth');
	}, [router]);

	return (
		<AuthContext.Provider
			value={{
				user,
				fatSecretToken,
				signInAsync,
				signUpAsync,
				signOutAsync,
				accessToken,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
