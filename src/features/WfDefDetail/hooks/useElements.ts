import {useState} from "react";
import {Node} from "react-flow-renderer";
import {EdgeItem, NodeItem} from "../../../entities/Node";
import {useQuery} from "react-query";
import {WfDefDetail as WfDefDetailEntity} from "../../../entities/WfDefDetail";
import {convertFromWfDefConditionToConnection, convertFromWfDefDetailToElement, getElements} from "../repositories";
import {Edge} from "../../../entities/Node";
import {Elements, typeElements} from "../../../entities/Elements";


export default function useElements(id: string): typeElements {
    const [elements, setElements] = useState<Elements>([]);

    const {isLoading, isSuccess} = useQuery('elements', async (): Promise<WfDefDetailEntity[]> => {
        const {node: data, connection} = await getElements(id);

        const nodeConverted = convertFromWfDefDetailToElement(data);

        const edgeConverted = convertFromWfDefConditionToConnection(connection);

        setElements([...nodeConverted, ...edgeConverted]);

        return data;
    });


    return {
        elements,
        setElements,
        isLoading,
        isSuccess
    }


}
