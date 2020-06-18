import React from "react";
import { useFormik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().min(10, "Too Short!").max(140, "Too Long!").required("Required"),
  description: Yup.string().min(10, "Too Short!").max(500, "Too Long!").required("Required"),
});

const Form = ({ onSubmit, onCancel, isLoading, prefill }) => {
  const formik = useFormik({
    initialValues: prefill || {
      title: "",
      description: "",
      dueDate: "",
      priority: "none",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
      onSubmit(values, setSubmitting, setStatus, resetForm);
    },
  });
  return (
    <form className="form add-task" onSubmit={formik.handleSubmit}>
      <label htmlFor="add-task-title">Summary</label>
      <Input
        id="add-task-title"
        name="title"
        type="text"
        size="full"
        light="light"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      {formik.errors.title && formik.touched.title ? (
        <div className="field-error">{formik.errors.title}</div>
      ) : null}
      <label htmlFor="add-task-description">Description</label>
      <Input
        id="add-task-description"
        name="description"
        type="text"
        size="full"
        light="light"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.errors.description && formik.touched.description ? (
        <div className="field-error">{formik.errors.description}</div>
      ) : null}
      <div className="add-task-fields">
        <div className="field-item">
          <label htmlFor="add-task-priority">Priority</label>
          <Select
            id="add-task-priority"
            name="priority"
            type="text"
            size="full"
            light="light"
            onChange={formik.handleChange}
            value={formik.values.priority}
          >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
        <div className="field-item">
          <label htmlFor="add-task-due-date">Due Date</label>
          <Input
            id="add-task-due-date"
            name="dueDate"
            type="date"
            size="full"
            light="light"
            onChange={formik.handleChange}
            value={formik.values.dueDate}
          />
        </div>
      </div>
      <div className="add-task-actions">
        <Button type="button" onClick={onCancel}>
          CANCEL
        </Button>
        {isLoading && (
          <Button type="button" primary="primary">
            Loading!!
          </Button>
        )}
        {!isLoading && (
          <Button type="submit" primary="primary">
            SAVE
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
