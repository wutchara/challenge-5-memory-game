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
  cardListKeys: string[];
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
console.log('cardLists', cardLists);

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
    console.log('cardListKeys', cardListKeys);

    this.setState({
      ...this.state,
      time: new Date(),
      userCount: 0,
      cardListKeys: this.shuffleCard([...cardListKeys, ...cardListKeys]),
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
        return <AddModeratorIcon />
      case 'ArchiveIcon':
        return <ArchiveIcon />;
      case 'AndroidIcon':
        return <AndroidIcon />;
      case 'CloudUploadIcon':
        return <CloudUploadIcon />;
      case 'CoffeeIcon':
        return <CoffeeIcon />;
      case 'BuildCircleIcon':
        return <BuildCircleIcon />;
      }
    }

  // render will know everything!
  render() {
    return (
      <div id="game-area" className="container">
        <p>The current time is {this.state.time.toLocaleTimeString()}</p>
        <p>userCount: {this.state.userCount}</p>
        <p>cardLists: {this.state.cardListKeys.toString()}</p>
        <Button variant="contained">Hello World</Button>
        <Grid container spacing={3}>
          {this.state.cardListKeys.map((k, i) => {
            return <Grid item md={3} key={k + '-' + i}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    {this.getIcon(k)}
                  </CardContent>
                </Card>
              </Item>
            </Grid>;
          })}
        </Grid>
      </div>
    );
  }
}
