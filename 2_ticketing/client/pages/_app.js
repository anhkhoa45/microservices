import 'bootstrap/dist/css/bootstrap.css'

import Header from '../components/header'

import buildClient from '../api/build-client'

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header {...pageProps} />
            <Component {...pageProps} />
        </div>
    )
}

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx)

    let currentUser
    let pageProps = {}

    try {
        const { data } = await client.get('/api/users/currentuser')
        currentUser = data.currentUser
    } catch (e){
        currentUser = null
    }

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
        pageProps,
        currentUser
    }
}

export default AppComponent
