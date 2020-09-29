const middleware = {}

middleware['admin'] = require('../admin/middleware/admin.js')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['user'] = require('../admin/middleware/user.js')
middleware['user'] = middleware['user'].default || middleware['user']

export default middleware
