import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then - now);
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;

        return (
            <div>
                <h5>Time remainig</h5>
                <div className="row">
                    <h6 className="col-sm-3"><span className="badge badge-secondary ">{days}</span>days</h6>
                    <h6 className="col-sm-3"><span className="badge badge-secondary">{hours}</span>hours</h6>
                    <h6 className="col-sm-3"><span className="badge badge-secondary">{minutes}</span>minutes</h6>
                    <h6 className="col-sm-3"><span className="badge badge-secondary">{seconds}</span>seconds</h6>
                </div>
            </div>
        );
    }
}

export default Countdown
