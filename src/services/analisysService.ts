import {api} from "./api";

export const analysisService = {
    getClustersByCompany: async (companyId: string) => {
        if (!companyId) {
            throw new Error("Company ID is required to fetch clusters");
        }
        const response = await api.get(`/analysis/${companyId}`);

        return response.data;
    },
}