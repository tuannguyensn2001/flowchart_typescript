import React, {useState} from 'react';
import ReactFlow, {Background, BackgroundVariant, Controls, MiniMap, ReactFlowProvider} from "react-flow-renderer";
import style from "./styled";
import {useParams} from 'react-router-dom';
import useElements from "./hooks/useElements";
import useEvent from "./hooks/useEvent";
import DialogNode from "./components/DialogNode";
import {Button} from "react-bootstrap";

const {
    ReactFlowWrapper
} = style;


function WfDefDetail() {

    // const {trans} = useLocale();

    const [isOpenNode, setIsOpenNode] = useState<boolean>(false);

    const {id}: { id: string } = useParams();

    const {elements, setElements, isSuccess} = useElements(id);

    const {
        handleDoubleClick,
        currentNode,
        onConnect,
        addNode,
        updateCurrentNode,
        save
    } = useEvent(elements, setIsOpenNode, setElements);


    return (
        <div>

            <Button onClick={addNode}>Thêm mới</Button>

            <Button onClick={save}>Lưu</Button>

            {isSuccess &&
            <React.Fragment>
                <DialogNode
                    updateCurrentNode={updateCurrentNode}
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
                            <MiniMap
                                // nodeStrokeColor={(n) => {
                                //     if (n.style?.background) return n.style.background;
                                //     if (n.type === 'input') return '#0041d0';
                                //     if (n.type === 'output') return '#ff0072';
                                //     if (n.type === 'default') return '#1a192b';
                                //
                                //     return '#eee';
                                // }}
                                // nodeColor={(n) => {
                                //     if (n.style?.background) return n.style.background;
                                //
                                //     return '#fff';
                                // }}
                                nodeBorderRadius={3}
                            />
                            <Controls/>
                            <Background variant={BackgroundVariant.Lines}/>
                        </ReactFlow>
                    </ReactFlowProvider>
                </ReactFlowWrapper>
            </React.Fragment>
            }


        </div>
    )
}

export default WfDefDetail;