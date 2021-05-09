/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default ({comments}) => {

    // const fetchComments = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    // useEffect(() => {
    //     fetchComments()
    // }, [])

    const renderComments = comments.map(comment => {
        let content;

        if (comment.status === 'approved') {
            content = comment.content
        }

        if (comment.status === 'rejected') {
            content = 'This comment has been rejected'
        }

        if (comment.status === 'pending') {
            content = 'This comment has been moderating'
        }

        return (
            <li key={comment.id}>{content}</li>
        )
    })

    return (
        <div>
            <h5>Comments</h5>
            <ul>
                {renderComments}
            </ul>
        </div>
    )
}
