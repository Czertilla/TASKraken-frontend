import { Button, Result } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';

export const Verify = (props) => {
    const params = useParams();
    const email = params.email;
    const maxTimeoutSeconds = 90
    const [disable, setDisable] = useState(true)
    const [secondsLeft, setSeconds] = useState(0)
		const [timerLable, setTimerLable] = useState("")

    const setTimer = (seconds) => {
        console.log("setTimer:", seconds);
        setSeconds(seconds)
        setDisable(seconds)
        if (seconds)
            setTimeout(() => {
                localStorage.setItem("sendVerifyTimeout", "0")
                setDisable(false)
            }, seconds * 1000)
    }

    const sendAgain = () => {
        axios.post("http://127.0.0.1:8000/auth/request-verify-token", {email: email})
        setTimer(maxTimeoutSeconds)
    }



    useEffect(() => {
					const timeoutMem = localStorage.getItem("sendVerifyTimeout")
					console.log("timeout memory:", timeoutMem);
					const initSeconds = timeoutMem ? parseInt(timeoutMem) : 0
					const interval = setInterval (() => {
							setSeconds(prev => {
									if (prev > 0){
											localStorage.setItem("sendVerifyTimeout", prev.toString())
											console.log()
									}
									return prev > 0 ? prev - 1 : 0
							})
					}, 1000);
					setTimer(initSeconds)
					return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        setTimerLable(
						secondsLeft? 
						new Date(secondsLeft * 1000).toISOString().substring(14, 19) 
						: ''
				)
    }, [secondsLeft])

    return (
    <Result
      title="Verify your email"
      subTitle={`We send verification message. Check your email ${email}`}
      extra={[
        <Button type="primary" href='/auth'>
          Go to Log in
        </Button>,
        <Button onClick={sendAgain} disabled={disable}>{`send again ${timerLable}`}</Button>,
      ]}
    />
  )
};