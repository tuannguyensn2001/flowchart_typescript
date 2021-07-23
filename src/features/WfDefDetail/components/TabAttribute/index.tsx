import {useQuery} from "react-query";
import {Attribute} from "../../../../entities/Attribute";
import {getAttributes} from "../../repositories/attributes";
import {useContext, useMemo} from "react";
import WfDefDetailContext from "../../context";
import {useFieldArray} from "react-hook-form";
import {Fragment} from "react";
import {Controller} from "react-hook-form";
import Select from 'react-select'
import {defineSelect} from "../../../../defines/select";
import {Button, Form} from "react-bootstrap";
import styled from "styled-components";
import {ImPlus} from "react-icons/all";
import {ImMinus} from "react-icons/all";


const AttributeItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

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
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button size='sm'
                            className={'btn-flat'}
                            onClick={handleAddFields}
                    >
                        <ImPlus/>
                    </Button>
                </div>
                {fields.map((item, index) => (
                    <div style={{marginTop: '20px'}} key={item.id}>
                        <AttributeItem>
                            <Controller
                                name={`attributes.${index}.attribute_id`}
                                // @ts-ignore
                                control={control}
                                render={({field, fieldState, formState,}) => {

                                    const value = attributesSelect.find(item => item.value === field.value);

                                    const handleChange = (data: any) => {
                                        field.onChange(data?.value);
                                    };

                                    return <Select
                                        isSearchable={true}
                                        className={'select'}
                                        onChange={handleChange}
                                        value={value}
                                        placeholder={'Chọn thuộc tính'}
                                        options={attributesSelect}/>

                                }}
                            />

                            <Controller
                                name={`attributes.${index}.name`}
                                // @ts-ignore
                                control={control}
                                render={({field}) => {

                                    let defaultValue: string = '';
                                    let disabled: boolean = false;

                                    if (!!watchFields) {
                                        const attribute: Attribute | undefined = attributes?.find(attribute => attribute.id === Number(watchFields[index].attribute_id));

                                        defaultValue = !!attribute ? attribute.default_name : '';

                                        disabled = !!attribute ? !attribute.editable : false;

                                    }

                                    return <Form.Control
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                        defaultValue={defaultValue}
                                        className={'input'} type="text"
                                        placeholder={'Nhập tên'}/>
                                }}
                            />
                            <Button onClick={() => handleRemoveField(index)}
                                    className={'btn-flat'}
                                    size={'sm'}><ImMinus/></Button>

                        </AttributeItem>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default TabAttribute;