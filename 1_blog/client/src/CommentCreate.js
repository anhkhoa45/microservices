/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react'
import axios from 'axios'

export default ({postId}) => {
    let [content, setContent] = useState('')
    const onSubmit = async (event) => {
        event.preventDefault()
        
        await axios.post(
            `http://localhost:4001/posts/${postId}/comments`,
            {content}
        )

        setContent('')
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="comment"
                    ></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
