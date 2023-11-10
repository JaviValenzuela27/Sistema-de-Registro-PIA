import { AdminLayout } from '@layout'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

interface Department {
    id: string;
    name: string;
}

interface Format {
    id: string;
    name: string;
}

const NuevoDoc: React.FC = () => {
    const [files, setFile] = useState<File | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartment, setselectedDepartment] = useState<string>('');
    const [formats, setFormats] = useState<Format[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string>('');
    const [hovered, setHovered] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setselectedDepartment(selectedValue);

        const formatsUrl = `http://10.120.1.68:191/api/departments/formats/${selectedValue}`;
        fetchData(formatsUrl).then((data) => {
            setFormats(data);
        });
    };

    const handleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedFormat(event.target.value);
    };

    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la solicitud GET');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en la función fetchData:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchData('http://10.120.1.68:191/api/departments/all').then((data: Department[]) => {
            setDepartments(data);
        });
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const errorMessage = document.getElementById('errorMessage');

        if (files && departments && formats) {
            const formData = new FormData();
            formData.append('files', files);
            formData.append('department_id', selectedDepartment);
            formData.append('format_id', selectedFormat);

            try {
                const response = await fetch('http://10.120.1.68:191/api/upload/files', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('Archivo y datos enviados con éxito');
                    if (errorMessage) {
                        errorMessage.textContent = '';
                    }
                } else {
                    if (errorMessage) {
                        errorMessage.textContent = 'Error al enviar el archivo y los datos';
                    }
                }
            } catch (error) {
                if (errorMessage) {
                    errorMessage.textContent = 'Error al enviar el archivo y los datos';
                }
                console.error('Error al enviar el archivo y los datos:', error);
            }
        } else {
            if (errorMessage) {
                errorMessage.textContent = 'Por favor, complete todos los campos';
            }
        }
    };


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
                        <Form.Select value={selectedDepartment} onChange={handleSelectChange}>
                            <option value="Choose...">Choose...</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFile">
                        <Form.Label>Default file input example</Form.Label>

                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-2">
                    <Form.Group as={Col} controlId="formDocumento">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Select value={selectedFormat} onChange={handleFormatChange}>
                            <option value="Choose...">Choose...</option>
                            {formats.map((format) => (
                                <option key={format.id} value={format.id}>
                                    {format.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="formDocumento">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>FR-RH-001-Formato Lista de Asistencia</option>
                            <option>FR-OPS-003-Check list operaciones en Plataforma</option>
                        </Form.Select>
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="Aeropuerto">
                        <Form.Label>Aeropuerto</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Aeropuerto Internacional Palmerola</option>
                            <option>Aeropuerto Internacional Toncontín</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formCodigo">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={5} cols={50} className="custom-textarea" />
                </Form.Group>

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