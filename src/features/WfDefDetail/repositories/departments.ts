import {AxiosResponse} from "axios";
import {Department} from "../../../entities/Department";
import {fetchDepartments} from "../services";

export const getDepartments = async (id: number): Promise<Department[]> => {
    const response: AxiosResponse = await fetchDepartments(id);
    return response.data.data.map((item: any) => {
        return {
            id: Number(item.id),
            name: item.name
        }
    })
}