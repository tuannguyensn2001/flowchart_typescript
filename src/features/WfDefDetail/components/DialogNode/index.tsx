import {Modal, Form, Input, Select, FormInstance} from "antd";
import React from 'react';
import {Node} from "react-flow-renderer";
import {defineAssign} from "../../../../defines/defineAssign";
import {NodeItem} from "../../../../entities/Node";
import {setState} from "../../../../entities/SetState";
import useLocale from "../../../../hooks/useLocale";
import useAction from "../../hooks/useAction";
import useAssign from "../../hooks/useAssign";
import useFields from "../../hooks/useFields";
import AssignPosition from "../AssignPosition";


interface DialogNodeProp {
    isOpen: boolean,
    setIsOpen: setState<boolean>,
    currentNode: Node<NodeItem> | null
}


interface WfDef {
    name?: string | null | any,
    actions?: string[] | [],
    time_process?: string | null,
    assignTo?: string | null
}

const {Option} = Select;

function DialogNode({isOpen, setIsOpen, currentNode}: DialogNodeProp) {

    const [form]: [form: FormInstance] = Form.useForm();
    const {trans} = useLocale();

    const {fields, setFields, wfDef, setData} = useFields(currentNode);

    const {assigns} = useAssign();

    const {actions} = useAction();

    const onFieldsChange = (changeFields: any, allFields: any) => {

        const [fields] = changeFields;
        const [name] = fields.name;


        const outside = ['name', 'actions', 'time_process'];
        if (!outside.includes(name)) {
            // @ts-ignore
            wfDef.current.wf_def_object[name] = fields.value;
        } else {
            // @ts-ignore
            wfDef.current[name] = fields.value;
        }


        setFields(allFields);
    }


    return (
        <Modal
            maskClosable={false}
            okText={trans('action.save')}
            cancelText={trans('action.cancel')}
            // width={500}
            title={trans('wf_def_detail.edit')}
            onCancel={() => setIsOpen(false)}
            visible={isOpen}>
            <div>
                <Form
                    onFieldsChange={onFieldsChange}
                    fields={fields}
                    form={form}
                    layout={'vertical'}
                >

                    <Form.Item
                        name={'name'}
                        label={trans('wf_def_detail.name')}
                    >

                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={'actions'}
                        label={trans('wf_def_detail.actions')}
                    >

                        <Select
                            placeholder={trans('wf_def_detail.choose_actions')}
                            showSearch
                            mode={'multiple'}
                        >
                            {actions.map((action: string) => (
                                <Option value={action} key={action}>{action}</Option>
                            ))}
                        </Select>

                    </Form.Item>

                    <Form.Item
                        name={'time_process'}
                        label={trans('wf_def_detail.time_process')}
                    >
                        <Input/>

                    </Form.Item>

                    <Form.Item
                        name={'assignTo'}
                        label={trans('wf_def_detail.assignTo')}
                    >

                        <Select
                            allowClear={true}
                            showSearch
                            placeholder={trans('wf_def_detail.assignTo')}
                        >
                            {assigns.map(item => (
                                <Option key={item.value} value={item.value}>{item.text}</Option>
                            ))}

                        </Select>

                    </Form.Item>

                    {wfDef.current.wf_def_object.assignTo === defineAssign.POSITION &&
                    <AssignPosition
                        form={form}
                        fields={fields}
                        wfDef={wfDef}
                        setData={setData}
                    />
                    }


                </Form>
            </div>
        </Modal>
    )
}

export default DialogNode;