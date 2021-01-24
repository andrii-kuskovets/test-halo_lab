import React, {useState} from "react";
import Icon from "../icon/Icon";
import '../orderForm/_order-form.scss';

// ValidationUtils
function validatePhoneNumber(phone) {
    let onlyNumbers = /^[0-9]*$/;

    if(phone.length !== 12)
        return 'Should contain 12 characters';
    else if(!onlyNumbers.test(phone))
        return 'Only numbers allowed';
    return '';
}

function validateName(name) {
    let onlyLetters = /^[a-zA-Z]+$/;

    if(!onlyLetters.test(name))
        return 'Only letters allowed';
    return '';
}

export default function OrderForm(props) {
    const [value, setValue] = useState({});
    const [typeError, setTypeError] = useState({name: '', phone: ''});

    const resetCallback = props.reset;

    const handleChange = event =>  {
        event.persist();
        setValue(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const handleSubmit = event => {
        if(!validateForm()) {
            event.preventDefault();
        } else {
            console.log(value);
            resetCallback();
        }
        event.preventDefault();
    }

    const onFocus = (event) => {
        let targetElement = event.target.name;
        if(typeError[targetElement] !== '') {
            event.persist();
            setValue(inputs => ({...inputs, [targetElement]: ''}));
            setTypeError(inputs => ({...inputs, [targetElement]: ''}));
        }
    }

    const onBlur = (event) => {
        let targetElement = event.target.name;
        if (targetElement === 'phone' && value.phone) {
            setTypeError(inputs => ({...inputs, [targetElement]: validatePhoneNumber(value.phone)}));
        }
        else if(targetElement === 'name' && value.name) {
            setTypeError(inputs => ({...inputs, [targetElement]: validateName(value.name)}));
        }
    }

    const validateForm = () => {
        if(!value.name || !value.phone) {
            if (!value.name) {
                setTypeError(prevState => { return {...prevState, name: 'This field in required'}})
            }
            if (!value.phone) {
                setTypeError(prevState => { return {...prevState, phone: 'This field in required'}})
            }
            return false;
        }else if(typeError.phone !== '' || typeError.name !== '') {
            return false;
        }
        return true;
    }

    return (
        <div>
            <div className='block__wrapper'>
                <h4 className='block__category'>{props.category}</h4>
                <h2 className='block__title'>{props.name}</h2>
                <h3 className='block__price'><span>$</span>{props.price}</h3>
            </div>
            <form action="#" className='form'>
                <div className={typeError.name !== '' ? 'form__group form__group_error' : 'form__group'}>
                    <div className='form__notification-error'>
                        <h3 className='form__title-error'>Error</h3>
                        <div className='form__icon-error'>
                            <Icon icon='cross'/>
                        </div>
                    </div>
                    <input onFocus={onFocus} onBlur={onBlur} className='form__input' placeholder='Name' name='name' type="text" value={value.name || ''} onChange={handleChange}/>
                    <span className='form__message-error'>{typeError.name}</span>
                </div>
                <div className={typeError.phone !== '' ? 'form__group form__group_error' : 'form__group'}>
                    <div className='form__notification-error'>
                        <h3 className='form__title-error'>Error</h3>
                        <div className='form__icon-error'>
                            <Icon icon='cross'/>
                        </div>
                    </div>
                    <input onFocus={onFocus} onBlur={onBlur} className='form__input' placeholder='Number' name='phone' type="text" value={value.phone || ''} onChange={handleChange}/>
                    <span className='form__message-error'>{typeError.phone}</span>
                </div>
                <button type='submit' className='btn btn_medium' onClick={handleSubmit}>
                    <span>order</span>
                    <Icon icon='arrow'/>
                </button>
            </form>
        </div>

    )
}