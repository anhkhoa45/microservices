import axios from 'axios'
import { useState } from 'react'

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {
        setErrors(null)
        try {
            const response = await axios[method](url, body)

            if(onSuccess) {
                onSuccess()
            }

            return response.data
        } catch (e) {
            setErrors(
                <div className="alert alert-danger">
                    <ul className="my-0">
                        {e.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            )
        }
    }

    return { doRequest, errors }
}

export default useRequest
