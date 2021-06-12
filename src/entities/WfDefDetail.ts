export interface Location {
    x: number,
    y: number
}

// export interface WfDefObject {
//     assignTo: string,
//     position: number,
//     department: number,
//     isAssign: any,
//     user_id: number,
//     team_id: number,
//     is_lead_team: boolean,
//     is_unique_dept: any,
//     step_id: number
// }

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
}