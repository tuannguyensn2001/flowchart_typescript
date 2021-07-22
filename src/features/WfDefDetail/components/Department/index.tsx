import React, {useContext, useMemo} from "react";
import WfDefDetailContext from "../../context";
import {useQuery} from "react-query";
import {Position as IPosition} from "../../../../entities/Position";
import {getPositions} from "../../repositories/position";
import {defineSelect} from "../../../../defines/select";
import {Controller} from "react-hook-form";
import {Form, Spinner} from "react-bootstrap";
import Select from "react-select";
import {Department as IDepartment} from "../../../../entities/Department";
import {getDepartments} from "../../repositories/departments";
import Skeleton from "react-loading-skeleton";
import {throws} from "assert";

function Department() {

    const {control, watch} = useContext(WfDefDetailContext);

    const watchPosition = !!watch ? watch('assign.position_id') : {
        value: null,
        label: null
    };

    const {
        data: departments,
        isLoading: isLoadingDepartment,
        isSuccess: isSuccessDepartment
    } = useQuery(['departments', watchPosition?.value], async (): Promise<IDepartment[]> => {
        return await getDepartments(Number(watchPosition?.value));
    }, {
        enabled: !!watchPosition?.value
    });

    const selectDepartments: defineSelect[] = useMemo(() => {
        return departments?.map(item => {
            return {
                value: item?.id + '' ?? '',
                label: item?.name ?? ''
            }
        }) || [];
    }, [departments])


    return (
        <>
            {isLoadingDepartment && <Skeleton height={'38px'}/>}

            {isSuccessDepartment && !!control && <Controller
                control={control}
                name={'assign.department_id'}
                render={({field}) => (
                    <Form.Group className="mb-3" controlId="actions">
                        <Form.Label>Chức vụ</Form.Label>
                        <Select
                            options={selectDepartments}
                            isSearchable={true}
                            {...field}
                            placeholder={'Chọn chức vụ'}
                        />
                    </Form.Group>
                )}
            />
            }
        </>
    )
}

export default Department;