import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label, Input, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

// While you can use any validation library (or write you own), Formik
// comes with special support for Yup by @jquense. It has a builder API like
// React PropTypes / Hapi.js's Joi. You can define these inline or, you may want
// to keep them separate so you can reuse schemas (e.g. address) across your application.
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(20, "Nice try, nobody has a first name that long")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(20, "Nice try, nobody has a last name that long")
    .required("Last Name is required"),
  password: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/, {
      message: "One upper, one lower, one number, one symbol, 8 characters",
      excludeEmptyString: false
    })
    .required("Enter your password"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match")
    .required("Confirm your password")
});

const RegisterForm = props => (
  <div>
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: ""
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        props.registerClicked(values);
      }}
      render={({ errors, touched, isSubmitting, values }) => (
        <Form noValidate>
          <Label htmlFor="firstName">First Name</Label>
          <Input name="firstName" placeholder="Jane" type="text" tag={Field} />
          <ErrorMessage
            name="firstName"
            component="div"
            className="field-error"
            style={{ color: "red", marginLeft: "6px" }}
          />

          <Label htmlFor="lastName">Last Name</Label>
          <Input name="lastName" placeholder="Doe" type="text" tag={Field} />
          <ErrorMessage
            name="lastName"
            component="div"
            className="field-error"
            style={{ color: "red", marginLeft: "6px" }}
          />

          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="jane@acme.com" type="email" tag={Field} />
          <ErrorMessage
            name="email"
            component="div"
            className="field-error"
            style={{ color: "red", marginLeft: "6px" }}
          />

          <Label htmlFor="password">Password</Label>
          <Input name="password" placeholder="Password" type="password" tag={Field} />
          <ErrorMessage
            name="password"
            component="div"
            className="field-error"
            style={{ color: "red", marginLeft: "6px" }}
          />

          <Label htmlFor="passwordConfirm">Email</Label>
          <Input
            name="passwordConfirm"
            placeholder="Confirm Password"
            type="password"
            tag={Field}
          />
          <ErrorMessage
            name="passwordConfirm"
            component="div"
            className="field-error"
            style={{ color: "red", marginLeft: "6px" }}
          />
          <br />
          <Button
            color="danger"
            className="px-4 py-2 text-uppercase white font-small-4 box-shadow-1 border-0 float-right"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    />
  </div>
);

export default withRouter(RegisterForm);
