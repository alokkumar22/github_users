import React, { useEffect } from 'react'
import classes from './Modal.module.css'

const Modal = (props) => {

    useEffect(() => {
          const timerId = setTimeout(() => {
            props.closeModal()
          }, 3000);
          return () => {
            clearTimeout(timerId);
        }
      }, []);
    return (
        <div className={classes.modal}>
            {props.children}
        </div>
    )
}

export default Modal;
