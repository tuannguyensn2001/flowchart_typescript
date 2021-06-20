import {symlink} from "fs";
import {useState, useRef, useEffect, MutableRefObject} from "react";
import {Node} from "react-flow-renderer";
import {NodeItem} from "../../../entities/Node";
import {setState} from "../../../entities/SetState";
import TimeHelper from "../../../utils/helper/time";
import {FieldData} from "../../../entities/Field";
import {WfDefDetailData} from "../../../entities/WfDefDetail";


interface typeUseFields {
    wfDef: WfDefDetailData,
    setWfDef: setState<WfDefDetailData>

}


export default function useFields(currentNode: Node<NodeItem> | null): typeUseFields {
    const [fields, setFields] = useState<FieldData[]>([]);

    const [wfDef, setWfDef] = useState<WfDefDetailData>({
        name: null,
        actions: [],
        time_process: null,
        wf_def_object: {
            assignTo: null,
            position_id: null,
            department_group_id: null,
            option_team: null,
            team_id: null,
            option_for_team: null,
            user_id: null
        }
    });

    useEffect(() => {

        if (currentNode === null) return;

        const clone = {...wfDef};

        clone.name = currentNode?.data?.def?.name || null;
        clone.actions = currentNode?.data?.def?.actions.split('|') || [];
        clone.time_process = new TimeHelper(currentNode?.data?.def.time_process + '').toString();
        clone.wf_def_object.assignTo = currentNode?.data?.def.wf_def_object.assignTo || null;
        clone.wf_def_object.position_id = !!(currentNode.data?.def.wf_def_object.position) ? String(currentNode.data?.def.wf_def_object.position) : null;
        clone.wf_def_object.department_group_id = !!(currentNode.data?.def.wf_def_object.department) ? String(currentNode.data?.def.wf_def_object.department) : null;
        clone.wf_def_object.team_id = !!(currentNode.data?.def.wf_def_object.team_id) ? String(currentNode.data.def.wf_def_object.team_id) : null;
        clone.wf_def_object.user_id = !!(currentNode.data?.def.wf_def_object.user_id) ? String(currentNode.data.def.wf_def_object.user_id) : null;

        setWfDef(clone);

    }, [currentNode]);


    return {
        wfDef,
        setWfDef
    }
}