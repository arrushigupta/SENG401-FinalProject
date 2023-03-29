import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../component/Login/SignUp.js";
import { MemoryRouter } from "react-router-dom";
import { router } from "../../../Server/routes/routes.js";
import { DINOSPost } from "../scripts/backend-functions.js";
import { registerRoute } from "../utils/Routes.js";


describe("SignUp", () => {

    it("renders form fields correctly", () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Email address")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    });

    it("updates state when input values change", () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        const usernameInput = screen.getByLabelText("Username");
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        expect(usernameInput.value).toBe("testuser");
    });

    it("submits the form correctly", async () => {
        render(
                <MemoryRouter>
                    <SignUp />
                </MemoryRouter>
        );
        const usernameInput = screen.getByLabelText("Username");
        const emailInput = screen.getByLabelText("Email address");
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        const signupButton = screen.getByText("Signup");
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "testpassword" } });
        fireEvent.click(signupButton);

    });
});
