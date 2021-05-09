/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default ({postId}) => {
    let [comments, setComments] = useState([])

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        setComments(res.data)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const renderComments = comments.map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
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
