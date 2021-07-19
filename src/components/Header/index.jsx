import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class Header extends Component {

    // 對接收的 props 進行: 類型，必要性的限制
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    // 鍵盤事件的回調函數
    handleKeyUp = ( event ) => {
        // 解構賦值獲取 keyCode, target
        const { keyCode, target } = event;
        // 判斷是否有案 Enter
        if( keyCode !== 13 ) return
        // 添加的 todo 名字不能空白
        if( target.value.trim() === ''){
            alert('不能輸入空白');
            return
        }
        // 準備好一個 todo 物件
        const todoObj = { id: nanoid(), name: target.value, done: false };
        // 把 todoObj 傳遞給 App.jsx
        this.props.addTodo( todoObj );
        // 輸入完清空
        target.value = '';
    }

    render() {
        return (
            <div className="input-group bg-white box-shadow rounded-1 overflow-hidden mb-3">
                <input type="text" 
                onKeyUp={ this.handleKeyUp }
                className="form-control flex-fill" 
                placeholder="新增代辦事項"/>
                <button type="button" className="btn btn-size-lg btn-dark rounded-1 m-1">
                    <i className="fas fa-plus"></i>
                </button>
            </div>

        )
    }
}
