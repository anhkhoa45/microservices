/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import CommentList from './CommentList'
import CommentCreate from './CommentCreate'

export default () => {
    let [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts')
        setPosts(res.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderPosts = Object.values(posts).map(post => {
        return (
            <div className="card col-md-4 mb-20">
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <hr />
                    <CommentList comments={post.comments} />
                    <hr />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })

    return (
        <div>
            <h1>Posts</h1>
            <div className="row">
                {renderPosts}
            </div>
        </div>
    )
}
