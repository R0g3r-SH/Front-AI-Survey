import { api } from "./api";

export const dashboardService = {
    getDashboardData: async (companyId: string) => {
        const response = await api.get(`/dashboard/${companyId}`);
        return response.data;
    },
    getComparativeData: async (companyId: string ,companyId2: string = null) => {
        const response = await api.get(`/dashboard/comparative/${companyId}/${companyId2}`);
        return response.data;
    }
};