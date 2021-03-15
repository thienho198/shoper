import React, { Component } from 'react'
import {ReactComponent as CheckIcon} from './CheckIcon.svg'
import './mycheckbox.scss'

export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: props.isChecked 
        }
        this.onToggle = this.onToggle.bind(this)
    }
    componentDidMount() {
        this.props.linkRef && this.props.linkRef(this)
    }
    //#region events
    onToggle(){
        if(this.props.isUseProps){
            this.props.onClick && this.props.onClick()
        }
        else{
            this.setState(prevState =>{
                return {
                    isChecked: !prevState.isChecked
                }
            },()=>{
                this.props.onChange && this.props.onChange(this.state.isChecked)
            })
        }  
    }
    render() {
        return (
            <span onClick={this.onToggle} className="mycheckbox">
                {!this.props.isUseProps && this.state.isChecked && <CheckIcon width={20} height={20}/>}
                {this.props.isUseProps && this.props.isChecked && <CheckIcon width={20} height={20}/>}
            </span>
        )
    }
}
CheckBox.defaultProps = {
    isChecked: false,
    isUseProps: false
}