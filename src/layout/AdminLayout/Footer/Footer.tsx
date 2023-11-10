import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2 d-flex flex-column align-items-center justify-content-center">
      <Container fluid>
        <div className="text-center">
          <a className="text-decoration-none" href="#">
            Palmerola International Airport
          </a>
          {' '}
          © 2023
          Comaygaua, Comayagua.
        </div>
        <div className="ms-md-auto">
          {/* Contenido adicional si es necesario */}
        </div>
      </Container>
    </footer>
  )
}
