import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import {
	EditNutritionistProfileActions,
	EditNutritionistProfileState,
	initialEditNutritionistProfileState,
	NutritionistProfileReducer,
} from './reducers/edit-profile-reducer';
import {
	initialPatientsState,
	IPatient,
	PatientsActions,
	patientsReducer,
	PatientsState,
} from './reducers/patients-reducer';

import { getPatientsApi } from '../../services/get-patients';
import { useAuth } from '@/contexts/AuthContext/hook';

interface NutritionistProfileContextProps {
	editNutritionistProfileState: EditNutritionistProfileState;
	editNutritionistProfileDispatch: Dispatch<EditNutritionistProfileActions>;

	patientsState: PatientsState;
	patientsDispatch: Dispatch<PatientsActions>;

	patientsQueryResult: UseQueryResult<IPatient[], Error> | null;
}

export const NutritionistProfileContext = createContext({} as NutritionistProfileContextProps);

interface NutritionistProfileProviderProps {
	children: ReactNode;
}

export function NutritionistProfileProvider({ children }: NutritionistProfileProviderProps) {
	const { accessToken } = useAuth();
	const [editNutritionistProfileState, editNutritionistProfileDispatch] = useReducer(
		NutritionistProfileReducer,
		initialEditNutritionistProfileState
	);

	const [patientsState, patientsDispatch] = useReducer(patientsReducer, initialPatientsState);

	const patientsQueryResult = useQuery<IPatient[]>({
		queryKey: ['getPatients'],
		enabled: !!accessToken,
		queryFn: async () => await getPatientsApi({ accessToken: accessToken || '' }),
	});

	return (
		<NutritionistProfileContext.Provider
			value={{
				editNutritionistProfileState,
				editNutritionistProfileDispatch,

				patientsState,
				patientsDispatch,

				patientsQueryResult,
			}}
		>
			{children}
		</NutritionistProfileContext.Provider>
	);
}
