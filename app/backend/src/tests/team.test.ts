import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const expectedResult = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
];

describe('Testes para a rota Teams', () => {
  afterEach(() => {
    sinon.restore();
  }),

  it('testa se retorna todos os times ao acessar a rota', async () => {
    sinon.stub(Team, 'findAll').resolves(expectedResult as Team[]);

    const response = await chai.request(app).get("/teams");

    chai.expect(response.body).to.deep.equal(expectedResult);
    chai.expect(response.status).to.equal(200);
  });

  it('teste da função findById', async () => {
    sinon.stub(Team, 'findByPk').resolves(expectedResult[2] as Team);

    const response = await chai.request(app).get("/teams/3");

    chai.expect(response.body).to.deep.equal(expectedResult[2].id);
    chai.expect(response.status).to.equal(200);
  });
});