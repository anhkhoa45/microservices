/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react'
import axios from 'axios'

export default () => {
    let [title, setTitle] = useState('')
    const onSubmit = async (event) => {
        event.preventDefault()
        
        await axios.post(
            'http://localhost:4000/posts',
            {title}
        )

        setTitle = ''
    }


    return (
        <div>
            <h1>Create post</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                    ></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
