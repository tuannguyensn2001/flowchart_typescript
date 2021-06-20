import {Form, FormInstance, Radio, Select, Skeleton} from "antd";
import React, {useEffect} from 'react';
import {useQuery} from "react-query";
import {OptionForTeam, OptionTeam} from "../../../../defines/defineAssign";
import {Department} from "../../../../entities/Department";
import {FieldData} from "../../../../entities/Field";
import {Position} from "../../../../entities/Position";
import {WfDefDetailData} from "../../../../entities/WfDefDetail";
import {getDepartments} from "../../repositories/departments";
import {getPositions} from "../../repositories/position";
import {Team} from "../../../../entities/Team";
import {getTeams, getUserOfTeam} from "../../repositories/teams";
import {setState} from "../../../../entities/SetState";
import {FormGroup} from "../TabDef";

interface AssignPositionPropType {
    wfDef: WfDefDetailData,
    setWfDef: setState<WfDefDetailData>
}

const {Option} = Select;


function AssignPosition({wfDef, setWfDef}: AssignPositionPropType) {

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
    } = useQuery(['departments', wfDef.wf_def_object.position_id], async (): Promise<Department[]> => {
        return await getDepartments(Number(wfDef.wf_def_object.position_id));
    }, {
        // enabled: !!wfDef.wf_def_object.position_id
    })

    const {
        data: teams,
    } = useQuery(['teams', wfDef.wf_def_object.department_group_id], async (): Promise<Team[]> => {

        // setData('team_id', null);
        return await getTeams(Number(wfDef.wf_def_object.department_group_id));
    }, {
        enabled: !!wfDef.wf_def_object.department_group_id
    });

    const {
        data: userTeams
    } = useQuery(['users_teams', wfDef.wf_def_object.team_id], async () => {
        return await getUserOfTeam(Number(wfDef.wf_def_object.team_id));
    });


    useEffect(() => {
        // setData('department_group_id', null);
        // setData('option_team', null);
        // setData('team_id', null);
    }, [wfDef.wf_def_object.position_id]);


    useEffect(() => {
        const option_for_team: OptionForTeam | null = wfDef.wf_def_object.option_for_team;
        const clone = {...wfDef};

        if (option_for_team === OptionForTeam.LEADER) {
            clone.wf_def_object.user_id = !!userTeams?.leader ? String(userTeams?.leader) : null;
        } else if (option_for_team === OptionForTeam.ALL || option_for_team === OptionForTeam.USER) {
            clone.wf_def_object.user_id = null;
        }
        setWfDef(clone);

    }, [wfDef.wf_def_object.option_for_team]);

    const handleOnChange = (name: string, value: string) => {
        console.log('change');
        const wfDefClone = {...wfDef};
        switch (name) {
            case 'position_id' :
                wfDefClone.wf_def_object.position_id = value;
                break;
            case 'department_group_id':
                wfDefClone.wf_def_object.department_group_id = value;
                break;
            case 'option_team':
                wfDefClone.wf_def_object.option_team = value ?? null;
                break;
        }

        setWfDef(wfDefClone);
    }


    return (
        <React.Fragment>

            <React.Fragment>
                {isLoadingPosition && <Skeleton active/>}
                {isSuccessPosition &&
                <FormGroup>
                    <Select
                        value={wfDef.wf_def_object.position_id ?? undefined}
                        onChange={value => handleOnChange('position_id', value)}
                    >
                        {positions?.map((item) => (
                            <Option key={item.id} value={item.id + ''}>{item.name}</Option>
                        ))}
                    </Select>
                </FormGroup>
                }
            </React.Fragment>


            <FormGroup>
                <Select
                    value={wfDef.wf_def_object.department_group_id ?? undefined}
                    onChange={value => handleOnChange('department_group_id', value)}
                >
                    {departments?.map((item) => (
                        <Option key={item.id} value={item.id + ''}>{item.name}</Option>
                    ))}
                </Select>
            </FormGroup>


            <Radio.Group
                value={wfDef.wf_def_object.option_team}
                onChange={event => handleOnChange('option_team', event.target.value)}>
                {!positions?.find(item => item.id === Number(wfDef.wf_def_object.position_id))?.unique_in_dept &&
                <Radio value={OptionTeam.TEAM}>Team</Radio>
                }
                <Radio value={OptionTeam.OTHER}>Khác</Radio>
            </Radio.Group>

            {wfDef.wf_def_object.option_team === OptionTeam.TEAM &&
            <React.Fragment>

                <Select
                    placeholder={'Chọn team'}
                >
                    {teams?.map((item: Team) => (
                        <Option key={String(item.id)} value={item.id}>{item.name_team}</Option>
                    ))}
                </Select>

                {wfDef.wf_def_object.team_id !== null &&

                <React.Fragment>

                    <Radio.Group>
                        <Radio value={OptionForTeam.ALL}>Tất cả mọi người trong team</Radio>
                        <Radio value={OptionForTeam.LEADER}>Giao cho trưởng nhóm</Radio>
                        <Radio value={OptionForTeam.USER}>Chỉ định người trong team</Radio>
                    </Radio.Group>

                    {wfDef.wf_def_object.option_for_team === OptionForTeam.USER &&

                    <Select>
                        {userTeams?.users.map((item) => (
                            <Option value={String(item.id)}
                                    key={item.id}>{item.fullname + '-' + item.email}</Option>
                        ))}
                    </Select>

                    }
                </React.Fragment>


                }

            </React.Fragment>
            }

        </React.Fragment>
    )
}

export default AssignPosition;