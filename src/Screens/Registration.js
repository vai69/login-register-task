
/* Register.jsx */
import React from "react";
// import loginImg from "../../login.svg";
import axios from 'axios';
export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      email: '',
      password: '',
      cpassword: '',
    }

    this.changeName = this.changeName.bind(this);
    this.changeemail = this.changeemail.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.changecpassword = this.changecpassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  changeName(event) {
    this.setState({
      Name: event.target.value
    })
  }

  changeemail(event) {
    this.setState({
      email: event.target.value
    })
  }

  changecpassword(event) {
    this.setState({
      cpassword: event.target.value
    })
  }


  changepassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      if (this.state.cpassword != this.state.password) {
        alert("Password does not match!!")
        return;
      }
      const registration = {
        Name: this.state.Name,
        email: this.state.email,
        password: this.state.password,
      }

      axios.post('http://localhost:4000/ur/', registration)   /// After Hosting change to hosted backend name
        .then(res => {
          console.log(res);
          if (!res.data.message) {
            console.log("ok")
          } else {
            alert(res.data.message);
          }

        })
        .catch(err => console.log(err));
      var link = '/login'
      window.location.href = link;
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100 background-image" >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form action="/signup" method="POST" onSubmit={this.onSubmit} className="login100-form validate-form">
              <span className="login100-form-title p-b-49">
                User Registeration
              </span>

              <div className="wrap-input100 validate-input m-b-23" data-validate="User Name is reauired">
                <span className="label-input100" >Full Name</span>
                <input className="input100" type="text" name="Name" placeholder="Type User Name" autoComplete="off"
                  onChange={this.changeName} value={this.state.Name} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>


              <div className="wrap-input100 validate-input m-b-23" data-validate="Email id is reauired">
                <span className="label-input100">Email </span>
                <input className="input100" type="email" name="email" placeholder="Type User Email id" autoComplete="off"
                  onChange={this.changeemail} value={this.state.email} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100">Enter Password</span>
                <input className="input100" id="password" type="password" name="pass" placeholder="Type your password" autoComplete="off"
                  onChange={this.changepassword} value={this.state.password} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" />

                <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>

              <div className="wrap-input100 validate-input form-group has-feedback cp" id="message1" data-validate="Password is required">
                <span className="label-input100">Confirm Password</span>
                <input className="input100" id="confirm_password" type="password" name="pass1" placeholder="Type to Confirm password" autoComplete="off"
                  onChange={this.changecpassword} value={this.state.cpassword} />
                <span className="focus-input100" data-symbol="&#xf190;"></span>
                <span className="glyphicon  form-control-feedback" id="message2"></span>
              </div>
              <div className="container-login100-form-btn hidden" id="disabled" style={{ "marginTop": "10%" }}>
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" type="submit" name="submit" value="info">
                    Register
                  </button>
                </div>
              </div>

            </form>


            <div className="flex-col-c p-t-155 cp1">
              <span className="txt1 p-b-17">
                Already have an account?
              </span>

              <a href="/login" className="txt2">
                Log in
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
