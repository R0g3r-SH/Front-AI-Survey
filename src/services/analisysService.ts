import {api} from "./api";

export const analysisService = {
    getClustersByCompany: async (companyId: string) => {
        if (!companyId) {
            throw new Error("Company ID is required to fetch clusters");
        }
        const response = await api.get(`/analysis/${companyId}`);

        return response.data;
    },

    generateAIReport: async (companyId: string) => {
        if (!companyId) {
            throw new Error("Company ID is required to generate AI report");
        }
        const response = await api.get(`/analysis/report/${companyId}`);

        if (response.status !== 200) {
            throw new Error("Failed to generate AI report");
        }
        return response.data;
    }
}