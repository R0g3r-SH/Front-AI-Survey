import { get } from "http";
import {api} from "./api";

export const companyService = {
    getAllCompanies: async () => {
        const response = await api.get("/companies");
        return response.data;
    },
    getCompanyById: async (companyId: string) => {
        if (!companyId) {
            throw new Error("Company ID is required to fetch company details");
        }
        const response = await api.get(`/companies/${companyId}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch company details");
        }
        return response.data;
    },
}