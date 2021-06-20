import {defineAssign, OptionForTeam} from "../defines/defineAssign";
import {OptionTeam} from "../defines/defineAssign";

export interface Location {
    x: number,
    y: number
}

export interface WfDefObject {
    assignTo: defineAssign,
    position: number,
    department: number,
    isAssign: any,
    user_id: number,
    team_id: number,
    is_lead_team: boolean,
    is_unique_dept: any,
    step_id: number
}

export interface WfDefDetail {
    id: number,
    description: string | null,
    name: string,
    wf_def_id: number,
    actions: string,
    time_process: number
    location: Location,
    state: string | null,
    auth: string | null,
    actionBy: string | null,
    created_at: string | null,
    updated_at: string | null,
    wf_def_object: WfDefObject
}

export declare interface WfDefDetailData {
    name: string | null,
    actions: string [] | [],
    time_process: string | null,
    wf_def_object: {
        assignTo: string | defineAssign | null;
        position_id: string | null,
        department_group_id: string | null,
        option_team: string | OptionTeam | null,
        team_id: string | null,
        option_for_team: OptionForTeam | null,
        user_id: string | null
    }
}