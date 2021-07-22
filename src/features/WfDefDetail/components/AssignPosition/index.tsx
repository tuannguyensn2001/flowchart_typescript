import React, {useEffect} from 'react';
import {useQuery} from "react-query";
import {OptionForTeam, OptionTeam} from "../../../../defines/defineAssign";
import {Department} from "../../../../entities/Department";
import {Position} from "../../../../entities/Position";
import {WfDefDetailData} from "../../../../entities/WfDefDetail";
import {getDepartments, getDepartmentUsers} from "../../repositories/departments";
import {getPositions} from "../../repositories/position";
import {Team} from "../../../../entities/Team";
import {getTeams, getUserOfTeam} from "../../repositories/teams";
import {setState} from "../../../../entities/SetState";

interface AssignPositionPropType {
    wfDef: WfDefDetailData,
    setWfDef: setState<WfDefDetailData>
}



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
        data: departmentUsers
    } = useQuery(['department_user', wfDef.wf_def_object.department_group_id], async () => {
        return await getDepartmentUsers(Number(wfDef.wf_def_object.department_group_id));
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
        const option_for_team: OptionForTeam | string | null = wfDef.wf_def_object.option_for_team;
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
            case 'team_id':
                wfDefClone.wf_def_object.team_id = value;
                break;
            case 'option_for_team':
                wfDefClone.wf_def_object.option_for_team = value;
                break;
            case 'user_id':
                wfDefClone.wf_def_object.user_id = value;
                break;

        }

        setWfDef(wfDefClone);
    }


    return (
        <React.Fragment>

            {/*<React.Fragment>*/}
            {/*    {isLoadingPosition && <Skeleton active/>}*/}
            {/*    {isSuccessPosition &&*/}
            {/*    <FormGroup*/}
            {/*    >*/}
            {/*        <Select*/}
            {/*            value={wfDef.wf_def_object.position_id ?? undefined}*/}
            {/*            onChange={value => handleOnChange('position_id', value)}*/}
            {/*        >*/}
            {/*            {positions?.map((item) => (*/}
            {/*                <Option key={item.id} value={item.id + ''}>{item.name}</Option>*/}
            {/*            ))}*/}
            {/*        </Select>*/}
            {/*    </FormGroup>*/}
            {/*    }*/}
            {/*</React.Fragment>*/}

            {/*<FormGroup>*/}
            {/*    <Select*/}
            {/*        value={wfDef.wf_def_object.department_group_id ?? undefined}*/}
            {/*        onChange={value => handleOnChange('department_group_id', value)}*/}
            {/*    >*/}
            {/*        {departments?.map((item) => (*/}
            {/*            <Option key={item.id} value={item.id + ''}>{item.name}</Option>*/}
            {/*        ))}*/}
            {/*    </Select>*/}
            {/*</FormGroup>*/}


            {/*{!positions?.find(item => item.id === Number(wfDef.wf_def_object.position_id))?.unique_in_dept*/}
            {/*&& !!wfDef.wf_def_object.position_id*/}
            {/*&& !!wfDef.wf_def_object.department_group_id*/}
            {/*&&*/}
            {/*<React.Fragment>*/}
            {/*    <Radio.Group*/}
            {/*        value={wfDef.wf_def_object.option_team}*/}
            {/*        onChange={event => handleOnChange('option_team', event.target.value)}>*/}
            {/*        {!positions?.find(item => item.id === Number(wfDef.wf_def_object.position_id))?.unique_in_dept &&*/}
            {/*        <Radio value={OptionTeam.TEAM}>Team</Radio>*/}
            {/*        }*/}
            {/*        <Radio value={OptionTeam.ALL}>Tất</Radio>*/}
            {/*        <Radio value={OptionTeam.USER}>Chỉ định</Radio>*/}
            {/*    </Radio.Group>*/}

            {/*    {wfDef.wf_def_object.option_team === OptionTeam.TEAM &&*/}
            {/*    <React.Fragment>*/}

            {/*        <FormGroup>*/}
            {/*            <Select*/}
            {/*                onChange={value => handleOnChange('team_id', value)}*/}
            {/*                placeholder={'Chọn team'}*/}
            {/*                value={wfDef.wf_def_object.team_id ?? undefined}*/}
            {/*            >*/}
            {/*                {teams?.map((item: Team) => (*/}
            {/*                    <Option key={String(item.id)} value={item.id}>{item.name_team}</Option>*/}
            {/*                ))}*/}
            {/*            </Select>*/}
            {/*        </FormGroup>*/}

            {/*        {wfDef.wf_def_object.team_id !== null &&*/}

            {/*        <React.Fragment>*/}

            {/*            <Radio.Group*/}
            {/*                value={wfDef.wf_def_object.option_for_team}*/}
            {/*                onChange={event => handleOnChange('option_for_team', event.target.value)}*/}
            {/*            >*/}
            {/*                <Radio value={OptionForTeam.ALL}>Tất cả mọi người trong team</Radio>*/}
            {/*                <Radio value={OptionForTeam.LEADER}>Giao cho trưởng nhóm</Radio>*/}
            {/*                <Radio value={OptionForTeam.USER}>Chỉ định người trong team</Radio>*/}
            {/*            </Radio.Group>*/}

            {/*            {wfDef.wf_def_object.option_for_team === OptionForTeam.USER &&*/}

            {/*            <FormGroup>*/}
            {/*                <Select*/}
            {/*                    value={wfDef.wf_def_object.user_id ?? undefined}*/}
            {/*                    onChange={value => handleOnChange('user_id', value)}*/}
            {/*                >*/}
            {/*                    {userTeams?.users.map((item) => (*/}
            {/*                        <Option value={String(item.id)}*/}
            {/*                                key={item.id}>{item.fullname + '-' + item.email}</Option>*/}
            {/*                    ))}*/}
            {/*                </Select>*/}
            {/*            </FormGroup>*/}

            {/*            }*/}
            {/*        </React.Fragment>*/}


            {/*        }*/}

            {/*    </React.Fragment>*/}
            {/*    }*/}

            {/*    {wfDef.wf_def_object.option_team === OptionTeam.USER &&*/}
            {/*    <FormGroup>*/}
            {/*        <Select*/}
            {/*            value={wfDef.wf_def_object.user_id ?? undefined}*/}
            {/*            onChange={value => handleOnChange('user_id', value)}*/}
            {/*        >*/}
            {/*            {departmentUsers?.map(item => (*/}
            {/*                <Select.Option key={item.id} value={item.id}>{item.fullname}</Select.Option>*/}
            {/*            ))}*/}
            {/*        </Select>*/}
            {/*    </FormGroup>*/}
            {/*    }*/}
            {/*</React.Fragment>*/}
            {/*}*/}

        </React.Fragment>
    )
}

export default AssignPosition;