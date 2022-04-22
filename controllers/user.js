const User = require('../models').User;
const News = require('../models').News;


module.exports = {
    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: News,
                    as: 'news'
                },],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((users) => res.status(200).send(users))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: News,
                    as: 'news'
                },],
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return User
            .create({
                news_id: req.body.news_id,
                user_name: req.body.user_name,
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: News,
                    as: 'news'
                },],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        user_name: req.body.user_name || user.user_name,
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
