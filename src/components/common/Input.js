import React from 'react';

const Input = ({name, label, value, type, onChange, placeholder, desc}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                className="form-control"
                id={name}
                aria-describedby={desc}
                placeholder={placeholder}/>
        </div>
    )
}

export default Input;
