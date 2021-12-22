export default {
    HOST: "database",
    USER: "timetable",
    PASSWORD: "password",
    DB: "timetable",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
