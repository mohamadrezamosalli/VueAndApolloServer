export default error => ({
    name: error.name,
    message: error.message.replace('Context creation failed:', '')
});