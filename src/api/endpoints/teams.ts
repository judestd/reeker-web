import { AxiosResponse } from "axios";
import apiClient from "../client";
import { Team } from "../../types/user";

export const teamsApi = {
  getAll: (): Promise<AxiosResponse<Team[]>> => apiClient.get("/teams"),

  getById: (id: string): Promise<AxiosResponse<Team>> =>
    apiClient.get(`/teams/${id}`),

  create: (data: Partial<Team>): Promise<AxiosResponse<Team>> =>
    apiClient.post("/teams", data),

  update: (id: string, data: Partial<Team>): Promise<AxiosResponse<Team>> =>
    apiClient.put(`/teams/${id}`, data),

  delete: (id: string): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/teams/${id}`),

  addMembers: (
    teamId: string,
    memberIds: string[],
  ): Promise<AxiosResponse<Team>> =>
    apiClient.post(`/teams/${teamId}/members`, { memberIds }),

  removeMember: (
    teamId: string,
    memberId: string,
  ): Promise<AxiosResponse<Team>> =>
    apiClient.delete(`/teams/${teamId}/members/${memberId}`),
};
