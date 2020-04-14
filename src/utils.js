export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
    this.type = 'success';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result.data);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    });
  }

  sendXML(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data
    };

    if (this.type === 'success') {
      return res.send(result.data);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    });
  }
}
