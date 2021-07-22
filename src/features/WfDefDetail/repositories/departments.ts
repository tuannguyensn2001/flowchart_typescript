import {AxiosResponse} from "axios";
import {Department} from "../../../entities/Department";
import {fetchDepartments, fetchDepartmentsUser} from "../services";
import {User} from "../../../entities/User";

export const getDepartments = async (id: number): Promise<Department[]> => {
    const response: AxiosResponse = await fetchDepartments(id);
    return response.data.data.map((item: any) => {
        return {
            id: Number(item.id),
            name: item.name
        }
    })
}

export const getDepartmentUsers = async (id: number): Promise<User[]> => {
    const response: AxiosResponse = await fetchDepartmentsUser(id);
    return response.data.data.map((item: any) => {
        return {
            id: Number(item.id),
            fullname: item.fullname,
            email: item.email
        }
    })
}