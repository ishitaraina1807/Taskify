import React, { useState, useEffect } from 'react';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import cross from '../images/cross.svg';

const Todo = () => {
    const [theme, setTheme] = useState('light');
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setItems([...items, { text: inputValue, checked: false }]);
            setInputValue('');
        }
    };

    const handleCheckboxChange = (index) => {
        const updatedItems = [...items];
        updatedItems[index].checked = !updatedItems[index].checked;
        setItems(updatedItems);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const inputBgClass = theme === 'dark' ? 'bg-darkgreyblue' : 'bg-gray-100';
    const inputTextClass = theme === 'dark' ? 'text-light-grey-blue' : 'text-darkgreyblue';
    const containerStyle = {
        height: '300px',
    };

    document.documentElement.className = theme === 'dark' ? 'dark-theme' : 'light-theme';

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);
        return () => {
            window.removeEventListener('keydown', handleEnterPress);
        };
    }, [items]);

    return (
        <div className="container" style={containerStyle}>
            <div className="todo-container">
                <h2>TODO</h2>
                <button onClick={toggleTheme}>
                    <img src={theme === 'light' ? moon : sun} alt={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`} />
                </button>
            </div>
            <div className='flex items-center justify-center'>
                <div className={`relative mt-4 rounded-md shadow-sm item-center`}>
                    <FontAwesomeIcon
                        icon={faCircle}
                        className="text-gray-600 absolute inset-y-0 left-0 m-4 text-lg"
                    />
                    <input
                        type="text"
                        name="todo"
                        id="todo"
                        className={`input-box ${inputBgClass} block rounded-sm border-0 py-1.5 pl-12 pr-20 ${inputTextClass} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus: sm:text-base sm:leading-6`}
                        placeholder="Create a new todo..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterPress}
                    />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className={`relative mt-4 rounded-md shadow-sm`}>

                {items.map((item, index) => (
    <div key={index} className={`input-box ${inputBgClass} flex items-center box-container border rounded-sm py-3.5 pl-4 pr-4 ${inputTextClass} ${item.checked ? 'line-through text-gray-400' : ''}`}>
        <label className="flex items-center">
            <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(index)
                }
            />
            <span className="checkmark"></span>
        </label>
        <span className="mr-4">{item.text}</span>
        <img
            src={cross}
            onClick={() => handleDeleteItem(index)}
            className="w-4 h-4 ml-auto cursor-pointer"
        />
    </div>
))}

                </div>
            </div>

        </div>
    );
};

export default Todo;
