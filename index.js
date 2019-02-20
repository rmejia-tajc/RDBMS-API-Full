const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js')


const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());


// error responses
const errors = {
    '19': 'Another record with that value exists',
};


// ----- COHORTS endpoints here --------------


// create cohort
server.post('/api/cohorts', async (req, res) => {

    if (!req.body.name) {
        res.status(400).json({ message : 'Please enter a value for this entry'});
    } else {

        try {
            const [id] = await db('cohorts').insert(req.body);

            const role = await db('cohorts')
            .where({ id })
            .first();

            res.status(201).json(id);
        } catch (error) {
            const message = errors[error.errno] || 'We ran into an error creating that entry';
            res.status(500).json({ message, error });
        }
    }
});

  // get a list of all cohorts
server.get('/api/cohorts', async (req, res) => {

    try {
        const cohorts = await db('cohorts');
        
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json(error);
    }  
});

// get a cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
  
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message : 'The entry with that specified ID does not exist'});
      }
  
    } catch (error) {
      res.status(500).json(error);
    }
});  

// get cohort students by cohort id
server.get('/api/cohorts/:id/students', async (req, res) => {
    try {
        const {id} = req.params;
        const students = await db('students').where({cohort_id: id});
    
        if (students.length > 0) {
            res.status(200).json(students);
        } else {
            res.status(404).json({ message : 'The entry with that specified ID does not have any students'});
        }
  
    } catch (error) {
      res.status(500).json(error);
    }
});  

// update a cohort
server.put('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const role = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'The entry with that specified ID does not exist' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
});  

// delete a cohort
server.delete('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'The entry with that specified ID does not exist' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
});  


// ----- COHORTS endpoints here --------------


// create student
server.post('/api/students', async (req, res) => {

    if (!req.body.name) {
      res.status(400).json({ message : 'Please enter a value for this entry'});
    } else {
  
        try {
          const [id] = await db('students').insert(req.body);
  
          const role = await db('students')
            .where({ id })
            .first();
  
          res.status(201).json(id);
        } catch (error) {
          const message = errors[error.errno] || 'We ran into an error creating that entry';
          res.status(500).json({ message, error });
        }
      }
});

// get a list of all students
server.get('/api/students', async (req, res) => {

try {
    const students = await db('students');
    
    res.status(200).json(students);
} catch (error) {
    res.status(500).json(error);
}  
});

// get a student by id
server.get('/api/students/:id', async (req, res) => {
    try {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();
  
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message : 'The entry with that specified ID does not exist'});
      }
  
    } catch (error) {
      res.status(500).json(error);
    }
});  

// update a student
server.put('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const role = await db('students')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'The entry with that specified ID does not exist' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
}); 

// delete a student
server.delete('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'The entry with that specified ID does not exist' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
}); 

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n*** running on ${port} ***\n`));
