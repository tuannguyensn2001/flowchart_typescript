// import useAssign from "../../hooks/useAssign";
// import {Controller} from "react-hook-form";
// import {Form} from "react-bootstrap";
// import Select from "react-select";
// import {defineAssign} from "../../../../defines/defineAssign";
// import React, {useContext} from "react";
// import WfDefDetailContext from "../../context";
// import Position from "../Position";
// import Department from "../Department";
//
//
// function TabAssign() {
//
//     const {assigns} = useAssign();
//
//     const {control, watch} = useContext(WfDefDetailContext);
//
//     const watchAssignTo = !!watch ? watch('assign.assignTo') : {
//         value: null,
//         label: null
//     };
//
//     return (
//         <>
//             {!!control &&
//             <div>
//                 <Controller
//                     control={control}
//                     name={'assign.assignTo'}
//                     render={({field}) => {
//                         return <Form.Group className="mb-3" controlId="actions">
//                             <Form.Label>Bàn giao</Form.Label>
//                             <Select
//                                 {...field}
//                                 isSearchable={true}
//                                 placeholder={'Chọn bàn giao'}
//                                 options={assigns}/>
//                         </Form.Group>
//                     }
//                     }
//                 />
//
//                 {watchAssignTo?.value === defineAssign.POSITION &&
//                 <React.Fragment>
//                     <Position/>
//                     <Department/>
//
//
//                     <div>
//                         <Controller
//                             control={control}
//                             name={'assign.team_or_department'}
//                             render={() => (
//                                 <>
//                                     <div className="col">
//                                         <div className="custom-control custom-checkbox mb-3 checkbox-info">
//                                             <input type="checkbox" className="custom-control-input"
//                                                    id="customCheckBox2"
//                                                    required/>
//                                             <label className="custom-control-label" htmlFor="customCheckBox2">Checkbox
//                                                 2</label>
//                                         </div>
//                                     </div>
//
//                                 </>
//                             )}
//                         />
//                     </div>
//
//
//                 </React.Fragment>
//                 }
//             </div>
//             }
//         </>
//     )
// }
//
// export default TabAssign;

export default function TabAssign() {
    return (
        <div>tab assign</div>
    )
}