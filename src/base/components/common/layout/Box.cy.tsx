import { Box } from "@/base/components/common/layout";

describe("<Box /> testing", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Box>Test Box</Box>);
    cy.contains("Test Box");
  });
});
