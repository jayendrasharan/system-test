import React from 'react'

import { FormikProps, withFormik } from 'formik'
import { formStyles } from './styles'

interface FormValues {
  priority: string,
  dueDate: string,
  description: string,
  title: string,
  currentState: boolean,
  id: number,
  createdAt: string
}

interface OtherProps {
  task: FormValues
  mode: string
  handleModalClose(mode?: string, id?: number): void
  onSave(task: FormValues, statusUpdate?: boolean): void
}

const MyForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    handleModalClose,
    mode
  } = props;
  const { priority, dueDate, description, title } = values
  const handleCancel = () => {
    handleReset()
    handleModalClose('cancel', -1)
  }

  const readOnly = mode === 'view' ? true : false

  return (
    <form onSubmit={handleSubmit} {...formStyles}>
      <label htmlFor='summary' style={{ display: 'block' }}>
        Summary
      </label>
      <input
        id='title'
        placeholder='Enter your title'
        type='text'
        value={title}
        disabled={readOnly}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.title && touched.title ? 'text-input error' : 'text-input'
        }
      />
      {errors.title && touched.title && (
        <div className='input-feedback'>{errors.title}</div>
      )}

      <label htmlFor='description' style={{ display: 'block' }}>
        Description
      </label>
      <textarea
        id='description'
        placeholder='Enter your description'
        value={description}
        disabled={readOnly}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.description && touched.description ? 'text-input error' : 'text-input'
        }
      />
      {errors.description && touched.description && (
        <div className='input-feedback'>{errors.description}</div>
      )}
      <div className='dropDownSection'>
        <div className={'select-style'}>
          <label htmlFor='priority' style={{ display: 'block' }}>
            Priority
        </label>
          <select id='priority' disabled={readOnly} value={priority} onChange={handleChange}>
            <option value='none'>None</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div>
          <label htmlFor='dueDate' style={{ display: 'block' }}>
            Due Date
      </label>
          <input 
            type='date' 
            id='dueDate' 
            min={new Date(dueDate).toISOString().substring(0, 10)} 
            disabled={readOnly} 
            onChange={handleChange} 
            value={new Date(dueDate).toISOString().substring(0, 10)} 
            name='dueDate' 
          />
        </div>
      </div>
      <div className='buttonSection'>
      <button
        type='button'
        className='outline'
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        Close
      </button>
      {!readOnly ? <button type='submit' disabled={isSubmitting}>
        Save
      </button> : <React.Fragment />}
      </div>
    </form>
  );
};

const Form = withFormik({
  mapPropsToValues: (props: OtherProps) => {
    return {
      currentState: props.task.currentState || true,
      title: props.task.title || '',
      description: props.task.description || '',
      createdAt: props.task.createdAt || new Date().toISOString().substring(0, 10),
      dueDate: props.task.dueDate || new Date().toISOString().substring(0, 10),
      priority: props.task.priority || 'none',
      id: props.task.id || -1
    }
  },

  // Custom sync validation
  validate: (values: FormValues) => {
    const errors: any = {};
    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length < 10 || values.title.length > 140) {
      errors.title = 'Title should be between 10 - 140 characters';
    }
    if (!values.description) {
      errors.description = 'Required';
    } else if (values.description.length < 10 || values.description.length > 500) {
      errors.description = 'Description should be between 10 - 500 characters';
    }
    return errors;
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(false);
    props.onSave(values)
  },

  displayName: 'BasicForm'
})(MyForm);

export default Form