import * as sinon from 'sinon';
import * as chai from 'chai';
import MatchMock, {MatchReturnAtributes} from './MatchMock';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel, { matchesAttributes } from '../database/models/MatchesModel';
import MatchService from '../Services/MatchService';
import JwtToken from '../Services/JwtToken';
import MatchController from '../controllers/MatchController';
chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for Matches Route, Model, Service, Controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("Tests the findAllMatches and inProgress function and it's Route", () => {
    it('Tests findAllMatches and inProgress with success and Status 200', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves([MatchMock.mockmatches])

      const responseFindAll = await chai.request(app).get('/matches');
      expect(responseFindAll.status).to.be.equal(200);
      expect(responseFindAll.body).to.be.deep.equal([MatchMock.mockmatches]);

      const responseInProgress = await chai.request(app).get('/matches?inProgress=true');
      expect(responseInProgress.status).to.be.equal(200);
      expect(responseInProgress.body).to.be.deep.equal([MatchMock.mockmatches])
    });
  });
  it('Tests finishMatch function with success and Status 200', async () => {
    sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockmatches);
  sinon.stub(MatchesModel, 'update').resolves([1]); 
    sinon.stub(JwtToken, 'verifyToken').resolves({
      email: 'admin@admin.com',
      password: 'senha_admin'
    }); 
    const response = await chai.request(app)
      .patch(`/matches/1/finish`)
      .set('Authorization', 'token-valid');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });  
  it('Tests finishMatch function with success and Status 200', async () => {
    sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockFinishedmatches);
  sinon.stub(MatchesModel, 'update').resolves([1]); 
    sinon.stub(JwtToken, 'verifyToken').resolves({
      email: 'admin@admin.com',
      password: 'senha_admin'
    }); 
    const response = await chai.request(app)
      .patch(`/matches/1/finish`)
      .set('Authorization', 'token-valid');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Match already finished' });
  });  
  it('Match already finished with error 401  and message', async () => {
    
    sinon.stub(MatchesModel, 'update').resolves(undefined);
    sinon.stub(JwtToken, 'verifyToken').resolves({
      email: 'admin@admin.com',
      password: 'senha_admin'
    }); 
    const response = await chai.request(app)
      .patch(`/matches/1/finish`);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({message: 'Token not found'})
  });
  describe('Tests the updateMatchScore function', () => {
   it('Test a successful update with status 200', async () => {
    sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockmatches);
    sinon.stub(MatchesModel, 'update').resolves([1]); 
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      }); 
      const response = await chai.request(app)
        .patch(`/matches/1`)
        .set('Authorization', 'token-valid');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Match score updated' });
   });
   it('Test a successful update with status 401', async () => {
    sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockFinishedmatches);
    sinon.stub(MatchesModel, 'update').resolves([1]); 
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      }); 

      const response = await chai.request(app)
        .patch(`/matches/1`)
        .set('Authorization', 'token-valid');
      // expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Match already finished' });
   });
  });
});