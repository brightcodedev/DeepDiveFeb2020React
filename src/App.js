import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CreateUpdateQuestion from './components/questions/CreateUpdateQuestion'
import GetQuestions from './components/questions/GetQuestions'
import GetQuestion from './components/questions/GetQuestion'
import CreateUpdateChoice from './components/choices/CreateUpdateChoice'
import GetChoices from './components/choices/GetChoices'
import GetChoice from './components/choices/GetChoice'


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
              <Link to="/questions/create">Create Question</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route exact
            path="/questions/create"
            component={(props)=><CreateUpdateQuestion recordName="questions" {...props} />}
          />
          <Route exact
            path="/questions/:id/update"
            component={(props)=><CreateUpdateQuestion recordName="questions" {...props} />}
          />
          <Route exact
            path="/choices/create"
            component={(props)=><CreateUpdateChoice recordName="choices" {...props} />}
          />
          <Route exact
            path="/choices/:id/update"
            component={(props)=><CreateUpdateChoice recordName="choices" {...props} />}
          />
          <Route exact path="/choices/:id" component={GetChoice} />
          <Route exact path="/choices" component={GetChoices} />
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
