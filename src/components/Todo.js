import React, { useState, useEffect } from 'react';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

const ThemeToggler = () => {
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
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };

    // Define background color classes for light and dark themes
    const inputBgClass = theme === 'dark' ? 'bg-darkgreyblue' : 'bg-gray-100';
    const inputTextClass = theme === 'dark' ? 'text-lightgrey' : 'text-darkgreyblue';

    // Set a fixed height for the container
    const containerStyle = {
        height: '300px', // Adjust the height as needed
    };

    document.documentElement.className = theme === 'dark' ? 'dark-theme' : 'light-theme';

    useEffect(() => {
        // Listen for Enter key press globally
        window.addEventListener('keydown', handleEnterPress);

        // Remove the event listener when the component unmounts
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
                <div className={`relative mt-4 rounded-md shadow-sm`}>
                    <FontAwesomeIcon
                        icon={faCircle}
                        className="text-gray-600 absolute inset-y-0 left-0 m-4 text-lg" 
                    />
                    <input
                        type="text"
                        name="todo"
                        id="todo"
                        className={`input ${inputBgClass} block rounded-md border-0 py-1.5 pl-12 pr-20 ${inputTextClass} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus: sm:text-base sm:leading-6`}
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
                        <span
                            key={index}
                            className={`input ${inputBgClass} block rounded-md border-0 py-1.5 pl-12 pr-20 ${inputTextClass} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus: sm:text-base sm:leading-6`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeToggler;
