import {Controller} from "react-hook-form";
import {Form} from "react-bootstrap";
import Select from "react-select";
import React, {useContext, useMemo} from "react";
import WfDefDetailContext from "../../context";
import {useQuery} from "react-query";
import {getPositions} from "../../repositories/position";
import {defineSelect} from "../../../../defines/select";
import {Position as IPosition} from "../../../../entities/Position";
import Skeleton from "react-loading-skeleton";

function Position() {

    const {control} = useContext(WfDefDetailContext);

    const {
        data: positions,
        isLoading: isLoadingPosition,
        isSuccess: isSuccessPosition
    } = useQuery('positions', async (): Promise<IPosition[]> => {
        return await getPositions();
    });

    const selectPosition: defineSelect[] = useMemo(() => {
        return positions?.map(item => {
            return {
                value: item?.id + '' ?? '',
                label: item?.name ?? ''
            }
        }) || [];
    }, [positions])

    return (
        <>
            {isLoadingPosition && <Skeleton height={'38px'}/>}

            {isSuccessPosition && !!control &&
            <Controller
                control={control}
                name={'assign.position_id'}
                render={({field}) => (
                    <Form.Group className="mb-3" controlId="actions">
                        <Form.Label>Chức vụ</Form.Label>
                        <Select
                            options={selectPosition}
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

export default Position;