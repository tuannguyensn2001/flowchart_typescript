export declare interface WfDefCondition {
    id: number,
    wf_def_detail_id: number,
    wf_def_detail_parent_id: number,
    wf_def_id: number,
    compare_name: string | null,
    compare_operator: string | null,
    compare_val: string | null,
    type: string | null,
    priority: string | null,
    created_at: string | null,
    updated_at: string | null,
    fwd_type: string | null,
    waiting_type: string | null,
    waiting_priority: string | null,
    connection?: boolean,
    style: {
        lineColor: string
    },
    checks: CheckCondition[],
    condition: string
}

export interface CheckCondition {
    alias: string,
    compare_name: string,
    compare_operator: string,
    compare_value: string,
    id: string,
    note: string,
    wf_def_condition_id: string,

}