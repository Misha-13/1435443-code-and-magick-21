'use strict';
var MAX_GRAPH_HEIGHT = 150;
var START_X = 100;
var START_Y = 10;
var GAP = 10;
var DEFAULT_PADDING_LEFT =  START_X + (GAP + GAP);
var DEFAULT_PADDING_TOP =  START_Y +  (GAP + GAP);
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var CONVERT_TO_PERCENT = 100;

var getMaxArrayElement = function (curretnArray) {
  var maxElement = curretnArray[0];
  for (var i = 0; i < curretnArray.length; i++) {
    if (maxElement < curretnArray[i]) {
      maxElement = curretnArray[i];
    };
  };
  return maxElement;
};

var getGraphHeight = function(playerTime, bestTime) {
  return (playerTime * MAX_GRAPH_HEIGHT) / bestTime
};

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderScoreText = function(ctx, name, time, x, y) {
  ctx.fillText(Math.round(time), x, y - (GAP + GAP));
  ctx.fillText(name, x, (CLOUD_HEIGHT - GAP));
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, START_X + GAP, START_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, START_X, START_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', DEFAULT_PADDING_LEFT, DEFAULT_PADDING_TOP);
  ctx.fillText('Список результатов:',  DEFAULT_PADDING_LEFT, DEFAULT_PADDING_TOP + GAP + GAP);

  var maxElement = getMaxArrayElement(times);
  for(var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'hsl(240, 100%, ' + (Math.random() * CONVERT_TO_PERCENT) + '%)';
    if(names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    };
    var graphHeight = getGraphHeight(times[i], maxElement);
    var positionX = START_X + COLUMN_GAP + ((COLUMN_WIDTH + COLUMN_GAP) * i);
    var positionY = CLOUD_HEIGHT - graphHeight - (GAP + GAP);
    ctx.fillRect(positionX, positionY, COLUMN_WIDTH, graphHeight);
    ctx.fillStyle = '#000';
    renderScoreText(ctx, names[i], times[i], positionX, positionY);
  };
};
