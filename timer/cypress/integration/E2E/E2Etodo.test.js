describe('todo list tests', () => {
    beforeEach(() => {
        cy.visit('../../index.html')
    })
    it('add 1 task', () =>{
        cy.get('#textInput').clear().type('test task 1')
        cy.get('#add').click()
        cy.get('ul').children().should('have.length', 1)
        cy.get('ul li:last').contains('test task 1')
        cy.get('ul li:last').then($el => {
            expect($el).to.have.class('')
        })
    })

    it('check-off one task', () => {
        cy.get('#textInput').clear().type('test task 1')
        cy.get('#add').click()
        cy.get('ul').children().should('have.length', 1)
        cy.get('ul li:last').click()
        cy.get('ul li:last').contains('test task 1')
        cy.get('ul li:last').then($el => {
            expect($el).to.have.class('checked')
        })
    })

    it('add 2 items, delete 1', () => {
        cy.get('#textInput').clear().type('test task 1')
        cy.get('#add').click()
        cy.get('#textInput').clear().type('test task 2')
        cy.get('#add').click()
        cy.get('ul').children().should('have.length', 2)
        cy.get('ul li:last').children().click()
        cy.get('ul li:last').should('have.css', 'display', 'none')
    })

    it('try deleting a checked item', () => {
        cy.get('#textInput').clear().type('test task 1')
        cy.get('#add').click()
        cy.get('ul li:last').click()
        cy.get('ul').children().should('have.length', 1)
        cy.get('ul li:last').contains('test task 1')
        cy.get('ul li:last').then($el => {
            expect($el).to.have.class('checked')
        })
        cy.get('ul li:last').children().click()
        cy.get('ul li:last').should('have.css', 'display', 'none')
    })

    it('try adding empty task', () => {
        cy.get('#textInput').clear()
        cy.get('#add').click()
        cy.get('ul').children().should('have.length', 0)
    })
})