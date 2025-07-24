Cypress.Commands.add('screenshotWithDate', (testTitle, stage = '') => {
    //Date format: mm/dd/yyyy
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const dd = String(now.getDate()).padStart(2, '0'); //day
    const yyyy = now.getFullYear(); //year
    const today = `${mm}${dd}${yyyy}`;

    const safeTestName = testTitle; 
    const safeStage = stage ? `${stage}_` : ''; //indicates when ss is taken
    const dev = "_Faye";

    const fileName = `${safeTestName}_${safeStage}${today}${dev}`; //stage_test title_date

    // Save directly in cypress/screenshots/
    cy.screenshot(`parabank/${fileName}`);
});
