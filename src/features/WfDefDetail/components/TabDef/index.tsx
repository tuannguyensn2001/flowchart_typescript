import {Form, Input, Select} from "antd";
import React, {ChangeEvent, SyntheticEvent} from "react";
import useLocale from "../../../../hooks/useLocale";
import styled from "styled-components";
import useAction from "../../hooks/useAction";
import {setState} from "../../../../entities/SetState";
import {WfDefDetailData} from "../../../../entities/WfDefDetail";

interface TabDefProp {
    wfDef: WfDefDetailData
    setWfDef: setState<WfDefDetailData>
}

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`


function TabDef({wfDef, setWfDef}: TabDefProp) {

    const {trans} = useLocale();

    const {actions: listActions} = useAction();

    const handleOnChange = (name: string, value: string | string[] | null) => {
        const wfDefClone = {...wfDef};

        switch (name) {
            case 'name' :
                if (!Array.isArray(value)) wfDefClone.name = value;
                break;

            case 'actions':
                if (Array.isArray(value)) wfDefClone.actions = value;
                break;

            case 'time_process':
                if (!Array.isArray(value)) wfDefClone.time_process = value;
                break;
        }

        setWfDef(wfDefClone);
    }


    return (
        <div>

            <FormGroup>
                <label htmlFor="name">Tên quy trình</label>
                <Input
                    onChange={event => handleOnChange('name', event.target.value)}
                    value={wfDef.name ?? ''}
                    id={'name'}
                />
            </FormGroup>


            <FormGroup>
                <label htmlFor="actions">Hành động</label>
                <Select
                    onChange={value => handleOnChange('actions', value)}
                    value={wfDef.actions}
                    id={'actions'}
                    placeholder={trans('wf_def_detail.choose_actions')}
                    showSearch
                    mode={'multiple'}
                >
                    {listActions.map((action: string) => (
                        <Select.Option value={action} key={action}>{action}</Select.Option>
                    ))}
                </Select>
            </FormGroup>


            <FormGroup>
                <label htmlFor="time_process">Thời gian</label>
                <Input
                    onChange={event => handleOnChange('time_process', event.target.value)}
                    id={'time_process'}
                    value={wfDef.time_process ?? ''}/>
            </FormGroup>


        </div>
    )
}

export default TabDef;