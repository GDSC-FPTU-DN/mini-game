import button from "./css/Button.module.css"

function Button({ message, onPress, isPrimary }) {
    return (
        <div className={button.container} onClick={() => onPress()}>{message}</div>
    )
}

export default Button