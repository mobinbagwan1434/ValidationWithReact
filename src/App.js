import React,{Component} from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/container"
import "./App.css";
import { FormErrors } from './FormErrors';

class App extends React.Component{

  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      emailValid:false,
      passwordValid:false,
      formValid:false,
      formErrors:{email:'',password:''}
    }
  }

  // we have to events here which is changing accordingly user
  handleUserInput=(e)=>{
    // to disable javascript DOM manipulation
    e.preventDefault();
    console.log(e);
    // "name" might be anything either "email" or "password"
    const name=e.target.name;
    const value=e.target.value;

    console.log(name);
    console.log(value);
    // here we have to change the state and those input field check either fill or not
    // to take the value "react" provide a []
    // state will immediately call one function which will return "name" and "value"
    this.setState({[name]:value},
                ()=>{this.validateField(name,value)})
    };
  
    validateField(fieldName,value){
      // create local changes
      // if you have seen initially all the fields will be "false" check state
      let fieldValidationError=this.state.formErrors;
      let emailValid=this.state.emailValid;
      let passwordValid=this.state.passwordValid;
      
      switch(fieldName){
        case "email":
          emailValid:value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationError.email=emailValid ? "" :'Please type Valid Email ID';
        break;

        case "password":
          passwordValid=value.length >= 8;
          fieldValidationError.password=passwordValid ? "":"Password must be 8 (character,number,symbol)";
          break;
          default:
          break;
      }

      // here we have to change the state fpr globally changes

      this.setState({
          formErrors:fieldValidationError,
          emailValid:emailValid,
          passwordValid:passwordValid
      }, this.validateForm);
    }
      validateForm(){
        this.setState({formValid:this.state.emailValid && this.state.passwordValid})
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

  render(){
    return(
      <Container>
        <Form>
        <FormErrors formErrors={this.state.formErrors} />
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" 
                          placeholder="Enter email"
                          required               
                          onChange={this.handleUserInput} />  

            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}></div> 
                       
          </Form.Group>
        

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          placeholder="Password"    
                          onChange={this.state.handleUserInput} />
          </Form.Group>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}></div>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Sangli Maharashtra" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>Maharashtra</option>
              <option>Hyderabad</option>
              <option>Karnataka</option>
              <option>UP</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit" disabled={!this.state.formValid}>
          Submit
        </Button>
      </Form>
      </Container>
    )
  }
}

export default App;