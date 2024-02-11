import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = forwardRef((props,refs) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display : visible ? 'none' : '' }
    const shoWhenVisible = { display : visible ? '' : 'none' }

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
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={shoWhenVisible}>
                {props.children}
                <Button className='mt-1' onClick={toggleVisibility}>Cancel</Button>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Toggleable.displayName = 'Toggleable'
export default Toggleable