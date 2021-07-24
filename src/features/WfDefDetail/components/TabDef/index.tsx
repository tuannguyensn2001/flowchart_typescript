// import {Controller} from "react-hook-form";
// import useAction from "../../hooks/useAction";
// import {Form} from "react-bootstrap";
// import Select, {ValueType} from 'react-select';
// import {defineSelect} from "../../../../defines/select";
// import {useContext} from "react";
// import WfDefDetailContext from "../../context";
//
// interface TabDefProp {
//
// }
//
//
// function TabDef() {
//
//     const {actions} = useAction();
//
//     const {control} = useContext(WfDefDetailContext);
//
//     return (
//         <>
//             {!!control &&
//             <div>
//                 <Controller
//                     name="def.name"
//                     control={control}
//                     render={({field}) =>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Tên</Form.Label>
//                             <Form.Control className={'input-default'} {...field} type="text" placeholder="Nhập tên"/>
//                         </Form.Group>
//                     }
//                 />
//
//                 <Controller
//                     name='def.actions'
//                     control={control}
//                     render={({field}) => {
//                         return <Form.Group className="mb-3" controlId="actions">
//                             <Form.Label>Hành động</Form.Label>
//                             <Select
//                                 {...field}
//                                 isSearchable={true}
//                                 placeholder={'Chọn hành động'}
//                                 isMulti
//                                 options={actions}/>
//                         </Form.Group>
//                     }
//                     }
//
//                 />
//
//                 <Controller
//                     name='def.time_process'
//                     control={control}
//                     render={({field}) => (
//
//                         <Form.Group className="mb-3" controlId="time_process">
//                             <Form.Label>Thời gian thực hiện</Form.Label>
//                             <Form.Control  {...field} type="text" placeholder="Thời gian"/>
//                         </Form.Group>
//                     )
//                     }
//                 />
//
//                 {/*<Controller*/
//                 }
//                 {/*    name="time_process"*/
//                 }
//                 {/*    control={control}*/
//                 }
//                 {/*    render={({field}) =>*/
//                 }
//                 {/*        <Form.Item*/
//                 }
//                 {/*            label={'Thời gian thực hiện'}*/
//                 }
//                 {/*        >*/
//                 }
//                 {/*            <Input {...field}/>*/
//                 }
//                 {/*        </Form.Item>*/
//                 }
//                 {/*    }*/
//                 }
//                 {/*/>*/
//                 }
//
//
//             </div>
//             }
//         </>
//     )
// }
//
// export default TabDef;

export default function TabDef() {
    return (
        <div>Tab Def</div>
    )
}