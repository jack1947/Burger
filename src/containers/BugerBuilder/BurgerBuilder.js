import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    console.log('burgerBUilder', this.props.ings);
    this.props.onInitIngredients();
  }



  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).reduce((sum, ele) => {
      return (sum += ingredients[ele]);
    }, 0);
   return  sum > 0
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.props.onInitPurchase();
    this.setState({ purchasing: false });
  };

  purchaseContinued = () => {

    this.props.history.push('/checkout');
  };

  render() {
    const disabledIng = { ...this.props.ings };
    for (let key in disabledIng) disabledIng[key] = disabledIng[key] === 0;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            addIngredients={this.props.onIngredientAdded}
            removeIngredients={this.props.onIngredientRemoved}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            disabled={disabledIng}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          purchasedCancelled={this.purchaseCancelHandler}
          purchasedContinued={this.purchaseContinued}
        />
      );
    }


    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          hideModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
