import renderer from "react-test-renderer";
import Login from "../component/Login/Login";
import { cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
afterEach(() => {
  cleanup();
});

test("basic test to test tests", () => {
  expect(true).toBe(true);
});

test("test login page exists", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    .toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});
