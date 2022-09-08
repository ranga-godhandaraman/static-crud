import React, { Component } from 'react';
import FormValidator from './formvalidator';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([{
      field: 'full_name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter full name.'
    }, {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter your email address.'
    }, {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Enter valid email address.'
    }, {
      field: 'phone',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter a phone number.'
    },{
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter password.'
    }, {
      field: 'password_confirmation',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter Password confirmation.'
    }, {
      field: 'password_confirmation',
      method: this.passwordMatch, // notice that we are passing a custom function here
      validWhen: true,
      message: 'Password and password confirmation do not match.'
    }]);
    this.state = {
      full_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      validation: this.validator.valid(),
    }
    this.submitted = false;
  }
  passwordMatch = (confirmation, state) => (state.password === confirmation)
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({
      validation
    });
    this.submitted = true;
    if (validation.isValid) {
      alert("Form registered successfully")
      window.location.href = "/home";
      //reaches here if form validates successfully...
    }
  }
  render() {
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation

    return (
      <div className="container" style={{ margin: "5rem" }} align="center" >
        <Card style={{ width: '30rem' }} className="bg-dark text-white"  align="center" >
          <Card.Body>
          <div className="row">
            <div className="col-mb-4 col-mb-offset-4">
              <form className="registrationForm">
                <h2>Registration form</h2>
                <div className={validation.email.isInvalid && 'has-error'}>
                  <label htmlFor="full_name">Full Name</label>
                  <input type="string" className="form-control" name="full_name" placeholder="Full Name" onChange={this.handleInputChange} /> {validation.full_name.message} </div>
                <div className={validation.email.isInvalid && 'has-error'}>
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange} /> {validation.email.message} </div>
                <div className={validation.password.isInvalid && 'has-error'}>
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} /> <span className="help-block">{validation.password.message}</span> </div>
                  <Form.Group class="mb-3">
                <div className={validation.password_confirmation.isInvalid && 'has-error'}>
                  <label htmlFor="password_confirmation">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" onChange={this.handleInputChange} /> <span className="help-block">{validation.password_confirmation.message}</span> </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Col sm={{ span:11, offset:1 }}>
                  <Button onClick={this.handleFormSubmit} className="btn btn-warning" margin="mb-3"> Register </Button>
                </Col>
      </Form.Group>
            </form>
          </div>
    </div>
    </Card.Body>
    </Card>
</div >
)
  }

}
export default App;

