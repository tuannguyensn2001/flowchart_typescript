import {defineAssign} from "../../../defines/defineAssign";
import {defineSelect} from "../../../defines/select";

interface Assign {
    value: defineAssign,
    text: string,
}

interface typeAssign {
    assigns: defineSelect[]
}

export default function useAssign(): typeAssign {
    const assigns: defineSelect[] = [
        {
            value: defineAssign.POSITION,
            label: 'Dựa vào chức vụ'
        },
        {
            value: defineAssign.USER,
            label: 'Xác định nhân viên cụ thể'
        },
        {
            value: defineAssign.STEP,
            label: 'Người làm tại 1 bước'
        },
        {
            value: defineAssign.JOB,
            label: 'Người tạo ra job'
        },
        {
            value: defineAssign.JOB_DETAIL,
            label: 'Người tạo ra job detail'
        }
    ];

    return {
        assigns
    }
}