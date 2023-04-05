// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimitinMinutes: 25,
    timerElapsedinSeconds: 0,
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  secondsIncrementFunction = () => {
    const {timerLimitinMinutes, timerElapsedinSeconds} = this.state

    const isTimerCompleted = timerElapsedinSeconds === timerLimitinMinutes * 60
    console.log(timerElapsedinSeconds)
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedinSeconds: prevState.timerElapsedinSeconds + 1,
      }))
    }
  }

  onResetClicked = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerLimitinMinutes: 25,
      timerElapsedinSeconds: 0,
    })
  }

  resumeButtonClicked = () => {
    const {
      isTimerRunning,
      timerElapsedinSeconds,
      timerLimitinMinutes,
    } = this.state
    const isTimerCompleted = timerElapsedinSeconds === timerLimitinMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedinSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.secondsIncrementFunction, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onDecrement = () => {
    const {timerLimitinMinutes} = this.state

    if (timerLimitinMinutes > 1) {
      this.setState(prevState => ({
        timerLimitinMinutes: prevState.timerLimitinMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimitinMinutes: prevState.timerLimitinMinutes + 1,
    }))
  }

  updateTimer = () => {
    const {timerElapsedinSeconds, timerLimitinMinutes} = this.state

    const remainingSeconds = timerLimitinMinutes * 60 - timerElapsedinSeconds

    const minutes = Math.floor(remainingSeconds / 60)

    const seconds = Math.floor(remainingSeconds % 60)

    const stringinMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringinseconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringinMinutes}:${stringinseconds}`
  }

  render() {
    const {isTimerRunning, timerLimitinMinutes} = this.state
    const imagesArray = [
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png ',
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
    ]

    const image = isTimerRunning ? imagesArray[1] : imagesArray[0]
    const alttext = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-color-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="cards-container">
          <div className="image-container">
            <div className="watch-heading-container">
              <h1 className="stop-watch-time">{this.updateTimer()}</h1>
              <p className="resume-paused-container">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="footer-container">
            <div className="buttons-container">
              <button
                type="button"
                onClick={this.resumeButtonClicked}
                className="button-heading-container"
              >
                <img src={image} alt={alttext} />
                <p className="start-button">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>

              <button
                type="button"
                onClick={this.onResetClicked}
                className="button-heading-container"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                />
                <p className="start-button">Reset</p>
              </button>
            </div>
            <div className="bottom-container">
              <p className="setLimitheading">Set Timer Limit</p>
              <div className="increment-decrement-container">
                <button
                  type="button"
                  onClick={this.onDecrement}
                  className="btn-symbol"
                  disabled={isTimerRunning}
                >
                  -
                </button>
                <button className="timer-limit" type="button">
                  <p className="time-limit-text">{timerLimitinMinutes}</p>
                </button>
                <button
                  type="button"
                  onClick={this.onIncrement}
                  className="btn-symbol"
                  disabled={isTimerRunning}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
