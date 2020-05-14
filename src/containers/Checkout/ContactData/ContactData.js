import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          touched: false,
          isNumeric: true
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onBurgerOrder(order);
  };

  checkValidity(value, rules) {
    let isValid = true;

    // if(!rules)
    //   return true;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength && rules.maxLength) {
      isValid =
        value.trim().length >= rules.minLength &&
        value.trim().length <= rules.maxLength;
    }

    if(rules.isNumeric){
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  changeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedForm = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedForm.value = event.target.value;
    updatedForm.valid = this.checkValidity(
      updatedForm.value,
      updatedForm.validation
    );
    updatedForm.touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    updatedOrderForm[inputIdentifier] = updatedForm;
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    console.log(this.state.orderForm.delivery.validation);
  };

  render() {
    const formArrayElements = [];
    for (let key in this.state.orderForm)
      formArrayElements.push({
        id: key,
        config: this.state.orderForm[key],
      });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formArrayElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.changeHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData) =>
      dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
