import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Input from "react-toolbox/lib/input"
import Button from "react-toolbox/lib/button"
import { isLoginValid } from '../../service/validator/user';
import { isPasswordValid } from '../../service/validator/user';
import { signUp, singIn } from '../../service/request/user';
import "./Start.scss"

export default function Start() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [login, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState("")
  const [loginMessage, setLoginMessage] = useState("")

  const history = useHistory()

  const handleSignInSubmit = (e) => {
    e.preventDefault()

    setPasswordMessage("")
    setLoginMessage("")

    if (validateValues()) {
      singIn(login, password).then(response => {
        if (response.status === 200) {
          response.text().then(token => {
            localStorage.setItem("jwt", token)
            history.push("/main")
          })
        } else if (response.status === 401) {
          response.text().then(text => { setPasswordMessage(text) })
        } else if (response.status === 403) {
          setPasswordMessage("Wrong password")
        } else {
          setPasswordMessage("Something went wrong, please try again")
        }
      })
    } else {
      if (!isPasswordValid(password)) {
        setPasswordMessage("Password must be > 4 symbols")
      }
      if (!isLoginValid(login)) {
        setLoginMessage("Only latin letters, numbers, _")
      }
    }
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault()

    setPasswordMessage("")
    setLoginMessage("")

    if (validateValues()) {
      signUp(login, password).then(response => {
        if (response.status === 200) {
          response.text().then(token => {
            localStorage.setItem("jwt", token);
            history.push("/main");
          });
        } else if (response.status === 409) {
          response.text().then(text => { setPasswordMessage(text) });
        } else {
          setPasswordMessage("Something went wrong, please try again");
        }
      });
    } else {
      if (!isPasswordValid(password)) {
        setPasswordMessage("Password must be > 4 symbols")
      }
      if (!isLoginValid(login)) {
        setLoginMessage("Only latin letters, numbers, _")
      }
    }
  }

  const validateValues = () => {
    return isLoginValid(login) && isPasswordValid(password)
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/main")
    }

    setInterval(() => { refreshClock() }, 1000)
    refreshClock();
  })

  const refreshClock = () => {
    let date = new Date()

    let time = date.toLocaleTimeString()
    let day = date.toLocaleDateString()

    setTime(time)
    setDate(day)
  }

  return (
    <div className="Start">
      <div>
        <div className="header_start">Григорьев Андрей Сергеевич P32111 18981</div>

        <div className="index_content">
          <div className="time">
            {time}
          </div>
          <div className="date">
            {date}
          </div>
        </div>

        <div className="form">
          <div className="FormGroup">

            <Input type="text" placeholder="login" className="login"
              value={login} onChange={login => setUsername(login)} />
            {
              <small>{loginMessage}</small>
            }
          </div>
          <div className="FormGroup">
            <Input type="password" placeholder="password" className="password"
              value={password} onChange={password => setPassword(password)} />
            {
              <small>{passwordMessage}</small>
            }
          </div>
          <div className="FormGroup">
            {isSignUp ?
              <Button label="Sign up" onClick={handleSignUpSubmit} className="signinup" /> :
              <Button label="Sign in" onClick={handleSignInSubmit} className="signinup" />
            }
          </div>
          {isSignUp ?
            <span onClick={() => {
              setLoginMessage("")
              setPasswordMessage("")
              setIsSignUp(false)
            }
            }>Sign in</span> :
            <span onClick={() => {
              setLoginMessage("")
              setPasswordMessage("")
              setIsSignUp(true)
            }
            }>Sign up</span>
          }

        </div>
      </div>
    </div>
  )
}
