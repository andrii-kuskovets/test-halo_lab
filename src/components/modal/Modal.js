import React, {useEffect} from "react";
import Icon from "../icon/Icon";
import './_modal.scss';



export default function Modal(props) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return ()=> document.body.style.overflow = 'unset';
    }, []);

    return (
        <div className="modal">
            <div className='block'>
                <button className='btn btn_close' onClick={props.onOrderCallback}>
                    <Icon icon='cross'/>
                </button>
                <div>{props.children}</div>
            </div>
        </div>
    );
}