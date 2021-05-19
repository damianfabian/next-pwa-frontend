import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import App from "../pages/index";

let mockRouter = null;


describe("App", () => {
  beforeEach(() => {
    mockRouter = {
        push: jest.fn() // the component uses `router.push` only
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  })
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Let's celebrate all together!" })
    ).toBeInTheDocument();
  });

  it("renders all the buttons", () => {
    render(<App />);
    expect(
        screen.getByRole("button", { name: "Sign In" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: "Create an account" })
    ).toBeInTheDocument();
  });
  it("renders all the buttons", () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Sign In/i))
    expect(mockRouter.push).toHaveBeenCalledWith('/login');

    fireEvent.click(screen.getByText(/Create an account/i))
    expect(mockRouter.push).toHaveBeenCalledWith('/register');

  });
});