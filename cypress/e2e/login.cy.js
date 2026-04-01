/**
 * Skenario pengujian E2E Login
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="email@example.com"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa browser memunculkan validasi
    cy.get('input[placeholder="email@example.com"]:invalid').should('exist');
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="email@example.com"]').type('testuser@example.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa browser memunculkan validasi
    cy.get('input[placeholder="Password"]:invalid').should('exist');
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="email@example.com"]').type('wrongemail@test.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // menekan tombol login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="email@example.com"]').type('kennnnn@gmail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('123456');

    // menekan tombol login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa elemen yang ada di homepage ditampilkan
    cy.get('nav')
      .contains(/Forum Diskusi/)
      .should('be.visible');

    // memverifikasi tombol logout muncul (berarti berhasil login)
    cy.get('button[title="Logout"]').should('be.visible');
  });
});
