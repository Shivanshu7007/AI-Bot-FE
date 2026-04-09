/**
 * Tests for FloatingChatWidget
 *
 * Run with: npm test -- --watchAll=false
 * Requires: @testing-library/react, @testing-library/user-event (included with create-react-app)
 */
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingChatWidget from "../FloatingChatWidget";

// Silence noisy console output during tests
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.resetAllMocks();
});

const DEFAULT_PROPS = {
  productId: 42,
  productName: "Test Kit",
  isOpen: true,
  onClose: jest.fn(),
  onToggle: jest.fn()
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockFetch(body, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status < 400,
    status,
    json: async () => body
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

test("renders disclaimer and greeting when widget is open with a product", () => {
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  expect(screen.getByText(/AI-powered/i)).toBeInTheDocument();
  expect(screen.getByText(/ready to answer/i)).toBeInTheDocument();
});

test("shows floating toggle button when widget is closed", () => {
  render(<FloatingChatWidget {...DEFAULT_PROPS} isOpen={false} />);
  // The 🤖 toggle button should be visible
  expect(screen.getByRole("button", { name: /🤖/i })).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Sending messages
// ---------------------------------------------------------------------------

test("adds user message to chat when Enter is pressed", async () => {
  mockFetch({ reply: "According to the product manual, store at 4°C." });
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "How do I store the kit?");
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  expect(screen.getByText("How do I store the kit?")).toBeInTheDocument();
});

test("adds user message when send button is clicked", async () => {
  mockFetch({ reply: "According to the product manual, store at 4°C." });
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "Storage question");

  const sendButton = screen.getByRole("button", { name: /➤/i });
  fireEvent.click(sendButton);

  expect(screen.getByText("Storage question")).toBeInTheDocument();
});

test("clears input after sending", async () => {
  mockFetch({ reply: "Answer here." });
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "My question");
  fireEvent.keyDown(input, { key: "Enter" });

  expect(input.value).toBe("");
});

test("does not send empty or whitespace-only messages", async () => {
  global.fetch = jest.fn();
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "   ");
  fireEvent.keyDown(input, { key: "Enter" });

  expect(global.fetch).not.toHaveBeenCalled();
});

// ---------------------------------------------------------------------------
// Bot responses
// ---------------------------------------------------------------------------

test("displays bot reply after successful API call", async () => {
  mockFetch({ reply: "According to the product manual, store at 4°C." });
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "Storage?");
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/store at 4°C/i)).toBeInTheDocument();
  });
});

test("shows escalation buttons for fallback replies", async () => {
  mockFetch({
    reply: "I was not able to find this in the product documentation. Please contact Cellogen support."
  });
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "Unrelated question");
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/Email Cellogen Support/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp Us/i)).toBeInTheDocument();
  });
});

test("shows no_knowledge_base message with escalation buttons", async () => {
  mockFetch({ status: "no_knowledge_base" });
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "Anything");
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/not been uploaded yet/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp Us/i)).toBeInTheDocument();
  });
});

test("shows error message on network failure", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "Question");
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/Server error/i)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Message keys — verify no duplicate-key React warnings
// ---------------------------------------------------------------------------

test("each message has a unique id (no index-based key warnings)", async () => {
  mockFetch({ reply: "Answer 1." });
  const warnSpy = jest.spyOn(console, "warn");
  render(<FloatingChatWidget {...DEFAULT_PROPS} />);

  const input = screen.getByPlaceholderText(/Ask a question/i);
  await userEvent.type(input, "Q1");
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => screen.getByText("Answer 1."));
  expect(warnSpy).not.toHaveBeenCalledWith(expect.stringMatching(/key/i));
});
