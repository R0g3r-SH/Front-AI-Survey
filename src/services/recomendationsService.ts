import { api } from "./api";

export const recomendationsService = {
  getRecomendationsByCompanyId: async (companyId: string) => {
    if (!companyId) {
      throw new Error("Company ID is required to fetch recommendations");
    }
    const response = await api.get(`/recomendations/${companyId}`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch recommendations");
    }
    return response.data;
  },
  generateAIRoadmap: async (companyId: string) => {
    if (!companyId) {
      throw new Error("Company ID is required to generate roadmap");
    }
    const response = await api.get(`/recomendations/roadmap/${companyId}`);

    if (response.status !== 200) {
      throw new Error("Failed to generate roadmap");
    }
    return response.data;
  },
  generateAITraining: async (companyId: string) => {
    if (!companyId) {
      throw new Error("Company ID is required to generate training");
    }
    const response = await api.get(`/recomendations/training/${companyId}`);

    if (response.status !== 200) {
      throw new Error("Failed to generate training");
    }
    return response.data;
  },
};
