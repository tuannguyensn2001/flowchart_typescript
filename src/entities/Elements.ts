import {Node} from "react-flow-renderer";
import {Edge, NodeItem} from "./Node";

export declare type Elements = Array<Node<NodeItem> | Edge>;

export declare  type ElementsItem = Node<NodeItem> | Edge ;

export declare interface typeElements {
    elements: Elements,
    setElements: (value: (((prevState: Elements) => Elements) | Elements)) => void,
    isLoading: boolean,
    isSuccess: boolean,
}
