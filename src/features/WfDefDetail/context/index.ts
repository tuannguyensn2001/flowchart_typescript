import React from "react";
import {Control, UseFormWatch} from "react-hook-form";
import {formDefData} from "../components/DialogNode";


interface WfDefDetailContextProp {
    control: Control<formDefData> | null,
    watch: UseFormWatch<formDefData> | null,
}


const WfDefDetailContext = React.createContext<WfDefDetailContextProp>({
    control: null,
    watch: null
});


export const WfDefDetailProvider = WfDefDetailContext.Provider;
export const WfDefDetailConsumer = WfDefDetailContext.Consumer;
export default WfDefDetailContext;