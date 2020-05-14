import React, {Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[Order Summary] did update');

    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingName => {
                return (
                    <li key={ingName}>
                        <span style={{ textTransform: 'capitalize' }}>{ingName}</span>
                    : {this.props.ingredients[ingName]}
                    </li>)
            });

        return(
            <div>
                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType='Danger' clicked={this.props.purchasedCancelled}>CANCEL</Button>
                    <Button btnType='Success' clicked={this.props.purchasedContinued}>CONTINUE</Button>
                </Aux>
            </div>
        );
    }
}

export default OrderSummary;