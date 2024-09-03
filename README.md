# Game of Life

Welcome to our version of **Game of Life**! This project is an implementation of Conway's Game of Life, a fascinating cellular automaton.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Rules](#rules)

## Introduction
Conway's Game of Life is a zero-player game that simulates the evolution of cells on a grid based on a set of simple rules. Despite its simplicity, the game can produce complex and unpredictable patterns, making it a popular subject of study in mathematics, computer science, and artificial life.

## Features
- **Customizable Grid Size:** Choose the size of the grid to create different worlds.
- **Initial Configurations:** Start with classic patterns (e.g., gliders, pulsars) or design your own.
- **Step-by-Step Evolution:** Observe the grid evolve step by step or let it run continuously.
- **Pause/Resume:** Pause the simulation at any time and resume when ready.
- **SaveStates:** Save the current state of the grid.
- **Visual Display:** A graphical interface to visualize the cells as they evolve.
- **Time-Line:** Navigate through the history of the simulation to review past states and patterns.
- **Character Creator:** Customize the appearance of cells with unique designs or colors.
- **Leaderboard:** Track high scores or notable patterns based on criteria like longevity or population size.

## Usage

### Start the Simulation:
- Run the game and watch how the grid evolves.
- Use the controls to pause, resume, or step through the simulation.

### Save/Load States:
- Save the grid state at any point and reload it to continue from where you left off.

## Rules
The Game of Life is played on a grid of cells. Each cell can be either alive or dead. The state of each cell in the next generation is determined by these rules:

- **Underpopulation:** A live cell with fewer than two live neighbors dies.
- **Overcrowding:** A live cell with more than three live neighbors dies.
- **Survival:** A live cell with two or three live neighbors survives.
- **Reproduction:** A dead cell with exactly three live neighbors becomes a live cell.
