import { ServiceOptions } from "@/types/ServiceOptions";

interface Request {
    mealId: string;
}


const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function removeMealApi({ mealId }: Request, { accessToken }: ServiceOptions): Promise<Response> {
    const response = await fetch(`${apiUrl}/meals/${mealId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken || "<no-access-token-provided>"}`	
        },
    });

    const body = await response.json() as Response;

    if (!response.ok) {
        throw new Error(`Something went wrong: ${body}`);
    }

    return body;
}