import {useState} from "react";
import {Node, Edge, Connection, ArrowHeadType, addEdge, isNode, isEdge} from "react-flow-renderer";
import {Elements} from "../../../entities/Elements";
import {NodeItem} from "../../../entities/Node";
import {setState} from "../../../entities/SetState";
import {formDefData} from "../components/DialogNode";
import {WfDefDetail} from "../../../entities/WfDefDetail";
import {WfDefCondition} from "../../../entities/WfDefCondition";
import {fetchSave} from "../services";
import {useParams} from "react-router-dom";

interface typeEvent {
    handleDoubleClick(event: any, element: Node): void,

    currentNode: Node<NodeItem> | null,

    onConnect(connection: Edge | Connection): void,

    addNode(): void,

    updateCurrentNode(data: formDefData): void,

    save(): void
}


export default function useEvent(
    elements: Elements,
    setIsOpenNode: setState<boolean>,
    setElements: setState<Elements>
): typeEvent {

    const [currentNode, setCurrentNode] = useState<Node<NodeItem> | null>(null);

    const {id}: { id: string } = useParams();

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

    const addNode = () => {
        setCurrentNode(null);
        setIsOpenNode(true);
    }

    const updateCurrentNode = (data: formDefData) => {
        if (currentNode !== null) {
            const index = elements.findIndex(item => Number(item.id) === currentNode.data?.def.id);

            const clone = [...elements];

            if (isNode(clone[index])) {
                // @ts-ignore
                clone[index].data.def.attributes = data.attributes;

            }

            setElements(clone);
            setIsOpenNode(false);

        }
    }

    const save = () => {
        const node: WfDefDetail[] = elements.filter(item => isNode(item)).map(item => {
            //@ts-ignore
            return item?.data?.def;
        });

        //@ts-ignore
        const connection: Edge[] = elements.filter(item => isEdge(item));

        fetchSave(id, {node, connection})
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    }


    return {
        handleDoubleClick,
        currentNode,
        onConnect,
        addNode,
        updateCurrentNode,
        save
    }
}