import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Login from "./Components/login/Login";

test("By Default Signin button is visible", () => {
  render(<App />);
  const signinElement = screen.getByRole("button", { name: "Sign in" });
  expect(signinElement).toBeInTheDocument();
});

test("verify text Create an account", () => {
  render(<App />);
  const el = screen.getByText("Create an account");
  expect(el).toBeInTheDocument();
});

test("clicking on sign up, sign in button changes to sign up", () => {
  render(<App />);
  const signupElement = screen.getByText("Sign up");
  fireEvent.click(signupElement);

  const signupButton = screen.getByRole("button", { name: "Sign up" });
  expect(signupButton).toBeInTheDocument();

  const signinElement = screen.getByText("Sign in");
  expect(signinElement).toBeInTheDocument();
});

test("login credentials", () => {
  const myMockFn = jest.fn((value) =>
    ["34", "566", "6643", "5465"].includes(value)
  );

  render(<App />);
  const employeeIdtextbox = screen.getByTestId("employee-id");
  fireEvent.change(employeeIdtextbox, { target: { value: "322" } });
  const inputvalue = employeeIdtextbox.value;
  const signinButton = screen.getByRole("button", { name: "Sign in" });

  const spycontainer = jest.spyOn(Login.prototype, "loginHandler");

  fireEvent.click(signinButton);
  expect(spycontainer).toHaveBeenCalled();
});
