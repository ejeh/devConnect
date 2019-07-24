import React, { Component, Fragment } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Exercise from "./components/exercise/Index";
import { muscles, exercises } from "./store";

export default class App extends Component {
  state = {
    exercises
  };

  getExerciseByMuscles() {
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise];

        return exercises;
      }, {})
    );
  }

  handleCategorySelected = (category) => {
    this.setState({
      category
    })

  }
  render() {
    const exercises = this.getExerciseByMuscles();
    const { category } = this.state
    return (
      <Fragment>
        <Header />

        <Exercise exercises={exercises} />

        <Footer 
        category={category}
        muscles={muscles}
        onSelect={this.handleCategorySelected}
        />
      </Fragment>
    );
  }
}
