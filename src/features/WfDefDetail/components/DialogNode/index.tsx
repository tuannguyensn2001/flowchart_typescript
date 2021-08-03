import React, {useEffect, useRef} from 'react';
import {Node} from "react-flow-renderer";
import {NodeItem} from "../../../../entities/Node";
import {setState} from "../../../../entities/SetState";
import useLocale from "../../../../hooks/useLocale";
import {useForm} from "react-hook-form";
import {defineSelect} from "../../../../defines/select";
import useAssign from "../../hooks/useAssign";
import {WfDefDetailProvider} from "../../context";
import {Modal} from "antd";
import {Tabs} from "antd";
import TabAttribute from "../TabAttribute";
import styled from "styled-components";


const {TabPane} = Tabs;

interface DialogNodeProp {
    isOpen: boolean,
    setIsOpen: setState<boolean>,
    currentNode: Node<NodeItem> | null,

    updateCurrentNode(data: formDefData): void,
}

interface AttributeItem {
    id: string,
    name: string,
    wf_def_detail_id: string,
    attribute_id: string,
    isDisabled: boolean
}

export interface formDefData {
    def: {
        name: string,
        actions: defineSelect[],
        time_process: string,
    },
    assign: {
        assignTo: defineSelect,
        position_id: defineSelect,
        department_id: defineSelect,
        team_or_department: string,
    },
    attributes: AttributeItem[]
}

const CustomModal = styled(Modal)`
  width: 800px !important;
`

function DialogNode({isOpen, setIsOpen, currentNode, updateCurrentNode}: DialogNodeProp) {

    const {trans} = useLocale();

    const form = useRef<HTMLFormElement>(null);

    const {assigns} = useAssign();

    const {control, handleSubmit, setValue, watch} = useForm<formDefData>();


    useEffect(() => {
        // setValue('def.name', currentNode?.data?.def.name || '');
        // setValue('def.actions', currentNode?.data?.def?.actions?.split('|')?.map(item => {
        //     return {
        //         value: item,
        //         label: item
        //     }
        // }) || []);
        //
        // if (!!currentNode?.data?.def?.time_process) {
        //     const timeHelper = new TimeHelper(currentNode?.data?.def?.time_process.toString());
        //     setValue('def.time_process', timeHelper.toString());
        // } else setValue('def.time_process', '');
        //
        // if (!!currentNode?.data?.def?.wf_def_object.assignTo) {
        //     const assign = currentNode?.data?.def?.wf_def_object.assignTo;
        //
        //     const value = assigns.find(item => item.value === assign);
        //
        //     if (!!value) setValue('assign.assignTo', value);
        // }


        if (Array.isArray(currentNode?.data?.def.attributes))
            setValue('attributes', currentNode?.data?.def.attributes ?? []);

    }, [currentNode]);


    const handleOnSubmit = (data: formDefData) => {
        updateCurrentNode(data);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (

        <CustomModal title="Quy trình" onOk={handleSubmit(handleOnSubmit)} onCancel={handleClose} visible={isOpen}>
            <WfDefDetailProvider
                value={{
                    setValue: setValue,
                    control: control,
                    watch: watch,
                    wfDefDetail: currentNode?.data?.def ?? null
                }}>

                <Tabs defaultActiveKey="3">
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Dữ liệu" key="3">
                        <TabAttribute/>
                    </TabPane>
                </Tabs>


            </WfDefDetailProvider>
        </CustomModal>

    )
}

export default DialogNode;