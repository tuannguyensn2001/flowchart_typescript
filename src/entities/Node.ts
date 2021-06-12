import {WfDefDetail, Location} from "./WfDefDetail";
import {Edge as EdgeParent} from "react-flow-renderer";
import {WfDefCondition} from "./WfDefCondition";


export declare interface NodeItem {
    label: string,
    def: WfDefDetail
}

export declare interface EdgeItem {

}

// @ts-ignore
export declare interface Edge<T = WfDefCondition> extends EdgeParent<T> {
    isThread?: boolean,
}
