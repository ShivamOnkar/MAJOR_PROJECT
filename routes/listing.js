const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.get("/search", async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.redirect("/listings");
    }

    const listings = await Listing.find({
        title: { $regex: q, $options: "i" }
    });

    if (listings.length === 0) {
        // No listings found
        req.flash("error", `No listings found for "${q}"`);
        return res.redirect("/listings");
    }

    res.render("listings/index", { allListings: listings });
});

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


// //Index Route
// router.get("/", wrapAsync(listingController.index));

// //Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

// //Create Route
// router.post("/",validateListing,isLoggedIn, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditFrom));

// //Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));

// //Delete Route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;