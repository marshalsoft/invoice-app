import BaseButton from "@/app/components/baseButton";
import BaseInput from "@/app/components/baseInput";
import BaseModal from "@/app/components/baseModal"
import BaseSelect from "@/app/components/baseSelect";
import { ReturnAllNumbers } from "@/app/includes/functions";
import { FormEvent, useState } from "react";
export type ItemType = "item" | "section" | "subtotal";
export interface formDataProps {
        description?:string;
        quantity?:number;
        amount?:number;
        type:ItemType
    }
export const EditComponent = ({onClose,onValue}:{onClose:()=>void;onValue:(form:formDataProps)=>void;})=>{
    const [formData,setFormData] = useState<formDataProps>({
        description:"",
        quantity:0,
        amount:0,
        type:"item"
    })
    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault();
        onValue(formData)
    }
    return <BaseModal 
    title="Add new item"
    onClose={onClose}
    type="md"
    >
    <form
    onSubmit={handleSubmit}
    >
    <table>
        <thead >
            <tr className="text-black flex gap-4">
                <td className="w-[300px]">Description</td>
                <td className="w-[100px]">Quantity</td>
                <td className="w-[100px]">Amount</td>
                <td className="w-[100px]"></td>
            </tr>
        </thead>
        <tbody >
            <tr className="text-black ">
                <td colSpan={2}
                className="pb-5"
                >
                    <BaseSelect 
                    list={[
                        {title:"Item",value:"item",name:"item"},
                        {title:"Section",value:"section",name:"section"},
                        {title:"Subtotal",value:"subtotal",name:"subtotal"}
                    ]}
                    name="type"
                    custom
                    onValueChange={(value)=>{
                    setFormData({
                          ...formData,
                          type:String(value.value) as ItemType
                    })
                    }}
                    value={formData.type}
                    >
                    </BaseSelect>
                </td>
            </tr>
            <tr className="text-black flex gap-4">
                <td  className="w-[300px]">
                    <BaseInput 
                    name="description"
                    required
                    onValueChange={({value})=>{
                        if(formData.type === "item")
                        {
                        return setFormData({
                          ...formData,
                          description:value  
                    })    
                        }
                    setFormData({
                          ...formData,
                          description:value,
                          amount:0,
                          quantity:0
                    })
                    }}
                    value={formData.description}
                    type="text"
                    />
                </td>
                {formData.type === "item" &&<td className="w-[100px]">
                     <BaseInput 
                    name="quantity"
                    required
                    onValueChange={({value})=>{
                         if(String(value) == "0")
                        {
                            value = "1";
                        }
                    setFormData({
                          ...formData,
                          quantity:parseFloat(value)
                    })
                    }}
                    value={ReturnAllNumbers(String(formData.quantity!))}
                    type="text"
                    />
                </td>}
                {formData.type === "item" &&<td className="w-[100px]">
                     <BaseInput 
                    name="amount"
                    required
                    onValueChange={({value})=>{
                        if(String(value) == "0")
                        {
                            value = "1";
                        }
                    setFormData({
                          ...formData,
                          amount:parseFloat(value) 
                    })
                    }}
                    value={ReturnAllNumbers(String(formData.amount!))}
                    type="text"
                    />
                </td>}
                <td className="w-[100px]">
                    <BaseButton 
                    text="Add"
                    onClick={()=>{
                       
                    }}
                    type="submit"
                    />
                </td>
            </tr>
        </tbody>
    </table>

    </form>
    </BaseModal>
}