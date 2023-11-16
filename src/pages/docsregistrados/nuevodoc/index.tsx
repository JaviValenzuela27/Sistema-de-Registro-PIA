import { AdminLayout } from "@layout";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

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
  const [selectedDepartment, setselectedDepartment] = useState<string>("");
  const [formats, setFormats] = useState<Format[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [hovered, setHovered] = useState(false);

  const [airport, setAirport] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [firstDate, setFirstDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");

  const getToken = () => {
    const token = localStorage.getItem("pia_token");
    if (token) {
      // Comprobar la expiración del token si tiene información de expiración (por ejemplo, con un timestamp)
      // Si el token tiene información de expiración, puedes verificar si aún es válido
      // Si el token no tiene información de expiración, puedes considerar que está siempre activo o implementar otra lógica de expiración

      // Por ejemplo, supongamos que tu token tiene un campo 'expiresAt' que contiene la fecha de expiración en formato Unix timestamp
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Decodifica y extrae la información del token
      console.log(tokenData);
      const expiresAt = tokenData.exp; // Suponiendo que existe un campo 'expiresAt' en tu token
      const idUser = tokenData.sub;
      setUserId(idUser);
      // localStorage.setItem("idUser", idUser);
      console.log("id DEL uSUARIO:", idUser);
      console.log("id DEL uSUARIO con SET:", userId);

      if (expiresAt) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Obtener el timestamp actual en segundos
        console.log("Tiempo actual: ", currentTimestamp);
        console.log("Tiempo vencimiento token: ", expiresAt);
        if (expiresAt < currentTimestamp) {
          // El token ha expirado
          localStorage.removeItem("pia_token"); // Eliminar el token expirado del localStorage
          return null; // Retornar null o manejar la expiración de otra manera
        }
      }

      return token; // Retornar el token si está presente y no ha expirado
    } else {
      return null; // Retornar null si el token no está presente en el localStorage
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFirstDate = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue: string = event.target.value;
    const formattedDateTime: string = new Date(rawValue)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    setFirstDate(formattedDateTime); // Actualizar el estado con la nueva fecha seleccionada
  };

  const handleLastDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue: string = event.target.value;
    const formattedDateTime: string = new Date(rawValue)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    setLastDate(formattedDateTime);
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const selectedValue = event.target.value;
    setDescription(selectedValue);
  };

  const handleSelectAirport = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setAirport(selectedValue);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setselectedDepartment(selectedValue);

    const formatsUrl = `http://10.120.1.68:191/api/departments/formats/${selectedValue}`;
    fetchData(formatsUrl).then((data) => {
      setFormats(data.formats);
    });
  };

  const handleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(event.target.value);
  };

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error en la solicitud GET");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la función fetchData:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData("http://10.120.1.68:191/api/departments/all").then(
      (data: Department[]) => {
        setDepartments(data);
      }
    );
  }, []);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   const errorMessage = document.getElementById("errorMessage");

  //   if (files && departments && formats) {
  //     const formData = new FormData();
  //     formData.append("files", files);
  //     formData.append("department_id", selectedDepartment);
  //     formData.append("format_id", selectedFormat);
  //     formData.append("airport", airport);
  //     formData.append("user_id", user_id.toString());
  //     formData.append("description", description);
  //     formData.append("first_date_format", firstDate);
  //     formData.append("last_date_format", lastDate);

  //     try {
  //       const token = getToken();

  //       console.log("Contenido del FormData:");
  //       formData.forEach((value, key) => {
  //         console.log(key + ":", value);
  //       });

  //       if (!token) {
  //         console.log("No hay un Token");
  //       } else {
  //         const response = await fetch(
  //           "http://localhost:8000/api/upload/files",
  //           {
  //             method: "POST",
  //             body: formData,
  //             headers: {
  //               pia_token: token,
  //             },
  //           }
  //         );
  //         console.log(response);

  //         if (response.ok) {
  //           alert("Archivo y datos enviados con éxito");
  //           if (errorMessage) {
  //             errorMessage.textContent = "";
  //           }
  //         } else {
  //           if (errorMessage) {
  //             errorMessage.textContent =
  //               "Error al enviar el archivo y los datos";
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       if (errorMessage) {
  //         errorMessage.textContent = "Error al enviar el archivo y los datos";
  //       }
  //       console.error("Error al enviar el archivo y los datos:", error);
  //     }
  //   } else {
  //     if (errorMessage) {
  //       errorMessage.textContent = "Por favor, complete todos los campos";
  //     }
  //   }
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errorMessage = document.getElementById("errorMessage");
    const token = getToken();
    console.log(token);
    console.log("Contenido del FormData:");

    if (token) {
      if (files && departments && formats) {
        const formData = new FormData();
        formData.append("files", files);
        formData.append("department_id", selectedDepartment);
        formData.append("format_id", selectedFormat);
        formData.append("airport", airport);
        formData.append("user_id", userId.toString());
        formData.append("description", description);
        formData.append("first_date_format", firstDate);
        formData.append("last_date_format", lastDate);

        formData.forEach((value, key) => {
          console.log(key + ":", value);
        });

        try {
          const response = await fetch(
            "http://localhost:8000/api/upload/files",
            {
              method: "POST",
              body: formData,
              headers: {
                pia_token: token,
              },
            }
          );

          if (response.ok) {
            alert("Archivo y datos enviados con éxito");
            if (errorMessage) {
              errorMessage.textContent = "";
            }
          } else {
            if (errorMessage) {
              errorMessage.textContent =
                "Error al enviar el archivo y los datos";
            }
          }
        } catch (error) {
          if (errorMessage) {
            errorMessage.textContent = "Error al enviar el archivo y los datos";
          }
          console.error("Error al enviar el archivo y los datos:", error);
        }
      } else {
        if (errorMessage) {
          errorMessage.textContent = "Por favor, complete todos los campos";
        }
      }
    } else {
      console.log("No hay un Token");
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
            <Form.Label>
              Fecha y Hora que se llenó el formato(o fecha inicial si es rango
              de fecha)
            </Form.Label>
            <Form.Control
              type="datetime-local"
              value={firstDate}
              onChange={handleFirstDate}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formFechaFinalFormato">
            <Form.Label>
              Fecha y Hora final en caso de ser rango de fechas
            </Form.Label>
            <Form.Control
              type="datetime-local"
              value={lastDate}
              onChange={handleLastDate}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} controlId="formDepartamento">
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              value={selectedDepartment}
              onChange={handleSelectChange}
            >
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
                  {format.id} - {format.name}
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
            <Form.Select value={airport} onChange={handleSelectAirport}>
              <option value="Choose...">Choose...</option>
              <option>Aeropuerto Internacional Palmerola</option>
              <option>Aeropuerto Internacional Toncontín</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formCodigo">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            cols={50}
            className="custom-textarea"
            value={description}
            onChange={handleDescription}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col xs={6} md={6} className="d-flex justify-content-first">
            <Button
              style={{
                backgroundColor: hovered ? "#E3342F" : "#8A0808",
                borderColor: "#8A0808",
                transition: "background-color 0.3s",
              }}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              type="submit"
            >
              Cancelar
            </Button>
          </Col>

          <Col xs={6} md={6} className="d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: hovered ? "#0369a1" : "#02022c",
                borderColor: "#02022c",
                transition: "background-color 0.3s",
              }}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
    </AdminLayout>
  );
};

export default NuevoDoc;
