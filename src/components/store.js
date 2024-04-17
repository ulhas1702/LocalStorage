import React, { Component } from 'react';
import './store.css';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            items: this.getLocalData(),
            checkedItems: {}
        };
    }

    getLocalData = () => {
        let list = localStorage.getItem('list');
        if (list) {
            return JSON.parse(list);
        }
        return [];
    }

    addItem = () => {
        const { value, items } = this.state;
        if (!value.trim()) {
            return;
        }
        this.setState({
            items: [...items, { text: value, checked: false }],
            value: ''
        }, () => {
            localStorage.setItem('list', JSON.stringify(this.state.items));
        });
    }

    deleteItem = (index) => {
        const { items } = this.state;
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        this.setState({
            items: updatedItems
        }, () => {
            localStorage.setItem('list', JSON.stringify(this.state.items));
        });
    }

    toggleCheck = (index) => {
        const { checkedItems } = this.state;
        const updatedCheckedItems = { ...checkedItems, [index]: !checkedItems[index] };
        this.setState({
            checkedItems: updatedCheckedItems
        });
    }

    editItem = (index, newText) => {
        const { items } = this.state;
        const updatedItems = [...items];
        updatedItems[index].text = newText;
        this.setState({
            items: updatedItems
        }, () => {
            localStorage.setItem('list', JSON.stringify(this.state.items));
        });
    }

    render() {
        const { value, items, checkedItems } = this.state;
        return (
            <div>
                <h2 className='primary'>Local Storage</h2>
                <div>
                    <input type='text' placeholder='Enter text' value={value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <button onClick={this.addItem}>ADD</button>
                </div>
                <div className='secondary'>
                    {items.map((item, index) => (
                        <div key={index}>
                            <input type='checkbox' checked={checkedItems[index]} onChange={() => this.toggleCheck(index)} />
                            <input
                                type='text'
                                value={item.text}
                                onChange={(e) => this.editItem(index, e.target.value)}
                                disabled={checkedItems[index]}
                            />
                            <button className='tersary' onClick={() => this.deleteItem(index)} disabled={checkedItems[index]}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Store;
