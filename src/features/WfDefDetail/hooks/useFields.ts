import {symlink} from "fs";
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
    wfDef: MutableRefObject<WfDefDetailData>,

    setData<Type>(name: string, value: Type): void
}

export default function useFields(currentNode: Node<NodeItem> | null): typeUseFields {
    const [fields, setFields] = useState<FieldData[]>([]);

    const wfDef = useRef<WfDefDetailData>({
        name: null,
        actions: [],
        time_process: null,
        wf_def_object: {
            assignTo: null,
            position_id: null,
            department_group_id: null,
            option_team: null,
        }
    });

    useEffect(() => {

        if (currentNode === null) return;

        wfDef.current.name = currentNode?.data?.def?.name || null;
        wfDef.current.actions = currentNode?.data?.def?.actions.split('|') || [];
        wfDef.current.time_process = new TimeHelper(currentNode?.data?.def.time_process + '').toString();
        wfDef.current.wf_def_object.assignTo = currentNode?.data?.def.wf_def_object.assignTo || null;
        wfDef.current.wf_def_object.position_id = !!(currentNode.data?.def.wf_def_object.position) ? String(currentNode.data?.def.wf_def_object.position) : null;
        wfDef.current.wf_def_object.department_group_id = !!(currentNode.data?.def.wf_def_object.department) ? String(currentNode.data?.def.wf_def_object.department) : null;

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
                value: wfDef.current.wf_def_object.assignTo
            },
            {
                name: ['position_id'],
                value: wfDef.current.wf_def_object.position_id
            },
            {
                name: ['department_group_id'],
                value: wfDef.current.wf_def_object.department_group_id
            },
            {
                name: ['option_team'],
                value: wfDef.current.wf_def_object.option_team
            }
        ]);


    }, [currentNode]);

    const setData = <Type>(name: string, value: Type) => {
        const clone = [...fields];

        const index = clone.findIndex(item => item.name.includes(name));

        clone[index].value = value;

        setFields(clone);

    }

    return {
        fields,
        wfDef,
        setFields,
        setData
    }
}