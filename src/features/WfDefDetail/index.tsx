import React, {useState} from 'react';
import useLocale from "../../hooks/useLocale";
import ReactFlow, {ReactFlowProvider} from "react-flow-renderer";
import style from "./styled";
import {useParams} from 'react-router-dom';
import useElements from "./hooks/useElements";
import useEvent from "./hooks/useEvent";
import DialogNode from "./components/DialogNode";

const {
    ReactFlowWrapper
} = style;


function WfDefDetail() {

    // const {trans} = useLocale();

    const [isOpenNode, setIsOpenNode] = useState<boolean>(false);

    const {id}: { id: string } = useParams();

    const {elements} = useElements(id);

    const {handleDoubleClick, currentNode} = useEvent(elements, setIsOpenNode);


    return (
        <div
        >

            <DialogNode
                currentNode={currentNode}
                isOpen={isOpenNode}
                setIsOpen={setIsOpenNode}
            />

            <div>

            </div>

            <ReactFlowWrapper>
                <ReactFlowProvider>
                    <ReactFlow
                        elements={elements}
                        onDoubleClick={handleDoubleClick}

                    >
                    </ReactFlow>
                </ReactFlowProvider>
            </ReactFlowWrapper>


        </div>
    )
}

export default WfDefDetail;