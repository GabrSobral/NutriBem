import dayjs from 'dayjs';
import { IDailyMeal } from '../contexts/reducers/home-reducer';
import { IFood } from './get-food-by-id';
import { ServiceOptions } from '@/types/ServiceOptions';

interface Request {
	date: Date;
}

export interface IMealApi {
	id: string;
	name: string;
	maxKcal: number;
	eatenFoods: {
		id: string;
		foodId: IFood['food']['food_id'];
		foodName: IFood['food']['food_name'];
		servingId: IFood['food']['servings']['serving'][number]['serving_id'];
		servingName: IFood['food']['servings']['serving'][number]['serving_description'];
		servingFats: number;
		servingProteins: number;
		servingCalories: number;
		servingCarbohydrates: number;
		quantity: number;
	}[];
	dietPlanFoods: {
		id: string;
		foodId: IFood['food']['food_id'];
		foodName: IFood['food']['food_name'];
		servingId: IFood['food']['servings']['serving'][number]['serving_id'];
		servingName: IFood['food']['servings']['serving'][number]['serving_description'];
		servingFats: number;
		servingProteins: number;
		servingCalories: number;
		servingCarbohydrates: number;
		quantity: number;
	}[];
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getMealsApi({ date }: Request, { accessToken }: ServiceOptions): Promise<IDailyMeal<IMealApi>> {
	const response = await fetch(`${apiUrl}/meals/get-by-date/${dayjs(date).format('MM-DD-YYYY')}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken || '<no-access-token-provided>'}`,
		},
	});

	if (!response.ok) {
		const body = await response.json();
		throw new Error(`Something went wrong: ${JSON.stringify(body)}`);
	}

	const body = (await response.json()) as IDailyMeal<IMealApi>;

	console.log({ body });

	return body;
}
