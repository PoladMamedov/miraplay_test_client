import { useState } from "react";
import LogInForm from "../../components/LogInFrom/LogInForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function LoginPage() {
  const [registerForm, setRegisterForm] = useState(false);
  return (
    <section>
      <div className="container">
        <div className="forms-wrapper">
          <h2 className="forms-title">
            Welcome to Miraplay! <br /> Register or log in to continue:
          </h2>
          <div className="form-change-btns">
            <button
              onClick={() => {
                setRegisterForm(false);
              }}
              className={registerForm ? "form-change-btn" : "form-change-btn active-form-btn"}
            >
              Log in
            </button>
            <button
              onClick={() => {
                setRegisterForm(true);
              }}
              className={registerForm ? "form-change-btn active-form-btn" : "form-change-btn"}
            >
              Register
            </button>
          </div>
          {registerForm ? <RegisterForm /> : <LogInForm />}
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
