import {Affix, Button, Checkbox, Collapse, Input, Modal, Radio, Select, Tabs} from "antd";
import {setState} from "../../../../entities/SetState";
import {Edge, isNode} from "react-flow-renderer";
import {MutableRefObject, useEffect, useState} from "react";
import {CheckCondition, WfDefCondition} from "../../../../entities/WfDefCondition";
import {useQuery} from "react-query";
import {getMappingAttribute} from "../../repositories/conditions";
import {MappingAttribute} from "../../../../entities/Attribute";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Panel} from "react-query/types/devtools/styledComponents";
import append from "react-hook-form/dist/utils/append";
import {Elements} from "../../../../entities/Elements";


interface DialogEdgeProp {
    isOpen: boolean,
    setIsOpen: setState<boolean>,
    currentEdge: MutableRefObject<Edge<WfDefCondition> | null>,
    elements: Elements,

    updateCurrentEdge(data: formConditionData): void
}

export interface formConditionData {
    checks: CheckCondition[],
    condition: string
}

const operator: string[] = ['=', '>', '<', 'equals'];


function DialogEdge({isOpen, setIsOpen, currentEdge, elements, updateCurrentEdge}: DialogEdgeProp) {

    const {data: mapping} = useQuery<{ mapping: MappingAttribute[], fields: { key: string, value: string }[] }>(['mapping', isOpen], async () => {

        if (!isOpen) throw new Error('không hiểu');

        return await getMappingAttribute(currentEdge?.current?.data?.id + '');
    }, {
        enabled: isOpen
    })

    const handleCancel = () => {
        setIsOpen(false);
    }

    const [title, setTitle] = useState<string>('');

    const {watch, handleSubmit, control, setValue} = useForm<formConditionData>();

    const {fields, prepend, remove} = useFieldArray({
        name: 'checks',
        control,
    });

    const submit = (data: formConditionData) => {
        updateCurrentEdge(data);
    }

    useEffect(() => {
        if (!currentEdge.current?.data?.checks) return;
        setValue('checks', currentEdge.current?.data?.checks.reverse());
        setValue('condition', currentEdge.current?.data.condition);

        const parent = elements.find(item => {
            if (!isNode(item)) return false;
            return item.data?.def.id === currentEdge?.current?.data?.wf_def_detail_parent_id;
        });
        const child = elements.find(item => {
            if (!isNode(item)) return false;
            return item.data?.def.id === currentEdge?.current?.data?.wf_def_detail_id;
        });

        if (!parent || !child) return;

        if (isNode(parent) && isNode(child)) {
            setTitle(`${parent.data?.def.name}-${child.data?.def.name}`);
        }


    }, [currentEdge.current]);

    const handleAddField = () => {
        prepend({
            compare_name: '',
            compare_operator: '',
            compare_value: '',
            alias: '',
            note: ''
        })
    }

    const handleRemoveField = (index: number) => remove(index);

    return (
        <Modal title={title} centered visible={isOpen} onOk={handleSubmit(submit)} onCancel={handleCancel}>
            <Tabs defaultActiveKey={'condition'}>
                <Tabs.TabPane tab={"Config"} key={'config'}>

                </Tabs.TabPane>


                <Tabs.TabPane tab={"Điều kiện"} key={'condition'}>


                    <div>
                        <Controller
                            name={'condition'}
                            control={control}
                            render={({field}) => (
                                <>
                                    <label>Điều kiện</label>
                                    <Input value={field.value} onChange={field.onChange}/>
                                </>
                            )}
                        />
                    </div>


                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={handleAddField} type={'primary'}>Thêm mới</Button>
                    </div>


                    <Collapse>
                        {fields.map((item, index) => (

                            <Collapse.Panel key={index} header={watch(`checks.${index}.note`)}>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button onClick={() => handleRemoveField(index)} type={'primary'}>Xóa</Button>
                                </div>
                                <div style={{marginTop: '20px'}} key={item.id}>
                                    <Controller
                                        control={control}
                                        name={`checks.${index}.compare_name`}
                                        render={({field}) => (
                                            <Select
                                                value={field.value}
                                                onChange={field.onChange}
                                                style={{width: '120px'}}>
                                                {mapping?.fields.map(item => (
                                                    <Select.Option value={item.key} key={item.key}>
                                                        {item.value}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name={`checks.${index}.compare_operator`}
                                        render={({field}) => (
                                            <Select
                                                value={field.value}
                                                onChange={field.onChange}
                                                style={{width: '60px'}}>
                                                {operator.map(item => (
                                                    <Select.Option value={item} key={item}>
                                                        {item}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name={`checks.${index}.compare_value`}
                                        render={({field}) => {

                                            const compare_name: string = watch(`checks.${index}.compare_name`);

                                            const mappingItem = mapping?.mapping.find(item => item.name === compare_name);

                                            if (mappingItem?.type === 'SELECT') {
                                                return <Select
                                                    value={Number(field.value)}
                                                    onChange={field.onChange}
                                                    style={{width: '100px'}}>
                                                    {mappingItem?.data.map(option => (
                                                        <Select.Option value={Number(option.key)}
                                                                       key={option.key}>{option.value}</Select.Option>
                                                    ))}
                                                </Select>
                                            }

                                            if (mappingItem?.type === 'RADIO') {
                                                return <Radio.Group
                                                    value={Number(field.value)}
                                                    onChange={field.onChange}>
                                                    {mappingItem?.data.map(option => (
                                                        <Radio value={Number(option.key)}
                                                               key={option.key}>{option.value}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            }

                                            if (mappingItem?.type === 'CHECKBOX') {
                                                return <Checkbox checked={Number(field.value) === 1}
                                                                 onChange={field.onChange}/>
                                            }

                                            // if (mappingItem?.type === '')

                                            return <Input value={field.value} onChange={field.onChange}/>
                                        }
                                        }/>

                                    <Controller
                                        control={control}
                                        name={`checks.${index}.alias`}
                                        render={({field}) => (
                                            <div>
                                                <label>Tên viết tắt</label>
                                                <Input value={field.value} onChange={field.onChange}/>
                                            </div>
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name={`checks.${index}.note`}
                                        render={({field}) => (
                                            <div>
                                                <label>Ghi chú</label>
                                                <Input value={field.value} onChange={field.onChange}/>
                                            </div>
                                        )}
                                    />

                                </div>
                            </Collapse.Panel>
                        ))}
                    </Collapse>


                </Tabs.TabPane>

            </Tabs>
        </Modal>
    )
}

export default DialogEdge;