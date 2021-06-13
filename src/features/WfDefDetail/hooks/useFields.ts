import {useState, useRef, useEffect, MutableRefObject} from "react";
import {Node} from "react-flow-renderer";
import {NodeItem} from "../../../entities/Node";
import {setState} from "../../../entities/SetState";
import TimeHelper from "../../../utils/helper/time";
import {FieldData} from "../../../entities/Field";
import {WfDefDetailData} from "../../../entities/WfDefDetail";

interface typeUseFields {
    fields: FieldData[],
    setFields: setState<FieldData[]>,
    wfDef: MutableRefObject<WfDefDetailData>
}

export default function useFields(currentNode: Node<NodeItem> | null): typeUseFields {
    const [fields, setFields] = useState<FieldData[]>([]);

    const wfDef = useRef<WfDefDetailData>({
        name: null,
        actions: [],
        time_process: null,
        assignTo: null,
        position_id: null,
        department_group_id: null
    });

    useEffect(() => {

        if (currentNode === null) return;

        wfDef.current.name = currentNode?.data?.def?.name || null;
        wfDef.current.actions = currentNode?.data?.def?.actions.split('|') || [];
        wfDef.current.time_process = new TimeHelper(currentNode?.data?.def.time_process + '').toString();
        wfDef.current.assignTo = currentNode?.data?.def.wf_def_object.assignTo || null;
        wfDef.current.position_id = currentNode.data?.def.wf_def_object.position + '' || null;
        wfDef.current.department_group_id = currentNode.data?.def.wf_def_object.department + '' || null;

        setFields([
            {
                name: ['name'],
                value: wfDef.current.name
            },
            {
                name: ['actions'],
                value: wfDef.current.actions
            },
            {
                name: ['time_process'],
                value: wfDef.current.time_process
            },
            {
                name: ['assignTo'],
                value: wfDef.current.assignTo
            },
            {
                name: ['position_id'],
                value: wfDef.current.position_id
            },
            {
                name: ['department_group_id'],
                value: wfDef.current.department_group_id
            }
        ]);


    }, [currentNode]);

    return {
        fields,
        wfDef,
        setFields
    }
}