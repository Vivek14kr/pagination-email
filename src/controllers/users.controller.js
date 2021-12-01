const express = require("express")
const User = require("../modals/user.modal")
const router = express.Router();
const sendmail = require("../utils/send-mail")
const admin = require("../utils/admin")
// const admin2 = require("../utils/admin2")
// const admin3 = require("../utils/admin3")
// const admin4 = require("../utils/admin4")
// const admin5 = require("../utils/admin5")
//user
    const to_arr = ["k@k.com", "r@k.com", "p@k.com", "c@k.com", "l@k.com"]


router.post("", async (req, res) => {
    try {
        const users = await User.create(req.body);
        sendmail("a@a.com", `${users.email}`,
            `Welcome to ABC system ${users.first_name} ${users.last_name}`,
            `Hi ${users.first_name}, Please confirm your email address`)

     for (let i = 0; i < to_arr.length; i++){       
        admin(`b@c.com`,`${to_arr[i]}` , `${users.first_name} ${users.last_name} has registered with us`,
            `Please welcome ${users.first_name} ${users.last_name}`)
     }
        // admin2(`c@d.com`, `server1@.com`, `${users.first_name} ${users.last_name} has registered with us`,
        //     `Please welcome ${users.first_name} ${users.last_name}`)
        // admin3(`d@e.com`, `server2@.com`, `${users.first_name} ${users.last_name} has registered with us`,
        //     `Please welcome ${users.first_name} ${users.last_name}`)
        // admin4(`f@cg.com`, `server3@.com`, `${users.first_name} ${users.last_name} has registered with us`,
        //     `Please welcome ${users.first_name} ${users.last_name}`)
        // admin5(`bd@c.com`, `server4@.com`, `${users.first_name} ${users.last_name} has registered with us`,
        //     `Please welcome ${users.first_name} ${users.last_name}`)

    

       


        return res.status(201).send(users);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

//pagination page
router.get('', async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const size = +req.query.size || 2;

        const skip = (page - 1) * size



        const users = await User.find().skip(skip).limit(size).lean().exec();

        const totalpages = Math.ceil(await User.find().countDocuments() / size)
        return res.json({
            users,
            totalpages
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();

        return res.status(201).send(user);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            .lean()
            .exec();

        return res.status(201).send(user);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).send(user);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: 'Failed'
        });
    }
});

module.exports = router