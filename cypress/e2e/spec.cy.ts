/// <reference types="Cypress" />

describe('WAV file extractor', () => {
  it('receives WAV file', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-test-id="dropTarget"]').selectFile(
      'src/modules/parser/__tests__/alarm00.wav',
      {
        action: 'drag-drop'
      }
    );

    // Showing the right heading?
    cy.contains('Results');

    // Showing one of the field headings we expect?
    cy.contains('Audio Format');

    // Showing one of the values we expect?
    cy.contains('11025');

    // Showing the expected number of rows
    cy.get('tr').should('have.length', 12);
  });

  it('rejects non-WAV file', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-test-id="dropTarget"]').selectFile(
      'index.html',
      {
        action: 'drag-drop'
      }
    );

    cy.contains('Error');
    cy.contains('Could not parse WAV file.');
  });
});
