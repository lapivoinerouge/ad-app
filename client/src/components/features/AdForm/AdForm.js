import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import ImageUploader from 'react-images-upload';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

import styles from "./AdForm.module.scss";

const AdForm = ({ action, ...props }) => {
  /* form fields */
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [price, setPrice] = useState(props.price || 0);
  const [location, setLocation] = useState(props.location || '');
  const [image, setImage] = useState(null);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    if (title && content && price && location) {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('content', content);
      formData.append('price', price);
      formData.append('location', location);

      formData.append('image', image);
      action(formData);
    }
  };

  const handleImage = (files) => {
    if(files) setImage(files[0]);
    else setImage(null);
  }

  return (
    <Form onSubmit={validate(handleSubmit)} className={styles.form}>
      <Form.Group className="mb-3 col-md-12" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
           {...register("title", { required: true, minLength: 10, maxLength: 50 })}
           className={styles.input}
           value={title}
           onChange={e => setTitle(e.target.value)}
           type="text" />
        {errors.title && <small className="d-block form-text text-danger mt-2">Title must be 10-50 characters.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-12" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control 
          {...register("price", { required: true, min: 0 })} 
          className={styles.input}
          value={price} 
          type="number" 
          onChange={e => setPrice(e.target.value)} />
          {errors.price && <small className="d-block form-text text-danger mt-2">Min price is 0.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-12" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control 
          {...register("location", { required: true })} 
          className={styles.input}
          value={location} 
          type="string" 
          onChange={e => setLocation(e.target.value)} />
          {errors.location && <small className="d-block form-text text-danger mt-2">This field is required.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-12" controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control 
        {...register("content", { required: true, minLength: 20, maxLength: 1000 })}
        className={styles.input}
        value={content} 
        onChange={e => setContent(e.target.value)} 
        as="textarea" 
        rows={3} />
        {errors.content && <small className="d-block form-text text-danger mt-2">This must be 20-1000 chars.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-12" controlId="formImage">
        <ImageUploader
          className={styles.fileInput}
          withIcon={true}
          buttonText='Choose image'
          imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
          maxFileSize={1000000}
          withPreview={true}
          onChange={handleImage}
          singleImage={true} />
      </Form.Group>
      <Button className={styles.button} variant="primary" type="submit">Publish</Button>
    </Form>
  )
}

AdForm.propTypes = {
  action: PropTypes.func.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

export default AdForm;









