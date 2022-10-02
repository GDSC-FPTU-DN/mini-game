import Button from "../components/Button"
import question from "./css/Question.module.css"
import clsx from "clsx"

import { questions } from "../models/questions"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { increase, decrease, answerMark, newRecord } from "../models/answer"

function QuestionPage() {

    const questionList = useRef(question)

    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [currentChoice, setChoice] = useState(-1)
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const [isFirstQuestion, setIsFirstQuestion] = useState(true)
    const navigator = useNavigate()

    function shuffle(array) {
        let currentIndex = array.length, randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }


        return array
    }

    function shuffleQuestion() {
        questionList.current = shuffle(questions)
    }

    function shuffleAnswer(index) {
        questionList.current[index].question = shuffle(questionList.current[index].question)
    }

    function nextButtonMessage() {
        if (currentQuestion === questions.length - 1) {
            setIsLastQuestion(true)
        } else {
            setIsLastQuestion(false)
        }
    }

    function prevButtonMessage() {
        if (currentQuestion !== 0) {
            setIsFirstQuestion(false)
        } else {
            setIsFirstQuestion(true)
        }
    }

    function trackCorrectAnswer() {
        if (questions[currentQuestion].answer.includes(questions[currentQuestion].question[currentChoice])) {
            increase(true)
        } else {
            increase(false)
        }
    }

    function handleNext() {
        if (currentQuestion === questions.length - 1) {
            navigator('/thanks')
            trackCorrectAnswer()
        } else {
            setCurrentQuestion(currentQuestion + 1)
            setChoice(-1)
            trackCorrectAnswer()
            shuffleAnswer(currentQuestion + 1)
        }
    }

    function handlePrev() {
        if (currentQuestion === 0) {
            navigator("/")
            newRecord()
        } else {
            setCurrentQuestion(currentQuestion - 1)
            setChoice(-1)
            decrease()
        }
    }

    function handleSetChoice(choice) {
        setChoice(choice)
    }

    useEffect(() => {
        nextButtonMessage()
        prevButtonMessage()
    })

    useEffect(() => {
        newRecord()
        shuffleQuestion()
        shuffleAnswer(0)
        setCurrentQuestion(0)
    }, [])

    return (
        <div className={question.page}>
            <div className={question.question}>
                <div className={question.indicator}>Question {currentQuestion + 1} / {questions.length}</div>
                <div className={question.prompt}>{questions[currentQuestion].prompt}</div>
            </div>
            <div className={question.options}>

                <div
                    className={clsx(question.option, {
                        [question.active]: currentChoice === 0
                    })}
                    onClick={() => handleSetChoice(0)}
                >
                    {questions[currentQuestion].question[0]}
                </div>

                <div
                    className={clsx(question.option, {
                        [question.active]: currentChoice === 1
                    })}
                    onClick={() => handleSetChoice(1)}
                >
                    {questions[currentQuestion].question[1]}
                </div>

                <div
                    className={clsx(question.option, {
                        [question.active]: currentChoice === 2
                    })}
                    onClick={() => handleSetChoice(2)}
                >
                    {questions[currentQuestion].question[2]}
                </div>

                <div
                    className={clsx(question.option, {
                        [question.active]: currentChoice === 3
                    })}
                    onClick={() => handleSetChoice(3)}
                >
                    {questions[currentQuestion].question[3]}
                </div>

            </div>
            <div className={question.submit}>
                <Button message={isFirstQuestion ? "Exit game" : "Previous Question"} onPress={handlePrev} />
                <div className={question.spacer}></div>
                <Button message={isLastQuestion ? "Complete" : "Next Question"} onPress={handleNext} />
            </div>
        </div>
    )
}

export default QuestionPage