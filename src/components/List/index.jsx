import React, { Component } from 'react'
import Item from '../Item'

export default class List extends Component {
    render() {
        const { todos } = this.props
        return (
            <div className="list-frame vh-55">
                <ul className="list-group">
                    {
                        todos.map( todo => {
                            return <Item key={ todo.id } {...todo} />
                        })
                    }
                </ul>
            </div>
        )
    }
}