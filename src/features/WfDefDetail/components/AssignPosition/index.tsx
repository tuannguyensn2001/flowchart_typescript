import {FormInstance} from "antd";
import React, {MutableRefObject} from 'react';
import {useQuery} from "react-query";
import {OptionTeam} from "../../../../defines/defineAssign";
import {Department} from "../../../../entities/Department";
import {FieldData} from "../../../../entities/Field";
import {Position} from "../../../../entities/Position";
import {WfDefDetailData} from "../../../../entities/WfDefDetail";
import {Form, Select, Skeleton, Radio} from 'antd';
import {getDepartments} from "../../repositories/departments";
import {getPositions} from "../../repositories/position";

interface AssignPositionPropType {
    form: FormInstance,
    fields: FieldData[],
    wfDef: MutableRefObject<WfDefDetailData>,

    setData<Type>(name: string, value: Type): void
}

const {Option} = Select;


function AssignPosition({form, fields, wfDef, setData}: AssignPositionPropType) {

    const {
        data: positions,
        isLoading: isLoadingPosition,
        isSuccess: isSuccessPosition
    } = useQuery('positions', async (): Promise<Position[]> => {

        return await getPositions();
    });

    const {
        data: departments,
        isLoading: isLoadingDepartment,
        isSuccess: isSuccessDepartment,
    } = useQuery(['departments', wfDef.current.wf_def_object.position_id], async (): Promise<Department[]> => {
        if (wfDef.current.wf_def_object.position_id === null) throw new Error();
        setData('option_team', null);
        return await getDepartments(Number(wfDef.current.wf_def_object.position_id));
    })


    return (
        <React.Fragment>

            <React.Fragment>
                {isLoadingPosition && <Skeleton active/>}
                {isSuccessPosition &&
                <Form.Item
                    name={'position_id'}
                >
                    <Select>
                        {positions?.map((item) => (
                            <Option key={item.id} value={item.id + ''}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                }
            </React.Fragment>


            <React.Fragment>
                {isLoadingDepartment && <Skeleton/>}
                {isSuccessDepartment &&
                <React.Fragment>
                    <Form.Item
                        name={'department_group_id'}
                    >
                        <Select>
                            {departments?.map((item) => (
                                <Option key={item.id} value={item.id + ''}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name={'option_team'}
                    >

                        <Radio.Group>
                            {!positions?.find(item => item.id === Number(wfDef.current.wf_def_object.position_id))?.unique_in_dept &&
                            <Radio value={OptionTeam.TEAM}>Team</Radio>
                            }
                            <Radio value={OptionTeam.OTHER}>Khác</Radio>
                        </Radio.Group>
                    </Form.Item>
                </React.Fragment>
                }
            </React.Fragment>


        </React.Fragment>
    )
}

export default AssignPosition;