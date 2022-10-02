import register from './css/Register.module.css';
import logo from "../assets/logo.png"
import Button from '../components/Button';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newRecord } from '../models/answer';

function RegisterPage() {

    const inputRef = useRef()
    const navigator = useNavigate()
    const [isWarn, setWarn] = useState(false)

    function handleSsubmit() {
        if (inputRef.current.value) {
            navigator("/question")
        } else {
            setWarn(true)
            inputRef.current.focus()
            setTimeout(() => setWarn(false), 1000)
        }
    }

    useEffect(() => {
        newRecord()
    }, [])

    return (
        <div className={register.page}>
            <div className={register.container}>
                <div className={register.logo}>
                    <img src={logo} alt="" />
                </div>
                <div className={clsx(register.input, {
                    [register.warning]: isWarn
                })}>
                    <input ref={inputRef} placeholder='Enter your name' />
                </div>
                <div className={register.submit}>
                    <Button message={"Play Game"} onPress={handleSsubmit} />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage