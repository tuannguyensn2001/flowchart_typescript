import React from 'react';
import {Modal} from "antd";
import {setState} from "../../../../entities/SetState";
import {Node} from "react-flow-renderer";
import {NodeItem} from "../../../../entities/Node";

interface DialogNodeProp {
    isOpen: boolean,
    setIsOpen: setState<boolean>,
    currentNode: Node<NodeItem> | null
}

function DialogNode({isOpen, setIsOpen, currentNode}: DialogNodeProp) {
    return (
        <Modal onCancel={() => setIsOpen(false)} visible={isOpen}>
            <p>{currentNode?.data?.def.name}</p>
        </Modal>
    )
}

export default DialogNode;