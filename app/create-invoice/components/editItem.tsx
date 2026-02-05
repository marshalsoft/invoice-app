import BaseButton from "@/app/components/baseButton";
import BaseInput from "@/app/components/baseInput";
import BaseModal from "@/app/components/baseModal"
import { ReturnAllNumbers } from "@/app/includes/functions";
import { FormEvent, useState } from "react";
export interface formDataProps {
        description?:string;
        quantity?:string;
        amount?:string;
    }
export const EditComponent = ({onClose,onValue}:{onClose:()=>void;onValue:(form:formDataProps)=>void;})=>{
    const [formData,setFormData] = useState<formDataProps>({
        description:"",
        quantity:"",
        amount:"",
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
            <tr className="text-black flex gap-4">
                <td  className="w-[300px]">
                    <BaseInput 
                    name="description"
                    required
                    onValueChange={({value})=>{
                    setFormData({
                          ...formData,
                          description:value  
                    })
                    }}
                    value={formData.description}
                    type="text"
                    />
                </td>
                <td className="w-[100px]">
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
                          quantity:value  
                    })
                    }}
                    value={ReturnAllNumbers(formData.quantity!)}
                    type="text"
                    />
                </td>
                <td className="w-[100px]">
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
                          amount:value  
                    })
                    }}
                    value={ReturnAllNumbers(formData.amount!)}
                    type="text"
                    />
                </td>
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