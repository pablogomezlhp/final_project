import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import { useAuth } from "../../hooks/Auth";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { FiArrowLeft } from "react-icons/fi";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const SigInSchema = Yup.object().shape({
  password: Yup.string().min(6, "password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface SignInFormDada {
  email: string;
  password: string;
}

interface userData {
  username: string;
  email: string;
  id: string;
  mobile: string;
  roleId: number;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  
  const history = useHistory();
  const initialValues: SignInFormDada = {
    email: "",
    password: "",
  };

  const handleSubmit = useCallback(
    async (data: SignInFormDada) => {
      try {
        // await schema.validate(data, {
        //   abortEarly: false,
        // });

        const user = await signIn({
          email: data.email,
          password: data.password,
        });
        
        if(user?.roleId === 1) {
          history.push("/dashboard");
        } else {
          history.push("/agent/dashboard");
        }
      } catch (err) {
        cogoToast.error(Object.values(err.response.data), { position: 'top-right' });
      }
    },
    [signIn, history]
  );

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center w-full lg:mt-10">
        <div className="bg-white shadow-md w-full lg:w-1/2 rounded-2xl px-8 pt-6 pb-8 mb-4 my-2 mx-4 lg:mx-0 h-auto">
          <div className="w-6">
            <Link to="/">
              <FiArrowLeft size={24} className="cursor-pointer" />
            </Link>
          </div>
          <div className="w-full flex flex-col justify-center mb-48">
            <h3 className="flex justify-center text-center  text-2xl mt-8 md:mt-0  md:text-3xl font-bold select-none">
              Sign In
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={SigInSchema}
              onSubmit={(values) => {
                console.log("values", values);

                // same shape as initial values
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="px-3 mb-6 md:mb-0 lg:mx-32 mt-4">
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
                    Password
                    <Field
                      className="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3  w-full focus:border-purple-200"
                      name="password"
                      type="password"
                    />
                  </label>
                  {errors.password && touched.password ? (
                    <div className="text-red-400">{errors.password}</div>
                  ) : null}

                  <Button
                    type="submit"
                    className="transition duration-500 ease-in-out bg-purple-200 h-12 w-full rounded-3xl border-none px-2 mt-1 hover:bg-purple-300 text-white text-base focus:outline-none "
                  >
                    Login
                  </Button>
                  <div className="flex items-center justify-center mt-4 text-center">
                    <button className="flex items-center justify-center  text-center">
                      Forgot your password
                    </button>
                  </div>
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

export default SignIn;
