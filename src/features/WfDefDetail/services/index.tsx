import bookingAPI from "../../../network";
import {WfDefDetail} from "../../../entities/WfDefDetail";

export const fetchElements = (id: string): Promise<any> => {
    return bookingAPI.get(`/wf-defs/${id}`);
}