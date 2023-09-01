import React, { useState, useEffect } from 'react';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import cross from '../images/cross.svg';
import check from '../images/check.svg';

const Todo = () => {
    const [theme, setTheme] = useState('light');
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
    const [activeSection, setActiveSection] = useState('All');
    const [filteredItems, setFilteredItems] = useState(items);
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

    const handleMouseEnter = (index) => {
        setHoveredItemIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredItemIndex(null);
    };

    const itemsLeft = filteredItems.filter(item => !item.checked).length;
    const inputBgClass = theme === 'dark' ? 'bg-darkgreyblue' : 'bg-white';
    const inputTextClass = theme === 'dark' ? 'text-light-grey-blue' : 'text-darkgreyblue';
    const boderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
    const strikethroughText = theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
    const containerStyle = {
        height: '300px',
    };

    useEffect(() => {
        if (activeSection === 'All') {
            setFilteredItems(items);
            console.log("all")
        } else if (activeSection === 'Active') {
            const activeItems = items.filter(item => !item.checked);
            setFilteredItems(activeItems);
            console.log("active")
        } else if (activeSection === 'Completed') {
            const completedItems = items.filter(item => item.checked);
            setFilteredItems(completedItems);
            console.log("completed")
        }
    }, [activeSection, items]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    document.documentElement.className = theme === 'dark' ? 'dark-theme' : 'light-theme';

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
                        className="text-gray-400 absolute inset-y-0 left-0 mx-4 my-6 text-xl"
                    />
                    <input
                        type="text"
                        name="todo"
                        id="todo"
                        className={`input-box ${inputBgClass} block rounded-sm border-0 py-1.5 pl-12 pr-20 ${inputTextClass} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus: sm:text-lg sm:leading-6`}
                        placeholder="Create a new todo..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterPress}
                    />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className={`relative mt-4 rounded-md shadow-sm`}>
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            className={`input-box ${inputBgClass} flex items-center box-container shadow-lg border text-lg ${boderColor} rounded-sm py-3.5 pl-4 pr-4 ${inputTextClass} ${item.checked ? `line-through ${strikethroughText}` : ''}`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <span className="checkmark flex check-img">
                                    {item.checked && <img className="block" src={check} alt="check" />}
                                </span>
                            </label>
                            <span className="mr-4">{item.text}</span>
                            <img
                                src={cross}
                                onClick={() => handleDeleteItem(index)}
                                className={`w-5 h-5 ml-auto cursor-pointer cross-icon ${hoveredItemIndex === index ? 'visible' : 'hidden'}`}
                                style={{ transition: 'opacity 0.7s' }}
                            />
                        </div>
                    ))}

                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className={`relative rounded-md shadow-lg item-center`}>
                    <div
                        className={`last-box ${inputBgClass} py-2.5 pl-4 pr-4 block rounded-sm border ${boderColor} text-gray-400 focus: sm:text-base sm:leading-6 `} >
                        <span>
                            {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
                        </span>
                        <div className="sections flex">
                            <p
                                className={`cursor-pointer ${activeSection === 'All' ? 'text-blue-500' : 'text-gray-400'}`}
                                onClick={() => handleSectionChange('All')}
                            >
                                All
                            </p>
                            <p
                                className={`cursor-pointer ${activeSection === 'Active' ? 'text-blue-500' : 'text-gray-400'}`}
                                onClick={() => handleSectionChange('Active')}
                            >
                                Active
                            </p>
                            <p
                                className={`cursor-pointer ${activeSection === 'Completed' ? 'text-blue-500' : 'text-gray-400'}`}
                                onClick={() => handleSectionChange('Completed')}
                            >
                                Completed
                            </p>
                        </div>
                        <div
                            className="hover:text-verydarkgreyblue hover:cursor-pointer"
                            onClick={() => {
                                const remainingItems = items.filter(item => !item.checked);
                                setItems(remainingItems);
                            }}
                        >
                            Clear Completed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
