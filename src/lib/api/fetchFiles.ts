import apiUrl from "@/data/apiUrl";
import fetchData from "@/lib/api/fetchData";

export const uploadFile = async (formData: FormData) => 
  await fetchData(`${apiUrl}/upload`, { method: 'POST', body: formData });
