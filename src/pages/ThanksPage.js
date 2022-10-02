import thanks from "./css/Thanks.module.css"
import logo from '../assets/logo.png'
import Button from '../components/Button'

import { answerMark, newRecord } from '../models/answer'
import { questions } from '../models/questions'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function ThanksPage() {

    const navigator = useNavigate()

    function handleReplay() {
        navigator('/question')
    }

    function calculateScore() {
        return Math.round((answerMark.filter((score) => score === true).length / questions.length) * 100)
    }

    function getThanksPrompt() {
        let score = calculateScore()
        if (score >= 90) {
            return "Super Genius!"
        } else if (score >= 80) {
            return "Exellent!"
        } else if (score >= 50) {
            return "Thank you for playing!"
        } else if (score >= 10) {
            return "Better luck next time!"
        } else {
            return "Stupid!"
        }
    }

    useEffect(() => {
        newRecord()
    })

    return (
        <div className={thanks.page}>
            <div className={thanks.container}>
                <div className={thanks.logo}>
                    <img src={logo} alt="" />
                </div>
                <div className={thanks.result}>
                    {getThanksPrompt()}<br />
                    Your score is <strong>{calculateScore()} / 100</strong>
                </div>
                <div className={thanks.submit}>
                    <Button message={"Replay"} onPress={handleReplay} />
                </div>
            </div>
        </div>
    )
}

export default ThanksPage