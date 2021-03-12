import React, {Component} from 'react';
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const opt = {abortEarly: false};
        const result = Joi.validate(this.state.data, this.schemas, opt);
        console.log(result)

        if(!result.error) return null;

        const errors = {};
        result.error.details.map((i) => errors[i.path[0]] = i.message);
        return errors;
    }

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schemas[name]}
        const {error} = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if(errors) return;

        this.doSubmit();
    }

    handleChange = (e) => {
        const errors = {...this.state.errors}
        const data = {...this.state.data};
        const error = this.validateProperty(e.currentTarget);

        if(error) errors[e.currentTarget.name] = error;
        else delete errors[e.currentTarget.name];

        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({data, errors});
    }

    renderButton(label) {
        return (
            <button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>
        );
    }

    renderInput(name, label, type = 'text', placeholder, description) {
        const {data, errors} = this.state;

        return (
            <Input name={name}
                   label={label}
                   value={data[name]}
                   type={type}
                   error={errors[name]}
                   onChange={this.handleChange}
                   placeholder={placeholder}
                   desc={description}
            />
        )
    }

    renderSelect(name, label, options) {
        const {data, errors} = this.state;
        console.log(name)
        console.log(label)
        console.log(options)

        return (
            <Select name={name}
                   value={data[name]}
                   label={label}
                   options={options}
                   onChange={this.handleChange}
                   error={errors[name]}
            />
        )
    }
}

export default Form;
