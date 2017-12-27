import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from "../actions/index";

class PostNew extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input className="form-control" type="text" { ...field.input } />
        <small className="text-danger">{ field.meta.touched ? field.meta.error : '' }</small>
      </div>
    );
  }

  onSubmit (values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const onSubmitCallback = this.onSubmit.bind(this);

    return (
      <form onSubmit = { handleSubmit(onSubmitCallback) }>
        <Field name="title" label="Post Title" component={this.renderField} />
        <Field name="categories" label="Categories" component={this.renderField} />
        <Field name="content" label="Post Content" component={this.renderField} />

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories";
  }

  if (!values.content) {
    errors.content = "Enter some content, please";
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm' //the name of the form
})(
  connect(null, { createPost })(PostNew)
);