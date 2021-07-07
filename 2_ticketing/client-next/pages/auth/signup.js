import { useState } from 'react'
import Router from 'next/router'

import useRequest from '../../hooks/use-request'

const Signup =  () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest: doSingupRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        await doSingupRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            {errors}
            <div className="form-group">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default Signup