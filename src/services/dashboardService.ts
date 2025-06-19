import { api } from "./api";

export const dashboardService = {
    getDashboardData: async (companyId: string) => {
        const response = await api.get(`/dashboard/${companyId}`);
        return response.data;

    }
};