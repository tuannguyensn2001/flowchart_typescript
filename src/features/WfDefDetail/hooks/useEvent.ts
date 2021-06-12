import {Elements, ElementsItem} from "../../../entities/Elements";
import {isNode, Node} from "react-flow-renderer";
import {useState} from "react";
import {NodeItem} from "../../../entities/Node";
import {setState} from "../../../entities/SetState";

interface typeEvent {
    handleDoubleClick(event: any): void,

    currentNode: Node<NodeItem> | null,
}


export default function useEvent(elements: Elements, setIsOpenNode: setState<boolean>): typeEvent {

    const [currentNode, setCurrentNode] = useState<Node<NodeItem> | null>(null);

    const handleDoubleClick = (event: any): void => {
        const {id} = event?.target?.dataset;

        const node: ElementsItem | undefined = elements.find((item: ElementsItem): boolean => item.id === id);

        if (!node) return;


        if (isNode(node)) {
            setCurrentNode(node);
            setIsOpenNode(true);
        }
    }

    return {
        handleDoubleClick,
        currentNode
    }
}