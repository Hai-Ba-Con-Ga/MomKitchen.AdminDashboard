import React from "react";
import Text from "./Text";

describe("<Text />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Text variant="large/default">Hello World</Text>);
    cy.contains("Hello World");
  });
});
