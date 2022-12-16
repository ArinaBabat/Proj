
class RecordController {
  async create(req, res) {

  }
  async getAll(req, res) {
    const record = await Records.findAll()
    return res.json(record)
  }
  async getOne(req, res) {

  }
  async delet(req, res) {

  }
}
module.exports = new RecordController()
