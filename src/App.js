import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import GetQuestions from './components/questions/GetQuestions'
import GetQuestion from './components/questions/GetQuestion'
import CreateUpdateRecord from './components/shared/CreateUpdateRecord'

const App=()=> {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/questions">Questions</Link>
            </li>
            <li>
              <Link to="/questions/create">Create</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route exact
            path="/questions/create"
            component={(props)=><CreateUpdateRecord fields={["header", "subHeader"]} recordName="questions" {...props} />}
          />
          <Route exact
            path="/questions/:id/update"
            component={(props)=><CreateUpdateRecord fields={["header", "subHeader"]} recordName="questions" {...props} />}
          />
          <Route exact path="/questions/:id" component={GetQuestion} />
          <Route exact path="/questions" component={GetQuestions} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

// <Route exact path="/questions/create">
//   <CreateUpdateRecord recordName="questions" />
// </Route>


function Home() {
  return <h2>Home</h2>;
}

export default App;
