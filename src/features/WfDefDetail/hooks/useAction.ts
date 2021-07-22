import {useState} from "react";
import {defineSelect} from "../../../defines/select";


export default function useAction() {
    const [actions] = useState<defineSelect[]>([
        'APPROVE',
        'APPROVE_AUTO',
        'COMPLETE',
        'EXEC',
        'REJECT',
        'START'
    ].map(item => {
        return {
            value: item,
            label: item,
            // isDisabled: true
        }
    }))


    return {actions};
}