import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

const team = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
];

const leaderboardHome = [{
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 5,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
}];

const leaderboardAway = [{
  id: 1,
  homeTeamId: 8,
  homeTeamGoals: 5,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: false,
}];

describe('Testa a model Users', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('get leaderboard', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('get leaderboard home', async () => {
    sinon.stub(Team, 'findAll').resolves(team as Team[]);
    sinon.stub(Match, 'findAll').resolves(leaderboardHome as Match[]);

    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('get leaderboard away', async () => {
    sinon.stub(Team, 'findAll').resolves(team as Team[]);
    sinon.stub(Match, 'findAll').resolves(leaderboardAway as Match[]);

    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});