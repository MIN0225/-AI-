const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.send('상품 > 목록');
});

router.get('/:id/list', (req, res) => {
  res.send('상품 > 개별상품 > 디테일');
});

module.exports = router;