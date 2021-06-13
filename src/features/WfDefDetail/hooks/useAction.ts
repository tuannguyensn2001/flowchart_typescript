import {useState} from "react";

interface typeAction {
    actions: string[]
}

export default function useAction(): typeAction {
    const [actions] = useState([
        'APPROVE',
        'APPROVE_AUTO',
        'COMPLETE',
        'EXEC',
        'REJECT',
        'START'
    ]);

    return {actions};
}