/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import PostCreate from'./PostCreate'
import PostList from'./PostList'

export default () => {
    return (
        <div className="container">
            <PostCreate />
            <hr />
            <PostList />
        </div>
    )
}
