import bookingAPI from "../../../network";
import {WfDefDetail} from "../../../entities/WfDefDetail";

export const fetchElements = (id: string): Promise<any> => {
    return bookingAPI.get(`/wf-defs/${id}`);
}

export const fetchPosition = (): Promise<any> => {
    return bookingAPI.get('/positions');
}

export const fetchDepartments = (id: number) => {
    return bookingAPI.get(`/departments?position=${id}`);
}