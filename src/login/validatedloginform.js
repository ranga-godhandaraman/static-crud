import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import { Row, Col, FormGroup, Button, Form, Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";


const ValidatedLoginForm = () => (


    <Formik
       initialValues={{ email: "", password: "" }}

        validate={values => {
            let errors = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!EmailValidator.validate(values.email)) {
                errors.email = "Invalid email address.";

            }


            const passwordRegex = /(?=.*[0-9])/;
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
                errors.password = "Invalid password. Must contain one number.";
            }
            const users = [
                { email: '' },
                { password: '' },
            ];
            const handleSubmit = () =>{
                axios.post("http://localhost:8080/api/auth/signin", {
                    email: (values.email),
                    password: (values.password)
    
                }).then((resp)=>{
                    console.log(resp)
                })
            }
           

            return errors;

        }}
    >

        { props => {
            const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;


            return (
                <div className="section" style={{ margin: "5rem" }} align="center" >
                    <Row>
                        <Col>
                            <Card style={{ width: '25rem' }} className="bg-primary text-white" >
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup as={Row} className="mb-3" controlId="formHorizontalEmail">
                                            <Form.Label column sm={2} htmlFor="email" >Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="text"
                                                placeholder="Enter your email"
                                                value={values.email}
                                                onChange={handleChange}

                                                className={errors.email && touched.email && "error"}
                                            />

                                            {errors.email && touched.email && (
                                                <div className="input-feedback">{errors.email}</div>
                                            )}
                                        </FormGroup>
                                        <FormGroup FormGroup as={Row} className="mb-3" controlId="formHorizontalEmail">
                                            <Form.Label column sm={3} htmlFor="password">Password</Form.Label>
                                            <Form.Control
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.password && touched.password && "error"}
                                            />
                                            {errors.password && touched.password && (
                                                <div className="input-feedback">{errors.password}</div>

                                            )}
                                        </FormGroup >
                                        <div >
                                            <Button type="submit" variant="light">
                                                Login   </Button>
                                        </div>


                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }}
    </Formik >
);

export default ValidatedLoginForm;

// import { useState } from 'react';
 
// export default function Form() {
 
//   // States for registration
// //   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
 
//   // States for checking the errors
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState(false);
 
//   // Handling the name change
// //   const handleName = (e) => {
// //     setName(e.target.value);
// //     setSubmitted(false);
// //   };
 
//   // Handling the email change
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setSubmitted(false);
//   };
 
//   // Handling the password change
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setSubmitted(false);
//   };
 
//   // Handling the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if ( email === '' || password === '') {
//       setError(true);
//     } else {
//       setSubmitted(true);
//       setError(false);
//     }
//   };
 
//   // Showing success message
//   const successMessage = () => {
//     return (
//       <div
//         className="success"
//         style={{
//           display: submitted ? '' : 'none',
//         }}>
//         <h1>User successfully registered!!</h1>
//       </div>
//     );
//   };
 
//   // Showing error message if error is true
//   const errorMessage = () => {
//     return (
//       <div
//         className="error"
//         style={{
//           display: error ? '' : 'none',
//         }}>
//         <h1>Please enter all the fields</h1>
//       </div>
//     );
//   };
 
//   return (
//     <div className="form">
//       <div>
//         <h1>Login Form</h1>
//       </div>
 
//       {/* Calling to the methods */}
//       <div className="messages">
//         {errorMessage()}
//         {successMessage()}
//       </div>
//       <div className="col-md-12">
//  <div className="card card-container">
//       <form>
//         {/* Labels and inputs for form data */}
//         {/* <label className="label">Name</label>
//         <input onChange={handleName} className="input"
//           value={name} type="text" /> */}
 
//         <label className="label">Email</label>
//         <input onChange={handleEmail} className="input"
//           value={email} type="email" />
 
//         <label className="label">Password</label>
//         <input onChange={handlePassword} className="input"
//           value={password} type="password" />
 
//         <button onClick={handleSubmit} className="btn" type="submit">
//           Submit
//         </button>
//       </form>
//       </div>
//       </div>
//     </div>
//   );
// }