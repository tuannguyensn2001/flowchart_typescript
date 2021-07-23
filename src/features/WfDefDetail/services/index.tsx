import bookingAPI from "../../../network";
import {WfDefDetail} from "../../../entities/WfDefDetail";
import {Edge, NodeItem} from "../../../entities/Node";
import {WfDefCondition} from "../../../entities/WfDefCondition";

export const fetchElements = (id: string): Promise<any> => {
    return bookingAPI.get(`/wf-def-details/${id}`);
}

export const fetchPosition = (): Promise<any> => {
    return bookingAPI.get('/positions');
}

export const fetchDepartmentsUser = (id: number) => {
    return bookingAPI.get(`/departments/${id}?user=true`);
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

export const fetchAttributes = () => {
    return bookingAPI.get('/attributes');
}

interface saveProp {
    node: WfDefDetail[],
    connection: Edge[]
}

export const fetchSave = (id: string, data: saveProp) => {
    return bookingAPI.put(`/wf-def-details/${id}`, {
        data
    });
}