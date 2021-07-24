import {fetchElements} from "../services";
import {WfDefDetail} from "../../../entities/WfDefDetail";
import {AxiosResponse} from "axios";
import {ArrowHeadType, Node} from "react-flow-renderer";
import {WfDefCondition} from "../../../entities/WfDefCondition";
import {Edge} from "../../../entities/Node";


interface Flow {
    node: WfDefDetail[],
    connection: WfDefCondition[]
}

export const getElements = async (id: string): Promise<Flow> => {
    const response: AxiosResponse = await fetchElements(id);
    const node = response.data.node.map((item: any): WfDefDetail[] => {
        return {
            ...item,
            location: JSON.parse(item.location),
            wf_def_id: Number(item.wf_def_id),
            time_process: Number(item.time_process),

        }
    });

    const connection = response.data.connection.map((item: any): WfDefCondition => {
        return {
            ...item,
            wf_def_id: Number(item.wf_def_id),
            wf_def_detail_id: Number(item.wf_def_detail_id),
            wf_def_detail_parent_id: Number(item.wf_def_detail_parent_id)
        }
    });

    return {
        node,
        connection
    }
}

export const convertFromWfDefDetailToElement = (data: WfDefDetail[]): Node[] => {
    return data.map((item): Node => {
        return {
            id: item.id + '',
            data: {
                label: item.name,
                def: item,
            },
            position: item.location,
            style: {
                backgroundColor: item?.style?.backgroundColor || 'blue',
                border: 'none',
                color: item?.style?.color || '#fff'
            }
        }
    })
}

export const convertFromWfDefConditionToConnection = (data: WfDefCondition[]): Edge[] => {
    return data.map((item): Edge => {
        return {
            id: `${item.wf_def_detail_parent_id}-${item.wf_def_detail_id}`,
            source: item.wf_def_detail_parent_id + '',
            target: item.wf_def_detail_id + '',
            arrowHeadType: ArrowHeadType.Arrow,
            isThread: item.connection || false,
            data: item,
            type: 'step',
            style: {
                stroke: item?.style?.lineColor ?? '#b1b1b7'
            }
        }
    })
}