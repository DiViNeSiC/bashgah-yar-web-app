import React, { useContext } from 'react'
import { GlobalContext } from "../../Context/provider"
import useForm from './CustomHooks/useForm'
import useFormSet from './CustomHooks/useFormSet'

export default () => {
    const { onSelectForm, Form } = useFormSet()
    const { registersState: { registersMethods } } = useContext(GlobalContext)
    const { onChange, formValue, avatarHandler, gymPicsHandler, onRegisterNewAccount, adminGyms } = useForm()
    
    return (
        <div>
            {registersMethods && registersMethods.length > 1 && 
                <select onChange={onSelectForm}>        
                    {registersMethods && registersMethods.map(method => (
                        <option key={method.value} value={method.value}>{method.name}</option>
                    ))}
                </select>
            }
            {Form && <Form 
                onChange={onChange}
                formValue={formValue} 
                adminGyms={adminGyms}
                avatarHandler={avatarHandler}
                gymPicsHandler={gymPicsHandler}
                onSubmit={onRegisterNewAccount}
            />}
        </div>
    )
}