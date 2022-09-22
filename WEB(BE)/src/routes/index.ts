import express, { Router } from 'express';

const router: Router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (req, res) => {
  res.send('Birds home page')
})

router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router