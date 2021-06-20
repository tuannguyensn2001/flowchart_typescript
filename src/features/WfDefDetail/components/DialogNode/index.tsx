import {Modal, Form, Input, Select, FormInstance} from "antd";
import React, {useState} from 'react';
import {Node} from "react-flow-renderer";
import {defineAssign} from "../../../../defines/defineAssign";
import {NodeItem} from "../../../../entities/Node";
import {setState} from "../../../../entities/SetState";
import useLocale from "../../../../hooks/useLocale";
import useAction from "../../hooks/useAction";
import useAssign from "../../hooks/useAssign";
import useFields from "../../hooks/useFields";
import AssignPosition from "../AssignPosition";
import {Tabs} from "antd";
import TabDef from "../TabDef";
import TabAssign from "../TabAssign";

const {TabPane} = Tabs;

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

    const {wfDef, setWfDef} = useFields(currentNode);


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

                <Tabs defaultActiveKey={'2'}>
                    <TabPane
                        tab={"Quy trình"}
                        key={'1'}
                    >

                        <TabDef
                            wfDef={wfDef}
                            setWfDef={setWfDef}
                        />


                    </TabPane>

                    <TabPane
                        key={'2'}
                        tab={'Bàn giao'}
                    >
                        <TabAssign
                            wfDef={wfDef}
                            setWfDef={setWfDef}
                        />
                    </TabPane>
                </Tabs>

            </div>
        </Modal>
    )
}

export default DialogNode;