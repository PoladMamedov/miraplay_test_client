import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { logInUser } from "../../api/users";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

function LogInForm() {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const loginUserMutation = useMutation({
    mutationFn: (user) => logInUser(user),
    onMutate: () => setError(false),
    onSuccess: (data) => {
      if (!data.error) {
        dispatch(addUser(data));
        return;
      }
      setError(data.error);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("You need to enter valid email").required("You need to enter your email to continue"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      loginUserMutation.mutate({ email: values.email, password: values.password });
    },
  });

  return (
    <>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
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
        <button type="submit" className="form-button auth-form-btn">
          LOG IN
        </button>
        {error && <p className="form-error-message">{error}</p>}
      </form>
      {loginUserMutation.isPending && <Loader />}
    </>
  );
}

export default LogInForm;
