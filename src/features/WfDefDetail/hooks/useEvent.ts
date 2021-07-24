import {MouseEventHandler, MutableRefObject, useRef, useState} from "react";
import {Node, Edge, Connection, ArrowHeadType, addEdge, isNode, isEdge} from "react-flow-renderer";
import {Elements} from "../../../entities/Elements";
import {NodeItem} from "../../../entities/Node";
import {setState} from "../../../entities/SetState";
import {formDefData} from "../components/DialogNode";
import {WfDefDetail} from "../../../entities/WfDefDetail";
import {WfDefCondition} from "../../../entities/WfDefCondition";
import {fetchSave} from "../services";
import {useParams} from "react-router-dom";
import {Modal, notification} from "antd";
import {formConditionData} from "../components/DialogEdge";

interface typeEvent {
    handleDoubleClick(event: any, element: Node): void,

    currentNode: Node<NodeItem> | null,

    onConnect(connection: Edge | Connection): void,

    addNode(): void,

    updateCurrentNode(data: formDefData): void,

    updateCurrentEdge(data: formConditionData): void,

    save(): void,

    handleDoubleClickElement(event: MouseEvent): void,

    handleOnElementClick(event: any, element: Node | Edge): void;

    currentEdge: MutableRefObject<Edge | null>

}


export default function useEvent(
    elements: Elements,
    setIsOpenNode: setState<boolean>,
    setIsOpenEdge: setState<boolean>,
    setElements: setState<Elements>
): typeEvent {

    const [currentNode, setCurrentNode] = useState<Node<NodeItem> | null>(null);

    const {id}: { id: string } = useParams();

    const currentEdge = useRef<Edge | null>(null);

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

    const updateCurrentEdge = (data: formConditionData) => {
        const checks = data.checks.map(item => {
            if (!item.wf_def_condition_id) item.wf_def_condition_id = currentEdge.current?.data.id;
            return {
                ...item,
            }
        });

        const index = elements.findIndex(item => isEdge(item) && item?.data?.id === currentEdge.current?.data.id);

        const clone = [...elements];

        if (index === -1) return;

        if (isEdge(clone[index])) {
            // @ts-ignore
            clone[index].data.checks = checks;
            // @ts-ignore
            clone[index].data.condition = data.condition;
        }

        setElements(clone);
        setIsOpenEdge(false);

    }

    const save = () => {

        function handleOk() {
            const node: WfDefDetail[] = elements.filter(item => isNode(item)).map(item => {
                //@ts-ignore
                return item?.data?.def;
            });

            //@ts-ignore
            const connection: Edge[] = elements.filter(item => isEdge(item));

            fetchSave(id, {node, connection})
                .then(response => {
                    notification['success']({
                        message: 'Lưu thành công',
                        placement: 'bottomLeft'
                    })
                })
                .catch(err => {
                    notification['error']({
                        message: err.message,
                        placement: 'bottomLeft'
                    })
                });
        }

        Modal.confirm({
            content: 'Dữ liệu sẽ được lưu vào hệ thống. Bạn chắc chắn muốn lưu ?',
            onOk() {
                handleOk();
            },
            onCancel() {
                console.log('cancel');
            }
        });


    }

    const handleDoubleClickElement = (event: MouseEvent): void => {
        if (!currentEdge.current) return;

        setIsOpenEdge(true);
    }

    const handleOnElementClick = (event: any, element: Node | Edge) => {
        if (isEdge(element)) currentEdge.current = element;
        else currentEdge.current = null;
    }


    return {
        handleDoubleClick,
        currentNode,
        onConnect,
        addNode,
        updateCurrentNode,
        save,
        handleDoubleClickElement,
        handleOnElementClick,
        currentEdge,
        updateCurrentEdge
    }
}