import * as sinon from 'sinon';
import * as chai from 'chai';
import TeamsService from '../Services/TeamsService';
import teamMock from './teamMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';


chai.use(chaiHttp);

const { expect } = chai;
// arrange => a given context
// act => test a code
// assert => expect a rusult
// TDD => red --- green --- refactor
describe('Teams Model, Service, Controller and Route tests', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('Tests "findAll" for teams', () => {
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
  describe('Tests "findById" for teams', () => {

    it('Returns a specific team using id', async () => {
       sinon.stub(TeamsModel, 'findByPk').resolves({ id: 5, teamName: 'Cruzeiro' } as TeamsModel)
       const response = await TeamsService.findById(5);

       expect(response).to.be.deep.equal({ id: 5, teamName: 'Cruzeiro' })
    })
    it('Return the correct status with GET /team/:id', async () => {
      sinon.stub(TeamsService, 'findById').resolves({ id: 5, teamName: 'Cruzeiro' } as TeamsModel);

      const response = await chai.request(app)
      .get('/teams/:id');

      expect(response.status).to.be.equal(200);
    })
    it('Returns an Error message if id is not found', async () => {
      sinon.stub(TeamsModel, 'findByPk').resolves(undefined);
      const response = await TeamsService.findById(100);

      expect(response).to.be.deep.equal({ message: 'Team not found'});
    })
  })
});
