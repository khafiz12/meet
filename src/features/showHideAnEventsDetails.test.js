import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../mock-data";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");
defineFeature(feature, (test) => {
  test("As a user, I want event details to be collapsed by default", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user is viewing the events list", () => {
      AppComponent = render(<App />);
    });

    when("they open the app", async () => {
      await waitFor(() => {
        const eventItems = AppComponent.queryAllByRole("listitem");
        expect(eventItems.length).toBeGreaterThan(0);
      });
    });

    then("event details should be collapsed by default.", async () => {
      const eventItems = AppComponent.queryAllByRole("listitem");
      eventItems.forEach((eventItem) => {
        const details = within(eventItem).queryByText(/Details:/);
        expect(details).toBeNull();
      });
    });
  });
  test("As a user, I want to be able to expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user is viewing an event with collapsed details", () => {
      AppComponent = render(<App />);
    });

    when("they click on the event", async () => {
      await waitFor(() => {
        const showDetailsButtons = AppComponent.getAllByText("Show Details");
        expect(showDetailsButtons.length).toBeGreaterThan(0);
        userEvent.click(showDetailsButtons[0]);
      });
    });

    then(
      "the event details should expand to show more information.",
      async () => {
        await waitFor(() => {
          const details = AppComponent.queryByText(/Details:/);
          expect(details).not.toBeNull();
        });
      }
    );
  });
  test("As a user, I want to be able to collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user is viewing an event with expanded details", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const showDetailsButtons = AppComponent.getAllByText("Show Details");
        expect(showDetailsButtons.length).toBeGreaterThan(0);
        userEvent.click(showDetailsButtons[0]);
      });
    });

    when("they click on the event again", async () => {
      await waitFor(() => {
        const hideDetailsButton = AppComponent.getByText("Hide Details");
        userEvent.click(hideDetailsButton);
      });
    });

    then(
      "the event details should collapse to hide extra information.",
      async () => {
        await waitFor(() => {
          const details = AppComponent.queryByText(/Details:/);
          expect(details).toBeNull();
        });
      }
    );
  });
});
