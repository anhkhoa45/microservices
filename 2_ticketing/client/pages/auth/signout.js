import { useEffect } from 'react'
import Router from 'next/router'

import useRequest from '../../hooks/use-request'

const Signout =  () => {
    const { doRequest: doSingoutRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })

    useEffect(() => {
        doSingoutRequest()
    }, [])

    return (
        <div>Signing out ...</div>
    )
}

export default Signout