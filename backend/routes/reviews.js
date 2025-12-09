const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

router.post('/:productId', auth, validate(schemas.review), reviewController.createReview);
router.get('/:productId', reviewController.getProductReviews);
router.delete('/:reviewId', auth, reviewController.deleteReview);

module.exports = router;
