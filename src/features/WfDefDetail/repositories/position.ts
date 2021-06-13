import {AxiosResponse} from "axios";
import {Position} from "../../../entities/Position";
import {fetchPosition} from "../services";

export const getPositions = async (): Promise<Position[]> => {
    const response: AxiosResponse = await fetchPosition();

    return response.data.data.map((item: any) => {
        return {
            id: Number(item.id),
            name: item.name,
            unique_in_dept: item.unique_in_dept === 1
        }
    });

}