import Errors from './errors';

class Form {
  constructor(data) {
    this.originalData = data;
    for (let field in data) {
      this[field] = data[field];
    }
    this.errors = new Errors();
  }
  data() {
    let data = {};

    for (let property in originalData) {
      data[property] = this[property];
    }
    return data;
  }
  reset() {
    for (let field in this.originalData) {
      this[field] = '';
    }
    this.errors.clear();
  }
  submit(requestType, url) {
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.data())
      .then(response => {
        this.onSuccess(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        this.onFail(error.response.data);
        reject(error.response.data);
      });
    })
  }
  
  onSuccess(data) {
    alert(data);
    this.reset();
  }
  onFail(errors) {
    console.log(errors);
    this.errors.record(errors.errors)
  }
}

export default Form;