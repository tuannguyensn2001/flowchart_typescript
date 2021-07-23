import React from "react";
import {Control, UseFormWatch} from "react-hook-form";
import {formDefData} from "../components/DialogNode";
import {WfDefDetail} from "../../../entities/WfDefDetail";


interface WfDefDetailContextProp {
    control: Control<formDefData> | null,
    watch: UseFormWatch<formDefData> | null,
    wfDefDetail: WfDefDetail | null,
}


const WfDefDetailContext = React.createContext<WfDefDetailContextProp>({
    control: null,
    watch: null,
    wfDefDetail: null
});


export const WfDefDetailProvider = WfDefDetailContext.Provider;
export const WfDefDetailConsumer = WfDefDetailContext.Consumer;
export default WfDefDetailContext;