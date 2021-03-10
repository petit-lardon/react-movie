import React from 'react';

const Input = ({name, label, value, type, error, onChange, placeholder, desc}) => {
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
                placeholder={placeholder}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}

export default Input;
