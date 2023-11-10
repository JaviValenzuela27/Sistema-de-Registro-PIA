import { AdminLayout } from '@layout'
import Link from 'next/link'
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';

function DocsRegistrados() {
    const [hovered, setHovered] = useState(false);
    return (
        <AdminLayout>
            <div>
                <Row className='justify-content-center align-items-center'>
                    <Col xs={12} md={6} className='bg-light rounded-lg text-center text-md-left'>
                        <p className='h4 font-weight-bold d-flex align-items-center justify-content-center justify-content-md-start'>Documentos Registrados</p>
                    </Col>

                    <Col xs={12} md={6} className='bg-light rounded-lg text-center' >
                        <Link href='/docsregistrados/nuevodoc'>
                            <Button
                                style={{
                                    backgroundColor: hovered ? '#0369a1' : '#02022c',
                                    borderColor: '#02022c',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={() => setHovered(true)}
                                onMouseOut={() => setHovered(false)}
                            >
                                Registrar Nuevo Documento
                            </Button>

                        </Link>
                    </Col>
                </Row>
            </div>

        </AdminLayout>
    )
}

export default DocsRegistrados