import React, {useEffect, useRef} from 'react';
import {Node} from "react-flow-renderer";
import {NodeItem} from "../../../../entities/Node";
import {setState} from "../../../../entities/SetState";
import useLocale from "../../../../hooks/useLocale";
import {useForm} from "react-hook-form";
import TabDef from "../TabDef";
import {Button, Form, Modal} from "react-bootstrap";
import {Tabs, Tab} from "react-bootstrap";
import {defineSelect} from "../../../../defines/select";
import TimeHelper from "../../../../utils/helper/time";
import TabAssign from "../TabAssign";
import useAssign from "../../hooks/useAssign";
import {WfDefDetailProvider} from "../../context";
import TabAttribute from "../TabAttribute";


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
    attribute_id: string
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

    }, [currentNode])


    const handleOnSubmit = (data: formDefData) => {
        updateCurrentNode(data);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (

        <Modal size={'lg'} show={isOpen} onHide={handleClose}>
            <Form onSubmit={handleSubmit(handleOnSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{trans('wf_def_detail.edit')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <WfDefDetailProvider
                        value={{
                            control: control,
                            watch: watch,
                            wfDefDetail: currentNode?.data?.def ?? null
                        }}>
                        <Tabs defaultActiveKey="attribute" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="def" title="Quy trình">
                                <TabDef
                                />
                            </Tab>
                            <Tab eventKey="assign" title="Bàn giao">
                                <TabAssign/>
                            </Tab>
                            <Tab eventKey="attribute" title="Giá trị">
                                <TabAttribute/>
                            </Tab>
                        </Tabs>
                    </WfDefDetailProvider>

                </Modal.Body>
                <Modal.Footer>
                    <Button className={'light'} onClick={handleClose} variant={'danger'}>
                        {trans('action.cancel')}
                    </Button>
                    <Button type={'submit'}>
                        {trans('action.save')}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    )
}

export default DialogNode;