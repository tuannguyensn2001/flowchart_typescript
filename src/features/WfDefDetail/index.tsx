import {Spin} from "antd";
import React, {useState} from 'react';
import useLocale from "../../hooks/useLocale";
import ReactFlow, {ReactFlowProvider} from "react-flow-renderer";
import TimeHelper from "../../utils/helper/time";
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

    const {elements, setElements, isLoading, isSuccess} = useElements(id);

    const {
        handleDoubleClick,
        currentNode,
        onConnect
    } = useEvent(elements, setIsOpenNode, setElements);


    return (
        <div>


            {isSuccess &&
            <React.Fragment>
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
                            onNodeDoubleClick={handleDoubleClick}
                            onConnect={onConnect}
                        >
                        </ReactFlow>
                    </ReactFlowProvider>
                </ReactFlowWrapper>
            </React.Fragment>
            }


        </div>
    )
}

export default WfDefDetail;