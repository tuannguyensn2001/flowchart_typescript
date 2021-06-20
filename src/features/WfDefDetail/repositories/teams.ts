import {Team} from "../../../entities/Team";
import {AxiosResponse} from "axios";
import {fetchTeams, fetchUserOfTeam} from "../services";
import {User} from "../../../entities/User";

export const getTeams = async (department_group_id: number): Promise<Team[]> => {
    const response: AxiosResponse = await fetchTeams(department_group_id);
    return response.data.data.map((item: any) => {
        return {
            id: Number(item.id),
            name_team: item.name_team,
        }
    })
}

type UserTeam = Pick<User, 'id' | 'fullname' | 'email'>;

type ResponseUserOfTeam = {
    users: UserTeam[],
    leader: number
}

export const getUserOfTeam = async (team_id: number): Promise<ResponseUserOfTeam> => {
    const response: AxiosResponse = await fetchUserOfTeam(team_id);

    const users: UserTeam[] = response.data.data.users.map((item: any) => {
        return {
            id: Number(item.id),
            fullname: item.fullname,
            email: item.email
        }
    });

    const leader = response.data.data.lead;

    return {
        users,
        leader
    }

}