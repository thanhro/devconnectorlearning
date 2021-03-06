const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/', [auth, [
    check('status, "Status is required').not().isEmpty(),
    check('skills, Skills is required').not().isEmpty()
]], async (req, res) => {
    const erros = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }
});
module.exports = router;