import { useState } from "react"

export default () => {
    const [formData, setFormData] = useState({ expiresIn: '2h' })
    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return { formData, onChange }
}