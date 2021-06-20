import bookingAPI from "../../../network";
import {WfDefDetail} from "../../../entities/WfDefDetail";

export const fetchElements = (id: string): Promise<any> => {
    return bookingAPI.get(`/wf-def-details/${id}`);
}

export const fetchPosition = (): Promise<any> => {
    return bookingAPI.get('/positions');
}

export const fetchDepartments = (id: number) => {
    return bookingAPI.get(`/departments`);
}

export const fetchTeams = (department_group_id: number) => {
    return bookingAPI.get(`/teams?department_group=${department_group_id}`);
}

export const fetchUserOfTeam = (team_id: number) => {
    return bookingAPI.get(`/teams/${team_id}?user=true`);
}