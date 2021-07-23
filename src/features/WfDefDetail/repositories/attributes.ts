import {Attribute} from "../../../entities/Attribute";
import {AxiosResponse} from "axios";
import {fetchAttributes} from "../services";

export const getAttributes = async (): Promise<Attribute[]> => {
    const response: AxiosResponse = await fetchAttributes();

    return response.data.data.map((item: any) => {
        return {
            id: item?.id,
            name: item?.name,
            default_name: item?.default_name,
            editable: Number(item?.editable_default_name) === 1
        }
    })
}