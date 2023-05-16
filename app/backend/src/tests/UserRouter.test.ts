import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import UserModel from '../database/models/UsersModel';
import JwtToken from '../Services/JwtToken';
import UserService from '../Services/UserService';
import UserController from '../controllers/UserController';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { response } from 'express';


chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for Model, Service, Controller for User Route', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('User login with success', () => {
    it('Tests "findOne" function with a token as return and status 200', async () => {

      sinon.stub(JwtToken, 'generateToken').resolves('mockToken')

      sinon.stub(UserModel, 'findOne').resolves({
                 id: 1,
                 username: 'admin',
                 role: 'admin',
                 email: 'admin@admin.com',
                 password: "senha_admin"
               } as UserModel);
               const bcryptStub = sinon.stub(bcrypt, 'compare').resolves(true);
               const response = await chai.request(app)
               .post('/login')
               .send({email: 'admin@admin.com', password: 'senha_admin'});
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({token: 'mockToken'})
      bcryptStub.restore(); 
    });
  });
  describe('Tests an invalid email or password', () => {
    it('Returns status 401 with message', async () => {
      sinon.stub(UserModel, 'findOne').resolves(undefined);
      const response = await chai.request(app)
      .post('/login')
      .send({ email: 'testing@admin.com', password: 'senha_admin'});
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password'});
    });
    it('Returns status 400 with message', async () => {
      sinon.stub(UserService, 'userLogin').resolves({ message: 'All fields must be filled'});

      const response = await chai.request(app)
      .post('/login')
      .send({ passord: 'senha_admin'});
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled'});
    });
    it('Tests Token function', async () => {
      const mockPayload = {
        email: 'admin@admin.com',
        password: 'senha_admin',
        role: 'admin'
      };
      const mockToken = 'mockToken';
      const config: jwt.SignOptions = {
        expiresIn: '300d',
        algorithm: 'HS256',
      };
      const signStub = sinon.stub(jwt, 'sign').resolves(mockToken)
      JwtToken.generateToken(mockPayload);

      expect(signStub.calledWith(mockPayload, 'SECRET', config))
    });
  }); 
  describe('Test for the /login/role Route', () => {
    it('Tests "/login/role" Route with error and status 401', async () => {
      sinon.stub(UserModel, 'findOne').resolves(undefined);

      const response = await chai.request(app)
      .get('/login/role')
      .send('string');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not found' });
    });
    it('Tests "/login/role" Route with error message', async () => {
     sinon.stub(UserModel, 'findOne').resolves(undefined);
     const result = await UserService.userRole('string');

     expect(result).to.be.deep.equal({ message: 'Token must be a valid token' })
    });
    it('GET /login/role with error 401', async () => {
      const response = await chai.request(app)
      .get('/login/role')
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not found' });
   });
   it('GET /login/role with success and status 200', async () => {
    sinon.stub(JwtToken, 'verifyToken').returns({
      email: 'admin@admin.com',
      password: 'senha_admin'
    })
      const response = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'token-valid')
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ role: 'admin'})
  });
  // it('Tests the Jwt "verify" function in the JwtToken', () => {
  //   const token = 'mockToken';
  // const decodedToken = { email: 'admin@admin.com', password: 'senha_admin' };

  // const verifyStub = sinon.stub(jwt, 'verify').resolves(decodedToken);
  // verifyStub(token, 'SECRET' )
  // expect(verifyStub.calledOnceWith(token, 'SECRET')).to.be.true;

  // });
  });
});