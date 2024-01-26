import { Chip } from "@mui/material";

export interface IGenericChipListProps<T extends object>{
    list: Array<T>,
    icon: JSX.Element
    getLabel: (element:T)=>string,
    onDelete?: (elementToDelete:T)=>void,
    testId: (elem: T) => string
}

export const GenericChipList = <T extends object>(props:IGenericChipListProps<T>) => {

    return <>
        {props.list.map<JSX.Element>((element:T,index:number)=>{
            const commonChipProps = {
                key:index,
                icon:props.icon,
                label:props.getLabel(element),
                onDelete: props.onDelete!==undefined ? ()=>props.onDelete!(element) : undefined
            }
            return <Chip data-testId={props.testId(element)} {...commonChipProps} role="chip"/>
        })}
    </>
}