import { useState,forwardRef,useImperativeHandle } from "react";

const Toggleable = forwardRef((props,refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display : visible ? 'none' : ''}
    const showhenVisible = { display : visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(refs,() => {return {
        toggleVisibility
    }}
    )

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Toggleable