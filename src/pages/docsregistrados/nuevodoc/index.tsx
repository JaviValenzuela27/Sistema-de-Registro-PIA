import { AdminLayout } from '@layout'
import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function NuevoDoc() {
    const [hovered, setHovered] = useState(false);
    return (
        <AdminLayout>
            <Form>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formCodigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFechaRegistro">
                        <Form.Label>Fecha de Registro</Form.Label>
                        <Form.Control type="text" placeholder="DD/MM/AA" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formRegistradoPor">
                        <Form.Label>Registrado Por:</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formFechaInicialFormato">
                        <Form.Label>Fecha y Hora que se llenó el formato(o fecha inicial si es rango de fecha)</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFechaFinalFormato">
                        <Form.Label>Fecha y Hora final en caso de ser rango de fechas</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                </Row>

                <Row className="mb-2">

                    <Form.Group as={Col} controlId="formDepartamento">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>SMS</option>
                            <option>OPERACIONES</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFile">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Row>

                <Row className="mb-2">

                    <Form.Group as={Col} controlId="formDepartamento">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>FR-RH-001-Formato Lista de Asistencia</option>
                            <option>FR-OPS-003-Check list operaciones en Plataforma</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formDepartamento">
                        <Form.Label>Aeropuerto</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Aeropuerto Internacional Palmerola</option>
                            <option>Aeropuerto Internacional Toncontín</option>
                        </Form.Select>
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Col xs={6} md={6} className="d-flex justify-content-first">
                        <Button style={{
                                    backgroundColor: hovered ? '#E3342F' : '#8A0808',
                                    borderColor: '#8A0808',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={() => setHovered(true)}
                                onMouseOut={() => setHovered(false)} type="submit">
                            Cancelar
                        </Button>
                    </Col>
                    <Col xs={6} md={6} className="d-flex justify-content-end">
                        <Button style={{
                                    backgroundColor: hovered ? '#0369a1' : '#02022c',
                                    borderColor: '#02022c',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={() => setHovered(true)}
                                onMouseOut={() => setHovered(false)}>
                            Guardar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </AdminLayout>
    )
}

export default NuevoDoc