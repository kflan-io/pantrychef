import React, { Component } from 'react';
import RecipeCardDetails from '../RecipeCardDetails';
import Grid from '@material-ui/core/Grid';
import backgroundImage from '../../img/platefruitveg.jpg';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles';

const styles = {
  bgimage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: `rgba(255,255,255, 0.5)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },

  button: {
    backgroundColor: `rgba(255,255,255, 1)`,

    '&:hover': {
      backgroundColor: fade('#4a4a4a', 0.05)
      // color: 'rgb(129, 10, 169)'
    },
    color: 'rgb(129, 150, 69)',
    padding: 10,
    // opacity: 0.9,
    margin: 40
  }
};

class RecipeDetails extends Component {
  state = {
    result: [],
    home: '',
    hometext: '',
    redirect: false,
    edamamresult: []
  };

  componentDidUpdate() {
    console.log(this.state.result);
  }

  deleteRecipe = e => {
    // get the id of the recipe when 'delete' is clicked
    const thisCardsId = e.currentTarget.getAttribute('data-id');
    console.log('this card', thisCardsId);
  };
  render() {
    console.log('props', this.props);
    const { result: recipe, goBackText } = this.props.location.state;

    return (
      <div style={styles.bgimage}>
        {/* <Navbar /> */}
        {/* <img style={styles.bgimage} src={backgroundImage} alt="" /> */}

        {/* <h5
          style={{
            color: 'rgb(129, 150, 69)',
            textAlign: 'center',
            padding: '1rem'
          }}
          onClick={() => this.props.history.goBack()}
        > */}

        <Button
          style={styles.button}
          variant="contained"
          color="rgb(129, 150, 69)"
          className={styles.button}
          onClick={() => this.props.history.goBack()}
        >
          ← {goBackText}
        </Button>

        {/* <Button>← {goBackText}</Button> */}
        {/* </h5> */}

        <Grid container item xs={12} justify="center">
          <RecipeCardDetails
            key={recipe.uri}
            recipe={recipe}
            handleRecipeSave={this.saveRecipe}
            leftButton={'View'}
            rightButton={'Delete'}
          />
        </Grid>
      </div>
    );
  }
}

export default RecipeDetails;
