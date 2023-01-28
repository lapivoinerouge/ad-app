import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import ImageUploader from 'react-images-upload';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

/* styles */
import 'react-quill/dist/quill.snow.css';

const AdForm = ({ action, actionText, ...props }) => {
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
    <Form onSubmit={validate(handleSubmit)}>
      <Form.Group className="mb-3 col-md-8" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
           {...register("title", { required: true, minLength: 10, maxLength: 50 })}
           value={title}
           onChange={e => setTitle(e.target.value)}
           type="text" 
           placeholder="Enter title" />
        {errors.title && <small className="d-block form-text text-danger mt-2">Title must be 10-50 characters.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-8" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control 
          {...register("price", { required: true })} 
          value={price} 
          type="number" 
          placeholder="Enter price" 
          onChange={e => setPrice(e.target.value)} />
          {errors.price && <small className="d-block form-text text-danger mt-2">This field is required.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-8" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control 
          {...register("location", { required: true })} 
          value={location} 
          type="string" 
          placeholder="Enter location" 
          onChange={e => setLocation(e.target.value)} />
          {errors.price && <small className="d-block form-text text-danger mt-2">This field is required.</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-md-8" controlId="formContent">
        <Form.Label>Content</Form.Label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        {errors.content && <small className="d-block form-text text-danger mt-2">This must be 20-1000 chars.</small>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <ImageUploader
          withIcon={true}
          buttonText='Choose image'
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={1000000}
          withPreview={true}
          onChange={handleImage}
          singleImage={true} />
      </Form.Group>
      <Button variant="primary" type="submit">{actionText}</Button>
    </Form>
  )
}

AdForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.number
};

export default AdForm;









