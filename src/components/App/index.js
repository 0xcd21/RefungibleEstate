import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './style.css';
import Main from '../Main'

// var createGame = require('voxel-engine');

// var game = createGame({
//   materials: ['barrel.png'],
//   generate: function(x, y, z) {
//     if (y === 5 && x === 5 && z === 5) { return 2; }
//     if (y === 4 && (x > 3 && x < 7) && (z > 3 && z < 7)) { return 2; }
//     if (y === 3 && (x > 2 && x < 8) && (z > 2 && z < 8)) { return 2; }
//     if (y === 2 && (x > 1 && x < 9) && (z > 1 && z < 9)) { return 2; }
//     if (y === 1 && (x > 0 && x < 10) && (z > 0 && z < 10)) { return 2; }
//     return y === 0 ? 1 : 0
//   }
// });

// var textureEngine = require('voxel-texture')({
//   // a copy of your voxel.js game
//   game: game,

//   // path to your textures
//   texturePath: 'texture/'
// });

// // load textures and it returns textures just loaded
// textureEngine.load(['barrel.png'], function(textures) {
//   // create a new mesh
//   var cube = new game.THREE.Mesh(
//     new game.THREE.CubeGeometry(game.cubeSize, game.cubeSize, game.cubeSize),
//     // use the texture engine atlas material
//     textureEngine.material
//   );
//   // paint the cube with grass on top, dirt on bottom and grass_dirt on sides
//   textureEngine.paint(cube, ['grass', 'dirt', 'grass_dirt']);
// });

// game.appendTo(document.body);
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    )
  }
}


export default App;
