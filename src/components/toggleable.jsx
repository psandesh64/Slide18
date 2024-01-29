import { useState } from "react";

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display : visible ? 'none' : ''}
    const showhenVisible = { display : visible ? '' : 'none'}

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(!visible)}>{props.buttonLabel}</button>
            </div>
            <div style={showhenVisible}>
                {props.children}
                <button onClick={() => setVisible(!visible)}>Cancel</button>
            </div>
        </div>
    )
}

export default Toggleable