const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TodoSchema = new schema({
  description: { type: String, required: true },
  status: { type: String, default: 'To do', required: true },
});

module.exports = mongoose.model('todo', TodoSchema);
