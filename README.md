# Game of Life

Welcome to our implementation of **Conway's Game of Life**! This project explores the fascinating world of cellular automata, where simple rules generate complex patterns.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Rules](#rules)
- [Installation](#installation)
- [Usage](#usage)

## Introduction
Conway's Game of Life is a zero-player game that simulates the evolution of cells on a grid based on simple rules. Despite its simplicity, the game produces intricate and unpredictable patterns, making it a popular subject in mathematics, computer science, and artificial life.

## Features
- **Customizable Grid Size:** Adjust the grid to your preferred dimensions.
- **Step-by-Step Evolution:** Observe the grid evolve step by step or run continuously.
- **Pause/Resume:** Pause and resume the simulation at any time.
- **Visual Display:** A graphical interface to view cell evolution.
- **Custamizable-grid:** Customize cell appearances with unique designs or colors.
- **Scoreboard:** Track high scores based on criteria like population size.
- **Scoreboard:** Track high scores or notable patterns based on criteria like longevity or population size.

## Rules
The Game of Life is played on a grid where each cell can be either alive or dead. The state of each cell in the next generation is determined by the following rules:

- **Underpopulation:** A live cell with fewer than two live neighbors dies.
- **Overcrowding:** A live cell with more than three live neighbors dies.
- **Survival:** A live cell with two or three live neighbors survives.
- **Reproduction:** A dead cell with exactly three live neighbors becomes a live cell.

## Rules-gamemode
- **You can select a limit of 20 grids in game mode**
- **Each grid has a population of 1,000**
- **Get as many points as posible in 15seconds**

## Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the simulation:
    ```bash
    npm start
    ```
2. Use the controls to pause or resume.
