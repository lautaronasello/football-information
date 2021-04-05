import React from "react";
import Friends from "./components/friends-database";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      name: "",
      id: "",
      notes: "",
    };
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // get all entities - GET
  componentDidMount() {
    fetch("https://fairestdb.p.rapidapi.com/friend/friendModel", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3f277e16bbmsha4ab773835cba00p1b8f75jsn1289518e84d1",
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          friends: response,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  create(e) {
    // add entity - POST
    e.preventDefault();

    // creates entity
    fetch("https://fairestdb.p.rapidapi.com/friend/friendModel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "3f277e16bbmsha4ab773835cba00p1b8f75jsn1289518e84d1",
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
      },
      body: JSON.stringify({
        name: this.state.name,
        notes: this.state.notes,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch("https://fairestdb.p.rapidapi.com/friend/friendModel", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "3f277e16bbmsha4ab773835cba00p1b8f75jsn1289518e84d1",
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
      },
      body: JSON.stringify({
        _id: this.state.id,
        name: this.state.name,
        notes: this.state.notes,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  delete(e) {
    // delete entity - DELETE
    e.preventDefault();

    //deletes entities
    fetch(
      "https://fairestdb.p.rapidapi.com/friend/friendModel/_id/%7Bentity-id%7D",
      {
        method: "DELETE",
        headers: {
          "x-rapidapi-key":
            "3f277e16bbmsha4ab773835cba00p1b8f75jsn1289518e84d1",
          "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleChange(changeObject) {
    this.setState(changeObject);
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">
                Make An API Call in React
              </h1>
              <form className="d-flex flex-column">
                <legend className="text-center">
                  Add-Update-Delete Friend
                </legend>
                <label htmlFor="name">
                  Friend Name:
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) =>
                      this.handleChange({ name: e.target.value })
                    }
                    required
                  />
                </label>
                <label htmlFor="notes">
                  Friend notes:
                  <input
                    name="notes"
                    id="notes"
                    type="test"
                    className="form-control"
                    value={this.state.notes}
                    onChange={(e) =>
                      this.handleChange({ notes: e.target.value })
                    }
                    required
                  />
                </label>
                <label htmlFor="id">
                  Friend ID:
                  <input
                    name="id"
                    id="id"
                    type="text"
                    className="form-control"
                    value={this.state.id}
                    onChange={(e) => this.handleChange({ id: e.target.value })}
                  />
                </label>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={(e) => this.create(e)}
                >
                  Add
                </button>
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={(e) => this.update(e)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={(e) => this.delete(e)}
                >
                  Delete
                </button>
              </form>
              <Friends friends={this.state.friends} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
