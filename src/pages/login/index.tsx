import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useForm } from "react-hook-form";

const Login: NextPage = () => {
  const [hovered, setHovered] = useState(false);
  // const router = useRouter()
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const submitHandler = async () => {
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success === false) {
              alert("Usuario o contraseña incorrecta");
            } else {
              console.log("Access Token:", data.accessToken);
              localStorage.setItem("pia_token", data.accessToken);
              router.push("/home");
            }
            console.log(data); // Imprime todo el contenido de la respuesta JSON
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        console.log(formData);
        // console.log(response.success)
      } catch (error) {
        console.error(error);
        alert("Error: Something went wrong.");
      }
    } else {
      alert("Please fill in the form correctly.");
    }
  };

  // const getRedirect = () => {
  //   const redirect = getCookie('redirect')
  //   if (redirect) {
  //     deleteCookie('redirect')
  //     return redirect.toString()
  //   }

  //   return '/'
  // }

  // const login = async (e: SyntheticEvent) => {
  //   e.stopPropagation()
  //   e.preventDefault()

  //   setSubmitting(true)

  //   const res = await axios.post('api/mock/login')
  //   if (res.status === 200) {
  //     router.push(getRedirect())
  //   }
  //   setSubmitting(false)
  // }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col
                style={{
                  backgroundColor: "#02022c",
                }}
                md={5}
                className="d-flex align-items-center p-5"
              >
                <div className="text-center">
                  <Image
                    width={200}
                    height={100}
                    className="rounded-circle"
                    src="/assets/img/logo_pia_blanco.png"
                    alt="user@email.com"
                  />
                </div>
              </Col>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Iniciar Sesión</h1>
                  <p className="text-black-50">
                    Inicia <s></s>sesión con tu cuenta
                  </p>

                  <form onSubmit={handleSubmit(submitHandler)}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        required
                        disabled={submitting}
                        placeholder="Usuario"
                        aria-label="Username"
                        // defaultValue="Usuario"
                        value={formData.username} // Asegúrate de manejar el valor del formulario
                        onChange={(e) => {
                          setValue("username", e.target.value);
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Contraseña"
                        aria-label="Password"
                        // defaultValue="Password"
                        value={formData.password} // Asegúrate de manejar el valor del formulario
                        onChange={(e) => {
                          setValue("username", e.target.value);
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>

                    <Container>
                      <Row className="justify-content-center">
                        <Col xs={6} className="text-center">
                          <Button
                            onClick={handleSubmit(submitHandler)}
                            style={{
                              backgroundColor: hovered ? "#0369a1" : "#02022c",
                              borderColor: "#02022c",
                              transition: "background-color 0.3s",
                            }}
                            onMouseOver={() => setHovered(true)}
                            onMouseOut={() => setHovered(false)}
                          >
                            Iniciar Sesión
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

// <section className="relative">
//   <div className="max-w-6xl mx-auto px-4 sm:px-6">
//     <div className="pt-32 pb-12 md:pt-40 md:pb-20">
//       {/* Page header */}
//       <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
//         <h1 style={{ fontSize: "2.5rem" }}>
//           ¡Bienvenido, es un gusto tenerte de vuelta!
//         </h1>
//         <AuthenticatedTemplate>
//           {/* <h6>You're logged in!</h6>
//           {accountDetails && <center>Name: {accountDetails.name}</center>}
//           <button onClick={() => handleLogout()}>Logout</button> */}
//         </AuthenticatedTemplate>

//         <UnauthenticatedTemplate>
//           <div className="max-w-sm mx-auto">
//             <div className="flex flex-wrap -mx-3">
//               <div className="w-full">
//                 <button
//                   onClick={() => handleLogin()}
//                   className="btn flex items-center px-7 py-2 text-white bg-sky-950 hover:bg-sky-800 w-full relative"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="35"
//                     height="24"
//                     id="microsoft"
//                   >
//                     <path
//                       fill="#f1511b"
//                       d="M11.497 11.497H0V0h11.497Z"
//                       data-name="Path 6"
//                     ></path>
//                     <path
//                       fill="#80cc28"
//                       d="M24 11.497h-11.5V0h11.5v11.497Z"
//                       data-name="Path 7"
//                     ></path>
//                     <path
//                       fill="#00adef"
//                       d="M11.497 24H0V12.699h11.497Z"
//                       data-name="Path 8"
//                     ></path>
//                     <path
//                       fill="#fbbc09"
//                       d="M24 24h-11.5V12.699h11.5v11.301Z"
//                       data-name="Path 9"
//                     ></path>
//                   </svg>

//                   <span
//                     className="h-8 flex items-center border-r border-white border-opacity-60 mr-4 px-2.5"
//                     aria-hidden="true"
//                   ></span>
//                   <span className="flex-auto items-center-ml-16 px-12">
//                     Inicia Sesión con Microsoft
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </UnauthenticatedTemplate>
//       </div>
//     </div>
//   </div>
// </section>
//     );
// }
