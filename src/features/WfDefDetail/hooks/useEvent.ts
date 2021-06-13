import {useState} from "react";
import {Node, Edge, Connection, ArrowHeadType, addEdge} from "react-flow-renderer";
import {Elements} from "../../../entities/Elements";
import {NodeItem} from "../../../entities/Node";
import {setState} from "../../../entities/SetState";

interface typeEvent {
    handleDoubleClick(event: any, element: Node): void,

    currentNode: Node<NodeItem> | null,

    onConnect(connection: Edge | Connection): void,
}


export default function useEvent(
    elements: Elements,
    setIsOpenNode: setState<boolean>,
    setElements: setState<Elements>
): typeEvent {

    const [currentNode, setCurrentNode] = useState<Node<NodeItem> | null>(null);

    const handleDoubleClick = (event: any, element: Node): void => {
        setCurrentNode(element);
        setIsOpenNode(true);
    }

    const onConnect = (connection: any): void => {
        const {source, target}: { source: string | null, target: string | null } = connection

        setElements(prevState => {
            connection.arrowHeadType = ArrowHeadType.Arrow;
            connection.type = 'step';

            return addEdge(connection, elements);
        })

    }

    return {
        handleDoubleClick,
        currentNode,
        onConnect,
    }
}