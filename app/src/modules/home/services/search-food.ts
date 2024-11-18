import { ServiceOptions } from "@/types/ServiceOptions";

interface Request {
  searchTerm: string;
}

export interface SearchedFood {
  foods: {
    food: {
      food_id: string;
      food_name: string;
      food_type: string;
      food_description: string;
      food_url: string;
    }[];
    max_results: number;
    page_number: number;
    total_results: number;
  };
}

export async function searchFood(
  { searchTerm }: Request,
  { accessToken, cancellationToken }: ServiceOptions
): Promise<SearchedFood> {
  const response = await fetch(
    `https://platform.fatsecret.com/rest/foods/search/v1?format=json&search_expression=${searchTerm}`,
    {
      signal: cancellationToken,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok)
    throw new Error(response?.body?.toString() || "Erro ao buscar alimentos.");

  return (await response.json()) as Promise<SearchedFood>;
}
