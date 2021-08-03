import {Controller, FieldArrayWithId} from "react-hook-form";
import {Button, Input, Select} from "antd";
import styled from "styled-components";
import {defineSelect} from "../../../../defines/select";
import {useContext, useEffect} from "react";
import WfDefDetailContext from "../../context";
import {Attribute} from "../../../../entities/Attribute";

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

interface FormItemAttribute {
    item: FieldArrayWithId,
    index: number,
    attributesSelect: defineSelect[],
    handleRemoveField: (index: number) => void,
    attributes: Attribute[] | undefined
}

function FormItemAttribute({item, index, attributesSelect, handleRemoveField, attributes}: FormItemAttribute) {

    const {control, watch, setValue} = useContext(WfDefDetailContext);

    let watchAttribute: string | null = null;

    if (watch) {
        watchAttribute = watch(`attributes.${index}.attribute_id`);
    }

    useEffect(() => {
        const attribute: Attribute | undefined = attributes?.find(attribute => attribute.id === Number(watchAttribute));

        if (attribute?.default_name) {
            if (setValue) {
                setValue(`attributes.${index}.name`, attribute?.default_name ?? '');
                setValue(`attributes.${index}.isDisabled`, true);
                return;
            }
        }
        if (setValue) {
            // setValue(`attributes.${index}.name`, attribute?.name ?? '');
            setValue(`attributes.${index}.isDisabled`, false);
        }


    }, [watchAttribute, attributes])

    return (
        <AttributeItem key={item.id}>
            <Controller
                name={`attributes.${index}.attribute_id`}
                //@ts-ignore
                control={control}
                render={({field}) => {
                    return <Select showSearch
                                   optionFilterProp="children"
                                   value={field.value + ''}
                                   onChange={field.onChange}
                                   className={'select'}>
                        {attributesSelect.map(attribute => (
                            <Select.Option key={attribute.value}
                                           value={attribute.value + ''}>{attribute.label}</Select.Option>
                        ))}
                    </Select>
                }}/>

            <Controller
                name={`attributes.${index}.name`}
                // @ts-ignore
                control={control}
                render={({field}) => {

                    return <Input
                        disabled={watch ? watch(`attributes.${index}.isDisabled`) : false}
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
    )
}

export default FormItemAttribute;