import { UseQueryResult } from '@tanstack/react-query';

export type PatientsActions =
	| { type: 'SELECT_PATIENT'; payload: IPatient | null }
	| { type: 'REMOVE_DIET_PLAN'; payload: string };

export interface IPatient {
	id: string;
	photoUrl?: string;
	firstName: string;
	lastName?: string;
	age: number | null;
	height: number | null;
	address: string | null;
	mainObjective: string | null;
	dietPlans: DietPlans[];
}

export interface DietPlans {
	id: string;
	name: string;
	description: string;
	additionalNote: string;
	startDate: Date;
	endDate: Date;
	meals: {
		id: string;
		name: string;
		maxKcal: number;
		foods: {
			id: string;
			foodId: string;
			foodName: string;

			servingId: string;
			servingName: string;

			servingFats: number;
			servingProteins: number;
			servingCarbohydrates: number;
			servingCalories: number;

			quantity: number;
		}[];
	}[];
}

export interface PatientsState {
	selectedPatient: IPatient | null;
}

export const initialPatientsState: PatientsState = {
	selectedPatient: null,
};

export function patientsReducer(state: PatientsState, action: PatientsActions): PatientsState {
	switch (action.type) {
		case 'REMOVE_DIET_PLAN':
			return {
				...state,
				selectedPatient: state.selectedPatient
					? {
							...state.selectedPatient,
							dietPlans: state.selectedPatient.dietPlans.filter(plan => plan.id !== action.payload),
						}
					: null,
			};

		case 'SELECT_PATIENT': {
			return {
				...state,
				selectedPatient: action.payload,
			};
		}

		default:
			return state;
	}
}
