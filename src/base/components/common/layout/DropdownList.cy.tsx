import { DropdownList, DropdownListOptions } from "@/base/components/common/layout";

describe("<Box /> testing", () => {
  it("renders", () => {
    const options: DropdownListOptions[] = [
      {
        label: "Check 1",
        action: (e) => {
          console.log(e);
        },
      },
      {
        label: "Check 2",
        action: (e) => {
          console.log(e);
        },
      },
      {
        label: "Check 3",
        action: (e) => {
          console.log(e);
        },
      },
      {
        label: "Check 4",
        action: (e) => {
          console.log(e);
        },
      },
      {
        label: "Check 5",
        action: (e) => {
          console.log(e);
        },
      },
    ];
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DropdownList options={options}></DropdownList>);
    cy.children().should("have.length.at.least", "5");
  });
});
