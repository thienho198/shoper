import React from 'react'
import Indicator from './Inditator'

class CustomSpin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSpinning: props.isSpinning || false
        }

    }
    componentDidMount () {
        this.props.linkRef && this.props.linkRef(this)
    }
    onSpin () {
        this.setState({ isSpinning: true })
    }
    onUnSpin () {
        this.setState({ isSpinning: false })
    }
    render(){
       return this.state.isSpinning && <Indicator paddingTop={this.props.paddingTop}/>
    }
    
}


export default CustomSpin