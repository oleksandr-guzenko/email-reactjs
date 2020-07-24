import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import * as Regex from "./regex";
class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isInvalidEmail: false,
      isDuplicateEmail:false
    };
  }
  /**
   * This method is used for handle input change
   * @param {*} event
   */
  handleInput(event) {
    this.props.onChange(event ,this.props.index);
    this.setState({
      isInvalidEmail: false,
    });
  }
  /**
   * This method is used for handle input focus
   * @param {*} event
   */
  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }
  /**
   * This method is used for handle input blur
   * @param {*} event
   */
  handleBlur(event) {
    if (this.props.onBlur()) {
      this.props.onBlur(event);
    }
    let regex = this.props.regex;
    if (regex.test(event.target.value)) {
      this.setState(
        {
          isInvalidEmail: false,
        });
    }else{
      if(event.target.value !== ''){
        this.setState(
          {
            isInvalidEmail: true,
          });
      }
    }
    event.preventDefault();
    event.stopPropagation();
    this.checkDupllicateEmails();
  }
  /**
   * This mehod is used for handle duplicate emails
   * @param {*} event 
   */
  checkDupllicateEmails(){
    const tempArray = [];
    if (this.props.value.length > 1) {
      for (let i = 0; i <= this.props.value.length - 1; i++) {
        if(i !== this.props.index){
          if (
            this.props.value[i].email ===
            this.props.value[this.props.index].email
          ) {
            tempArray.push(this.props.value[i]);
          }
        }
        }
      }
      if (tempArray.length > 0) {
        this.setState({
          isDuplicateEmail : true
        })
      } else {
        this.setState({
          isDuplicateEmail : false
        })
      }
  }
  /**
   * This method is used for handle input key down
   * @param {*} event
   */
  handleKeyDown(event) {
    if (this.props.onKeyDown()) {
      this.props.onKeyDown(event);
    }
  }
  /**
   * This method is used for handle input key up
   * @param {*} event
   */
  handleKeyUp(event) {
    if (this.props.onKeyUp()) {
      this.props.onKeyUp(event);
    }
  }
  /**
   * This method is used for handle input key press
   * @param {*} event
   */
  handleKeyPress(event) {
    if (this.props.onKeyPress()) {
      this.props.onKeyPress(event);
    }
  }
  /**
   * This method is used for handle multiple email
   */
  onMultipleAdd(){
    this.props.onMultipleEmail()
  }
  render() {
    return (
      <div>
        <input
          id={this.props.id}
          name={this.props.name}
          value={this.props.value[this.props.index].email}
          tabIndex={this.props.tabIndex}
          placeholder={this.props.placeholder}
          hide={this.props.hide}
          disabled={this.props.disabled}
          type={this.state.passwordFieldType}
          maxLength={this.props.maxLength}
          autoComplete={this.props.autoComplete}
          className={this.props.className}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleInput.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        ></input>
        <React.Fragment> 
        <React.Fragment className ="add-remove">
          <span >
            <i className="fa fa-minus" aria-hidden="true"></i>
            </span>
          </React.Fragment>
        {this.props.isShowPlus ?
        <i className="fa fa-plus" aria-hidden="true" onClick={this.onMultipleAdd.bind(this)}></i>
        :""}
        </React.Fragment>

        {this.state.isInvalidEmail ? (
          <div className="error-msg">{this.props.emailFormateError}</div>
        ) : (
          ""
        )}
         {this.state.isDuplicateEmail ? (
          <div className="error-msg">{this.props.duplicateEmailError}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
Email.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  tabIndex: PropTypes.number,
  hide: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  className: PropTypes.object,
  regex: PropTypes.any,
  emailFormateError: PropTypes.string,
  duplicateEmailError: PropTypes.string,
  isMultiple: PropTypes.bool,
  isShowPlus: PropTypes.bool,
  onMultipleEmail:PropTypes.func,
  index:PropTypes.number
};
Email.defaultProps = {
  onFocus: function () {},
  onBlur: function () {},
  onKeyDown: function () {},
  onKeyPress: function () {},
  onKeyUp: function () {},
  onChange: function () {},
  onMultipleEmail:function () {},
  placeholder: "",
  id: "",
  name: "",
  tabIndex: 0,
  hide: false,
  disabled: false,
  type: "text",
  maxLength: 255,
  isnumberonly: false,
  autoComplete: "",
  className: {},
  value: [{email: ""}],
  regex: Regex.EMAIL_REGEX,
  emailFormateError: "Email is not valid",
  duplicateEmailError: "Do not enter same email",
  isShowPlus: true,
  isMultiple: true,
  index:0
};
export default Email;
