import * as sinon from 'sinon';
import * as chai from 'chai';
import TeamsService from '../Services/TeamsService';
import teamMock from './teamMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import TeamsController from '../controllers/TeamsController';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;
// arrange => a given context
// act => test a code
// assert => expect a rusult
// TDD => red --- green --- refactor
describe('Teams Service tests', () => {
  describe('Tests "findAll" for teams Model', () => {
    afterEach(() => {
      sinon.restore()
    })
    it('Returns an empty array', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves([]);

      const teams = await TeamsService.findAll();

      expect(teams).to.be.deep.equal([]);
    });
    it('Returns * in teams Table', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves(teamMock);

      const teams = await TeamsService.findAll();

      expect(teams).to.be.deep.equal(teamMock);
    });
    it('expects a status 200', async () => {
     const response = await chai.request(app)
     .get('/teams')
     expect(response.status).to.be.equal(200);
    })
  })
});
