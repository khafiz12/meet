import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../mock-data";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user hasn't searched for any city", () => {});

    when("they access the app", () => {
      AppComponent = render(<App />);
    });

    then("upcoming events from all cities should be displayed.", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let CitySearchDOM;
    given("the user is typing in the search bar", () => {
      AppComponent = render(<App />);
    });

    when("they type at least one character", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    then("a list of suggested cities should be displayed.", async () => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });
  });

  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    let suggestionListItems;
    given("the user has typed in a city in the search bar", async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    and("the list of suggested cities is showing", () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    when("they select a city from the suggested list", async () => {
      const user = userEvent.setup();
      await user.click(suggestionListItems[0]);
    });

    then("events for the selected city should be displayed.", () => {
      expect(citySearchInput.value).toBe("Berlin, Germany");
    });

    and(
      "the user should receive a list of upcoming events in that city.",
      async () => {}
    );
  });
});
