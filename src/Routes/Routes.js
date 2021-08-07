import { Suspense, lazy, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";


const Main = lazy(() => import("../Pages/Main.page"));
const Search = lazy(() => import("../Pages/Search.page"));
const NotFound = lazy(() => import("../Pages/NotFound.page"));

const Routes = (props) => {
  return ( 
    <Fragment>
      <Suspense
        fallback={
          <Spinner type="Oval" color="#f57f1a" height={100} width={100} />
        }
      >
        <Switch>
          <Route exact path="/main" component={() => <Main {...props} />} />
          <Route exact path="/search" component={() => <Search {...props} />} />
          <Redirect from="/" exact to="/main" />
          <Route path="/not-found" component={() => <NotFound {...props} />} />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </Suspense>
    </Fragment>
   );
}
 
export default Routes;