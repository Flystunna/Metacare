module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: Sequelize.STRING
        },       
        ip_address: {
            type: Sequelize.STRING
        },
        episode_id: {
            type: Sequelize.INTEGER
        },
    });
    return Comment;
};

