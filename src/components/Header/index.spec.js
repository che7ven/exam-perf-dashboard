import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Header", () => {
  let props;

  beforeEach(() => {
    props = { user: "chevy" };
  });

  it("should take a snapshot", () => {
    const { asFragment } = render(<Header {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call event handler on user profile click", () => {
    render(<Header {...props} />);
    const tab = screen.getByTestId("profile");

    fireEvent.click(tab);
    expect(tab.id).toBe("user-detail");
    expect(screen.queryByTestId("logout")).not.toBeNull();

    const outerEl = screen.getByTestId("profile-pop").firstChild;
    fireEvent.click(outerEl);
  });

  it("should navigate to login page on logout click", () => {
    const { getByTestId } = render(<Header {...props} />);
    const profile = getByTestId("profile");
    fireEvent.click(profile);

    const logout = getByTestId("logout");
    fireEvent.click(logout);

    expect(mockedUseNavigate).toHaveBeenNthCalledWith(1, "/", {
      state: "logOff",
    });
  });
});
