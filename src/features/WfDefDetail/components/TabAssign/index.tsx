import {Select} from "antd";
import React from "react";
import useLocale from "../../../../hooks/useLocale";
import useAssign from "../../hooks/useAssign";
import {FormGroup} from "../TabDef";
import {WfDefDetailData} from "../../../../entities/WfDefDetail";
import {setState} from "../../../../entities/SetState";
import {defineAssign} from "../../../../defines/defineAssign";
import AssignPosition from "../AssignPosition";


interface TabAssignProp {
    wfDef: WfDefDetailData
    setWfDef: setState<WfDefDetailData>
}

function TabAssign({wfDef, setWfDef}: TabAssignProp) {

    const {trans} = useLocale();

    const {assigns} = useAssign();

    const handleOnChange = (name: string, value: string) => {
        const wfDefClone = {...wfDef};
        switch (name) {
            case 'assignTo':
                wfDefClone.wf_def_object.assignTo = value;
                break;
        }
        setWfDef(wfDefClone);
    }


    return (
        <div>
            <FormGroup>
                <label htmlFor="assign_to">Chọn</label>
                <Select
                    onChange={value => handleOnChange('assignTo', value)}
                    value={wfDef.wf_def_object.assignTo ?? undefined}
                    id={'assign_to'}
                    allowClear={true}
                    showSearch
                    placeholder={trans('wf_def_detail.assignTo')}
                >
                    {assigns.map(item => (
                        <Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>
                    ))}

                </Select>
            </FormGroup>

            {wfDef.wf_def_object.assignTo === defineAssign.POSITION &&
            <AssignPosition wfDef={wfDef} setWfDef={setWfDef}/>}

        </div>


    )
}

export default TabAssign;