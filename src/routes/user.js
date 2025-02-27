"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router();

const user = require("../controllers/user");

router.route("/").get(user.list).post(user.create);
router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

<<<<<<< HEAD


module.exports = router
=======
router.route("/:id/status").patch(user.changeUserStatus);
router.route("/:id/updateMe").patch(user.updateMe);
router.route("/:id/changeMyPassword").patch(user.changeMyPassword);

module.exports = router;
>>>>>>> main
