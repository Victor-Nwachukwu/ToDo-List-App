import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList implementation tests", () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  test("renders initial demo todos", () => {
    const list = screen.getByRole("list", { name: /todo-list/i });
    expect(list).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "toggle-Spend 3 Hours Coding Everyday" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "toggle-Go deeper into AI Study" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "toggle-30mins Daily Exercise" })
    ).toBeInTheDocument();

    const tailwindBtn = screen.getByRole("button", {
      name: "toggle-Go deeper into AI Study",
    });
    expect(tailwindBtn).toHaveAttribute("aria-pressed", "true");
    expect(tailwindBtn).toHaveClass("line-through");
  });

  test("adds a new todo (and clears input)", () => {
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Study Jest" } });
    fireEvent.click(addButton);

    expect(
      screen.getByRole("button", { name: "toggle-Study Jest" })
    ).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("prevents adding empty or whitespace-only todos", () => {
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    const beforeCount = screen.getAllByRole("listitem").length;

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    const afterCount = screen.getAllByRole("listitem").length;
    expect(afterCount).toBe(beforeCount);
  });

  test("toggles a todo's completed state when clicked", () => {
    const learnBtn = screen.getByRole("button", { name: "toggle-Spend 3 Hours Coding Everyday" });

    expect(learnBtn).toHaveAttribute("aria-pressed", "false");
    expect(learnBtn).not.toHaveClass("line-through");

    fireEvent.click(learnBtn);
    expect(learnBtn).toHaveAttribute("aria-pressed", "true");
    expect(learnBtn).toHaveClass("line-through");

    fireEvent.click(learnBtn);
    expect(learnBtn).toHaveAttribute("aria-pressed", "false");
    expect(learnBtn).not.toHaveClass("line-through");
  });

  test("deletes a todo and updates the list", () => {
    const toggleBtn = screen.getByRole("button", {
      name: "toggle-30mins Exercise Daily",
    });
    expect(toggleBtn).toBeInTheDocument();

    // Click its delete button
    const deleteBtn = screen.getByRole("button", {
      name: "delete-30mins Exercise Daily",
    });
    fireEvent.click(deleteBtn);

    expect(
      screen.queryByRole("button", { name: "toggle-30mins Exercise Daily" })
    ).not.toBeInTheDocument();
  });

  test("shows empty-state message after deleting all todos", () => {
    const deletes = screen.getAllByRole("button", { name: /delete-/i });
    deletes.forEach((btn) => fireEvent.click(btn));

    expect(
      screen.queryByRole("list", { name: /todo-list/i })
    ).not.toBeInTheDocument();

    const empty = screen.getByRole("status", { name: /empty-message/i });
    expect(empty).toBeInTheDocument();
    expect(empty).toHaveTextContent(/no todos/i);
  });
});