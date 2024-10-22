import { ServiceOptions } from "@/types/ServiceOptions";

export interface IFood {
  food: {
    food_id: string;
    food_name: string;
    food_type: string;
    food_sub_categories?: {
      food_sub_category: string[];
    };
    food_url: string;
    food_images?: {
      food_image: {
        image_url: string;
        image_type: string;
      }[];
    };
    food_attributes: {
      allergens: {
        allergen: {
          id: string;
          name: string;
          value: string;
        }[];
      };
      preferences: {
        preference: {
          id: string;
          name: string;
          value: string;
        }[];
      };
    };
    servings: {
      serving: {
        serving_id: string;
        serving_description: string;
        serving_url: string;
        metric_serving_amount: string;
        metric_serving_unit: string;
        number_of_units: string;
        measurement_description: string;
        calories: string;
        carbohydrate: string;
        protein: string;
        fat: string;
        saturated_fat: string;
        polyunsaturated_fat: string;
        monounsaturated_fat: string;
        cholesterol: string;
        sodium: string;
        potassium: string;
        fiber: string;
        sugar: string;
        vitamin_a: string;
        vitamin_c: string;
        calcium: string;
        iron: string;
      }[];
    };
    brand_name?: string;
  };
}

interface Request {
  foodId: string;
}

export async function getFoodById(
  { foodId }: Request,
  { accessToken }: ServiceOptions
): Promise<IFood> {
  const response = await fetch(
    `https://platform.fatsecret.com/rest/food/v4?format=json&food_id=${foodId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return (await response.json()) as Promise<IFood>;
}
