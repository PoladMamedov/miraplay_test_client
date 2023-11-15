import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../api/users";
import Loader from "../Loader/Loader";
import { useState } from "react";

function RegisterForm() {
  const [user, setUser] = useState({});

  const registerUserMutation = useMutation({
    mutationFn: (user) => registerUser(user),
    onMutate: () => setUser({}),
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("You need to enter your name to continue"),
      email: Yup.string().email("You need to enter valid email").required("You need to enter your email to continue"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      registerUserMutation.mutate({ name: values.name, email: values.email, password: values.password });
    },
  });

  return (
    <>
      <form className="log-in-form" onSubmit={formik.handleSubmit}>
        <div className="input-wrapper">
          <label>Name:</label>
          {formik.errors.name && formik.touched.name ? (
            <label className="form-input-error">{formik.errors.name}</label>
          ) : null}
          <input
            className="form-input"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label>Email:</label>
          {formik.errors.email && formik.touched.email ? (
            <label className="form-input-error">{formik.errors.email}</label>
          ) : null}
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label>Password:</label>
          {formik.errors.password && formik.touched.password ? (
            <label className="form-input-error">{formik.errors.password}</label>
          ) : null}
          <input
            className="form-input"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className="form-button log-in-form-btn">
          REGISTER
        </button>
        {user?.success && <p className="form-success-message">User created succesfully, now you can login!</p>}
        {user?.error && <p className="form-error-message">{user.error}</p>}
      </form>
      {registerUserMutation.isPending && <Loader />}
    </>
  );
}

export default RegisterForm;
