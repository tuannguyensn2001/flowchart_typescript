import {defineAssign} from "../../../defines/defineAssign";

interface Assign {
    value: defineAssign,
    text: string,
}

interface typeAssign {
    assigns: Assign[]
}

export default function useAssign(): typeAssign {
    const assigns = [
        {
            value: defineAssign.POSITION,
            text: 'Dựa vào chức vụ'
        },
        {
            value: defineAssign.USER,
            text: 'Xác định nhân viên cụ thể'
        },
        {
            value: defineAssign.STEP,
            text: 'Người làm tại 1 bước'
        },
        {
            value: defineAssign.JOB,
            text: 'Người tạo ra job'
        },
        {
            value: defineAssign.JOB_DETAIL,
            text: 'Người tạo ra job detail'
        }
    ];

    return {
        assigns
    }
}