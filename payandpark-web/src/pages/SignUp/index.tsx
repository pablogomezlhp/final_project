import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import cogoToast from 'cogo-toast';

import api from '../../services/api';

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { FiArrowLeft } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone is required"),
});

interface MyFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const initialValues: MyFormValues = { 
    name: '', 
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const hanldeSubmit = useCallback(async (values: MyFormValues) => {
    try {

      const data = {
        username: values.name.trim(),
        email: values.email.trim(),
        mobile: values.phone.trim(),
        password: values.password.trim(),
        role_ID: 1,
      };

      // await SignupSchema.validate(data, {
      //   abortEarly:false,
      // });

      cogoToast.loading('Loading your data...' , { position: 'top-right' }).then(async () => {
        await api.post('/users', data);

        cogoToast.success('successful registration, now you can login!', { position: 'top-right' });
      });

      history.push('/signin');
      
    } catch (err) {
      cogoToast.error('Error while making registration, try again!', { position: 'top-right' });

      console.log(err);
    }
  }, [ history]);

  const validatePassword = useCallback(values => {
    let error = "";
    const passwordRegex = /(?=.*[0-9])/;
    if (!values) {
      error = "Password is required";
    } else if (values.length < 6) {
      error = "Password must be 6 characters long.";
    } else if (!passwordRegex.test(values)) {
      error = "Invalid password. Must contain one number.";
    }
    return error;
  }, []);

  const validateConfirmPassword = useCallback((pass, value) => {
    let error = "";
    if (pass && value) {
      if (pass !== value) {
        error = "Password not matched";
      }
    }
    return error;
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center w-full mt-10 ">
        <div className="bg-white shadow-md w-full lg:w-1/2 rounded-2xl px-8 pt-6 pb-8 mb-4 my-2 mx-4 lg:mx-0">
          <div className="w-6">
            <Link to="/">
              <FiArrowLeft size={24} className="cursor-pointer" />
            </Link>
          </div>
          <div className="w-full flex flex-col justify-center">
            <h3 className="flex justify-center text-center  text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
              Sign Up
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // same shape as initial values
                hanldeSubmit(values);
              }}
            >
              {({ errors, touched, validateForm, values }) => (
                <Form className="px-3 mb-6 md:mb-0 lg:mx-32 mt-4">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Name
                    <Field 
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 focus:border-purple-200"
                      name="name" 
                    />
                  </label>
                  {errors.name && touched.name ? (
                    <div className="text-red-400">{errors.name}</div>
                  ) : null}

                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Email
                    <Field 
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 focus:border-purple-200"
                      name="email" 
                      type="email" 
                    />
                  </label>
                  {errors.email && touched.email ? (
                    <div className="text-red-400">{errors.email}</div>
                  ) : null}

                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Phone
                    <Field 
                      className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 w-full focus:border-purple-200"
                      name="phone" 
                      type="tel" 
                    />
                  </label>
                  {errors.phone && touched.phone ? (
                    <div className="text-red-400">{errors.phone}</div>
                  ) : null}

                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Password
                    <Field 
                      className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3  w-full focus:border-purple-200"
                      name="password" 
                      type="password" 
                      validate={validatePassword}
                    />
                  </label>
                  {errors.password && touched.password ? (
                    <div className="text-red-400">{errors.password}</div>
                  ) : null}

                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Confirm Password
                    <Field 
                      className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3  w-full focus:border-purple-200"
                      type="password" 
                      name="confirmPassword" 
                      validate={(value:string) =>
                        validateConfirmPassword(values.password, value)
                      }
                    />
                    {errors.confirmPassword && (<div>{errors.confirmPassword}</div>)}
                  </label>
                  
                  <Button type="submit" className="transition duration-500 ease-in-out bg-purple-200 h-12 w-full rounded-3xl border-none px-2 mt-1 hover:bg-purple-300 text-white text-base focus:outline-none ">
                    Create account
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
