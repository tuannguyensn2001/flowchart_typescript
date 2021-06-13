import {FormInstance} from "antd";
import React, {MutableRefObject} from 'react';
import {useQuery} from "react-query";
import {Department} from "../../../../entities/Department";
import {FieldData} from "../../../../entities/Field";
import {Position} from "../../../../entities/Position";
import {WfDefDetailData} from "../../../../entities/WfDefDetail";
import {Form, Select, Skeleton} from 'antd';
import {getDepartments} from "../../repositories/departments";
import {getPositions} from "../../repositories/position";

interface AssignPositionPropType {
    form: FormInstance,
    fields: FieldData[],
    wfDef: MutableRefObject<WfDefDetailData>
}

const {Option} = Select;


function AssignPosition({form, fields, wfDef}: AssignPositionPropType) {

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
    } = useQuery(['deparments', wfDef.current.position_id], async (): Promise<Department[]> => {
        return await getDepartments(Number(wfDef.current.position_id));
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
                <Form.Item
                    name={'department_group_id'}
                >
                    <Select>
                        {departments?.map((item) => (
                            <Option key={item.id} value={item.id + ''}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                }
            </React.Fragment>

            <React.Fragment>
                {positions?.find(item => item.id === Number(wfDef.current.position_id))?.unique_in_dept &&
                <p>Duy nhất</p>
                }
            </React.Fragment>


        </React.Fragment>
    )
}

export default AssignPosition;