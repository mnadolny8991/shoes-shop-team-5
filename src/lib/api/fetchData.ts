import { ApiError } from "@/types/api/apiError";

const fetchData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorResponse = (await response.json()).error as ApiError;
    throw new Error(errorResponse.message, {
      cause: errorResponse.details,
    });
  }
  return await response.json();
}

export default fetchData;