import { useState } from "react";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const App = () => {

  const [file, setFile] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);

  const getUrl = (file) => {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();
  
      reader.onload = () => {
        const url = reader.result;
        resolve(url);
      };
  
      reader.onerror = () => {
        reject(new Error('Error reading file.'));
      };
  
      return reader.readAsDataURL(file);

    });
  }

  const fileHandler = async (event) => {
    
    const f = event.target.files[0];
    const url = await getUrl(f);
    setFile(url);

  }


  const clearHandler = () => {

    setName("");
    setEmail("");
    setWebsite("");
    setAge("");
    setGender("");

    document.getElementById("image").value=null;
    setFile(null);

    document.getElementById("cpp").checked = false;
    document.getElementById("c").checked = false;
    document.getElementById("python").checked = false;
    document.getElementById("javascript").checked = false;
    document.getElementById("java").checked = false;
    
  }



  const submitHandler = (event) => {

    event.preventDefault();

    setCount(count + 1)
    
    const cpp = document.getElementById("cpp").checked;
    const c = document.getElementById("c").checked;
    const python = document.getElementById("python").checked;
    const javascript = document.getElementById("javascript").checked;
    const java = document.getElementById("java").checked;

    const newData = {name, email, website, age, gender, file, cpp, c, python, javascript, java, id: count+1};

    clearHandler();    

    setData((data) => [newData, ...data]);

  }
  return (
    <Container className="mt-5 mb-5">
      <Row>

        <hr />
        <h2 className="text-center">ENROLLMENT FORM</h2>
        <hr/>

        <Col md={6} className="mt-4">
          
          <Form onSubmit={submitHandler}>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name*
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Enter name..." required id="name" value={name} onChange={(event) => setName(event.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Email*
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="email" placeholder="Enter email..." required id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Website
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Enter website..." id="website" value={website} onChange={(event) => setWebsite(event.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-4 mb-3">
              <Form.Label column xs={2}>
                Age*
              </Form.Label>
              <Col xs={4}>
                <Form.Control type="number" placeholder="Enter age..." required id="age" value={age} onChange={(event) => setAge(event.target.value)} />
              </Col>

              <Form.Label column xs={2}>
                Gender*
              </Form.Label>
              <Col xs={4}>
                <Form.Select id="gender" value={gender} onChange={(event) => setGender(event.target.value)} >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Image*
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" accept=".png, .jpg, .jpeg" required id="image" onChange={fileHandler} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Skills*
              </Form.Label>
              <Col sm={10} className="mt-2" >
                <Form.Check inline label="C++" id="cpp" />
                <Form.Check inline label="C" id="c" />
                <Form.Check inline label="Python" id="python"/>
                <Form.Check inline label="Javascript" id="javascript" />
                <Form.Check inline label="Java" id="java" />
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-evenly mt-4">
              <Button variant="outline-danger" onClick={clearHandler}>Clear Form</Button>
              <Button variant="outline-primary" type="submit">Enroll Student</Button>
            </div>
            
          </Form>

        </Col>

        <Col md={6} className="mt-4" style={{maxHeight:"375px", overflow:"scroll", overflowY: "auto", overflowX: "hidden"}}>

          {data.length>0 && data.map((d) => (
            <Card className="p-3 mb-4">
              <Row>
                <Col xs={4}>
                  <img src={d.file} style={{width: "100%", height: "100%", border:"2px solid black"}} alt="IMG"/>
                </Col>
                <Col xs={8}>
                  
                  <h4>{d.name}</h4>
                  <h5>{d.email}</h5>

                  {d.website && <a href={d.website} target="_blank">{d.website}</a>}

                  <div className="d-flex justify-content-between mt-2 mb-3">
                    <i>Age: {d.age}</i>
                    <i>Gender: {d.gender}</i>
                  </div>

                  <Form.Check inline label="C++" checked={d.cpp} disabled={!d.cpp} />
                  <Form.Check inline label="C" checked={d.c} disabled={!d.c} />
                  <Form.Check inline label="Python" checked={d.python} disabled={!d.python} />
                  <br />
                  <Form.Check inline label="Javascript" checked={d.javascript} disabled={!d.javascript} />
                  <Form.Check inline label="Java" checked={d.java} disabled={!d.java} />
                  
                  <div className="d-flex justify-content-end">
                    <b>ID: {d.id}</b>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}

        </Col>
      </Row>
    </Container>
  )
}

export default App