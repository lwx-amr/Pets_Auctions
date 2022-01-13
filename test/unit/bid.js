import chai from 'chai';
import chaiHttp from 'chai-http';
import debug from 'debug';

import app from '../../src/service';
import BidModel from '../../src/repository/bidModel';
import petModel from '../../src/repository/petModel';
import userModel from '../../src/repository/userModel';

const should = chai.should();
chai.use(chaiHttp);

const testLogger = debug('app:test');

describe('Routes Testing for Bid Routes', () => {
  // Declaring Dummy Users and Pets for testing purpose
  const newUsers = [
    {
      _id: '61df69d874a841235cd6ddeb',
      name: 'Amr',
      email: 'amr@gmail.com',
      password: 'hashed_secret_ps1',
      apiKey: 'secret_api_key_of_amr',
    },
    {
      _id: '61df69d874a841235cd6ddec',
      name: 'Sara',
      email: 'sara@gmail.com',
      password: 'hashed_secret_ps2',
      apiKey: 'secret_api_key_of_sara',
    },
    {
      _id: '61df69d874a841235cd6dded',
      name: 'Mary',
      email: 'mary@gmail.com',
      password: 'hashed_secret_ps3',
      apiKey: 'secret_api_key_of_mary',
    },
  ];

  // First user owns first 3 pet, Second one owns last pet
  const newPets = [
    { _id: '61df17aacb5dd9d8f002ee92', name: 'Puppy', owner: newUsers[0]._id },
    { _id: '61df17aacb5dd9d8f002ee93', name: 'Little Cat', owner: newUsers[0]._id },
    {
      _id: '61df17aacb5dd9d8f002ee94', name: 'Big Dog', owner: newUsers[0]._id, status: 'pending',
    },
    {
      _id: '61df17aacb5dd9d8f002ee95', name: 'Small Dog', owner: newUsers[1]._id, status: 'sold',
    },
  ];

  // Clearing testing database
  before((done) => {
    BidModel.deleteMany({})
      .then(() => petModel.deleteMany({}))
      .then(() => userModel.deleteMany({}))
      .then(() => done());
  });

  // Add dummy users(3) and pets(4) to testing database
  before((done) => {
    newUsers.forEach(async (element) => {
      const newUser = userModel(element);
      const addUser = await newUser.save();
      savedUsers.push(addUser);
    });

    newPets.forEach(async (element) => {
      const newPet = petModel(element);
      const addPet = await newPet.save();
      savedPets.push(addPet);
    });
    done();
  });

  // Testing POST bid route
  describe('/POST bid/:petId', () => {
    it(`Should add new bid for ${newPets[0].name} by user ${newUsers[1].name}`, (done) => {
      chai.request(app)
        .post(`/bid/${newPets[0]._id}`)
        .set('api_key', newUsers[1].apiKey)
        .send({ value: 500 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('value').eql(500);
          res.body.should.have.property('userId').eql(newUsers[1]._id);
          done();
        });
    });

    it(`Should add new bid for the same pet with name ${newPets[0].name}`, (done) => {
      chai.request(app)
        .post(`/bid/${newPets[0]._id}`)
        .set('api_key', newUsers[2].apiKey)
        .send({ value: 320 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('value').eql(320);
          res.body.should.have.property('userId').eql(newUsers[2]._id);
          done();
        });
    });

    it('Should not add new bid with invalid apiKey', (done) => {
      chai.request(app)
        .post(`/bid/${newPets[0]._id}`)
        .set('api_key', 'wrong_api_key')
        .send({ value: 320 })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('msg').eql('Unauthorized request, api_key header is required');
          done();
        });
    });

    it('Should not add new bid with no value property', (done) => {
      chai.request(app)
        .post(`/bid/${newPets[0]._id}`)
        .set('api_key', newUsers[2].apiKey)
        .end((err, res) => {
          res.should.have.status(405);
          res.body.should.have.property('msg').eql('Invalid input');
          done();
        });
    });

    it('Should not add new bid when petId is wrong', (done) => {
      chai.request(app)
        .post('/bid/54654654654654654')
        .set('api_key', newUsers[2].apiKey)
        .send({ value: 600 })
        .end((err, res) => {
          res.should.have.status(405);
          res.body.should.have.property('msg').eql('Invalid input');
          done();
        });
    });
  });

  // Testing GET bid Route
  describe('/GET bid/:petId', () => {
    it('Should list all bid of certain pet for pet owner', (done) => {
      chai.request(app)
        .get(`/bid/${newPets[0]._id}`)
        .set('api_key', newUsers[0].apiKey)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').to.have.lengthOf(2);
          res.body[0].should.have.property('userId').eql(newUsers[1]._id);
          res.body[1].should.have.property('userId').eql(newUsers[2]._id);
          done();
        });
    });

    it('Should not list all bid of when api_key is invalid', (done) => {
      chai.request(app)
        .post(`/bid/${newPets[0]._id}`)
        .set('api_key', 'wrong_api_key')
        .send({ value: 320 })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('msg').eql('Unauthorized request, api_key header is required');
          done();
        });
    });

    it('Should not list all bid of when api_key is not in the header', (done) => {
      chai.request(app)
        .post(`/bid/${newPets[0]._id}`)
        .send({ value: 320 })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('msg').eql('Unauthorized request, api_key header is required');
          done();
        });
    });

    it('Should not list all bid of when api_key is different from pet owner api_key', (done) => {
      chai.request(app)
        .get(`/bid/${newPets[0]._id}`)
        .set('api_key', newUsers[1].apiKey)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('msg').eql('Unauthorized request, not an owner');
          done();
        });
    });
  });
});
