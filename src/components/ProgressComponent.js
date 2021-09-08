import React from 'react'
import { Steps, } from 'antd';
const { Step } = Steps;

export default class ProgressComponent extends React.Component {
    state = {
        current: 0,
        discribe: this.props.data
    };

    onChange = current => {
        // console.log('onChange:', current);
        this.setState({ current });
    };

    render() {
        const { current } = this.state;
        return (
            <Steps current={current} onChange={this.onChange} size="small">
                {                    
                    this.state.discribe.map((des, index) => {
                        return <Step title={des.station} description={des.time} key={index} />
                    })
                }
            </Steps>
        );
    }
}