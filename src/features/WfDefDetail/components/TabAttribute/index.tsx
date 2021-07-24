import {useQuery} from "react-query";
import {Attribute} from "../../../../entities/Attribute";
import {getAttributes} from "../../repositories/attributes";
import {useContext, useMemo} from "react";
import WfDefDetailContext from "../../context";
import {Controller, useFieldArray} from "react-hook-form";
import {defineSelect} from "../../../../defines/select";

import styled from "styled-components";
import {Button, Input, Select} from "antd";


const AttributeItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;

  .select {
    width: 50%;
  }

  .input {
    width: 50%;
  }

  button {

  }

`


function TabAttribute() {

    const {data: attributes} = useQuery<Attribute[]>('attributes', async () => {
        return await getAttributes();
    });

    const {control, wfDefDetail, watch} = useContext(WfDefDetailContext);

    const watchFields = watch ? watch('attributes') : null;


    const attributesSelect: defineSelect[] = useMemo((): defineSelect[] => {
        if (!attributes) return [];


        const selected = watchFields ? watchFields.map(item => item.attribute_id) : []


        return attributes.map(item => {
            return {
                value: item?.id + '',
                label: item?.name,
                isDisabled: selected?.includes(item?.id + '')
            }
        });
    }, [attributes, watchFields])


    const {fields, prepend, remove} = useFieldArray({
        // @ts-ignore
        control,
        name: 'attributes'
    });


    const handleAddFields = () => {
        prepend({
            id: `fake_id_${fields.length + 1}`,
            name: '',
            wf_def_detail_id: wfDefDetail?.id + '',
            attribute_id: ''
        })
    }

    const handleRemoveField = (index: number) => {
        remove(index);
    }


    return (
        <div>
            <Button
                type={'primary'}
                onClick={handleAddFields}
            >
                Thêm mới
            </Button>
            {fields.map((item, index) => (
                <AttributeItem key={item.id}>
                    <Controller
                        name={`attributes.${index}.attribute_id`}
                        //@ts-ignore
                        control={control}
                        render={({field}) => {
                            return <Select showSearch
                                           optionFilterProp="children"
                                           value={field.value}
                                           onChange={field.onChange}
                                           className={'select'}>
                                {attributesSelect.map(attribute => (
                                    <Select.Option key={attribute.value}
                                                   value={attribute.value}>{attribute.label}</Select.Option>
                                ))}
                            </Select>
                        }}/>

                    <Controller
                        name={`attributes.${index}.name`}
                        // @ts-ignore
                        control={control}
                        render={({field}) => {

                            let defaultValue: string = '';
                            let disabled: boolean = false;

                            if (!!watchFields) {
                                const attribute: Attribute | undefined = attributes?.find(attribute => attribute.id === Number(watchFields[index].attribute_id));

                                defaultValue = !!attribute && !defaultValue ? attribute.default_name : '';

                                // disabled = !!attribute ? !attribute.editable : false;
                                disabled = !!defaultValue;
                            }

                            return <Input
                                value={field.value}
                                onChange={field.onChange}
                                className={'input'} type="text"
                                placeholder={'Nhập tên'}/>
                        }}
                    />

                    <Button type={'primary'} onClick={() => handleRemoveField(index)}>
                        Xóa
                    </Button>
                </AttributeItem>
            ))}
        </div>
    )
}

export default TabAttribute;