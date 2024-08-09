import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import './content.css'
import Dropdown from 'react-bootstrap/Dropdown';

function UploadMovie() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    file: yup.mixed().required(),
    terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
  });

  return (
    <Container fluid>
        <Row className='FormCss'>
        <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        Movie: '',
        Description: '',
        file: null,
      }}
    >
        
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
            
          <Row className="mb-3">

          <Form.Group className="position-relative mb-3">
            <Form.Label>Upload Movie</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleChange}
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.file}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Upload Thumbnail</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleChange}
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.file}
            </Form.Control.Feedback>
          </Form.Group>


            <Form.Group>
              <Form.Label>Movie Name</Form.Label>
              <Form.Control
                type="text"
                name="Movie"
                value={values.Movie}
                onChange={handleChange}
                isValid={touched.Movie && !errors.Movie}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Movie Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={values.Description}
                onChange={handleChange}
                isValid={touched.Description && !errors.Description}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>

            {/* ///////////////////////////////// */}
            <Form.Label>Device Type</Form.Label>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
           {/* ////////////////////////////// */}
          </Row>
       
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
        </Row>
    </Container>
  
  );
}

export default UploadMovie;