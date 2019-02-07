const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/search"
router.route("/")
  .get(searchController.findAll)
  .post(searchController.create);

// Matches with "/api/search/:id"
router
  .route("/:id")
  .get(searchController.findById)
  .put(searchController.update)
  .delete(searchController.remove);

module.exports = router;
