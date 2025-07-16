import { api } from "./api";

export const surveyService = {
  createNewSurveyUrl: async (company_name: string ,invitationDate?: string ,contact_email?: string) => {
    const response = await api.post("/surveys/create-survey-url", {
      company_name,
      invitationDate,
      contact_email,
    });

    return response.data.surveyUrl;
  },

  createSurvey: async (survey: any, company_id: string) => {
    if (!survey || !company_id) {
      throw new Error(
        "Survey data and company ID are required to create a survey"
      );
    }

    const response = await api.post("/surveys/create-survey", {
      survey,
      company_id,
    });

    if (response.status !== 201) {
      throw new Error("Failed to create survey");
    }

    return response.data;
  },
};
