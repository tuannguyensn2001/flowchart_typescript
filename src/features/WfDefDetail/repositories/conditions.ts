import {AxiosResponse} from "axios";
import {fetchMappingAttribute} from "../services";
import {MappingAttribute} from "../../../entities/Attribute";

export const getMappingAttribute = async (wf_def_condition_id: string): Promise<{ mapping: MappingAttribute[], fields: { key: string, value: string }[] }> => {
    const response: AxiosResponse = await fetchMappingAttribute(wf_def_condition_id);

    // return response.data.data.map((item: any) => {
    //     return {
    //         name: item?.name,
    //         type: item?.type,
    //         data: item?.data
    //     }
    // })

    return {
        mapping: response.data.data.mapping.map((item: any) => {
            return {
                name: item?.name,
                type: item?.type,
                data: item?.data
            }
        }),
        fields: Array.from(new Set(response.data?.data.fields.map((item: any) => item.key))).map(item => {
            return response.data.data.fields.find((child: any) => child.key === item);
        })
    }

}