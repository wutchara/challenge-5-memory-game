import React, { Component } from "react";
import _ from 'lodash';

import Button from "@mui/material/Button";
import { Card, CardContent, CardMedia, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

import AddModeratorIcon from '@mui/icons-material/AddModerator';
import ArchiveIcon from '@mui/icons-material/Archive';
import AndroidIcon from '@mui/icons-material/Android';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

import './Game.css';

interface IGameState {
  time: Date;
  userCount: number;
  userFailed: number;
  cardListKeys: string[];
  selectedCard: boolean[];
  prevSelect: number | null;
}

interface IGameProps {}

const cardLists = {
  AddModeratorIcon,
  ArchiveIcon,
  AndroidIcon,
  CloudUploadIcon,
  CoffeeIcon,
  BuildCircleIcon
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default class Game extends Component<{}, IGameState> {
  // constructor(props: IGameProps) {
  //   super(props);
  // }

  setup() {
    const cardListKeys = Object.keys(cardLists);
    const allCards = [...cardListKeys, ...cardListKeys];

    this.setState({
      ...this.state,
      time: new Date(),
      userCount: 0,
      userFailed: 0,
      cardListKeys: this.shuffleCard(allCards),
      selectedCard: allCards.map(() => false),
      prevSelect: null,
    });
  }

  shuffleCard(lists: string[]): string[] {
    const array = _.cloneDeep(lists);
    let counter = array.length;
    let temp;
    let index;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date(),
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
    this.setup();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  getIcon(key: string) {
    switch (key){
      case 'AddModeratorIcon':
        return <AddModeratorIcon className="card-icon-front" />
      case 'ArchiveIcon':
        return <ArchiveIcon className="card-icon-front" />;
      case 'AndroidIcon':
        return <AndroidIcon className="card-icon-front" />;
      case 'CloudUploadIcon':
        return <CloudUploadIcon className="card-icon-front" />;
      case 'CoffeeIcon':
        return <CoffeeIcon className="card-icon-front" />;
      case 'BuildCircleIcon':
        return <BuildCircleIcon className="card-icon-front" />;
      }
    }

  selectedCard(key: string, index: number) {
    const temp = this.state.selectedCard;
    temp[index] = true;
    let userCount = this.state.userCount;
    let userFailed = this.state.userFailed;

    // open cards
    this.setState({
      ...this.state,
      selectedCard: temp,
    });

    // check matched
    if (this.state.prevSelect !== null) {
      if (this.state.cardListKeys[this.state.prevSelect] === this.state.cardListKeys[index]) {
        userCount = userCount + 1;
      } else {
        const previousIndex = this.state.prevSelect;
        userFailed = userFailed + 1;

        // close 2 cards
        setTimeout(() => {
          temp[previousIndex] = false;
          temp[index] = false;
        }, 300);
      }
    }

    this.setState({
      ...this.state,
      selectedCard: temp,
      userCount,
      userFailed,
      prevSelect: this.state.prevSelect === null ? index : null,
    });
  }

  // render will know everything!
  render() {
    return (
      <div id="game-area" className="container">
        <Grid container spacing={4} className="head">
          <Grid item md={12}><h1>Time: {this.state.time.toLocaleTimeString()}</h1></Grid>
          <Grid item md={4}><h3>userCount: {this.state.userCount}</h3></Grid>
          <Grid item md={4}><h3>userFailed: {this.state.userFailed}</h3></Grid>
          <Grid item md={4}><Button variant="outlined" onClick={() => this.setup()}>Reset</Button></Grid>
        </Grid>
        <Grid container spacing={3}>
          {this.state.cardListKeys.map((k, i) => {
            return <Grid item md={3} key={k + '-' + i}>
              <Item>
                {/* <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    {this.getIcon(k)}
                  </CardContent>
                </Card> */}
                <div className="flip-card">
                  <div className={`flip-card-inner ${this.state.selectedCard[i] ? "card-selected card-matched" : ""}`} onClick={() => this.selectedCard(k, i)}>
                    <div className="flip-card-front">
                      {this.getIcon(k)}
                    </div>
                    <div className="flip-card-back">
                      <img src={'./images/GitHub-Mark-Light-120px-plus.png'} alt="def" />
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>;
          })}
        </Grid>
      </div>
    );
  }
}
