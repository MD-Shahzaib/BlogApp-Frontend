import Router from "./Config/Router";
import { UserContextProvider } from "./Context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </>
  );
}

export default App;

/*

TODO'S.

1- Code Clean and maintain.
2- Create a component for repeated code like import token in one place then export.
3- Create environment variables for (host, jwtSecret, MongoUri, etc).
4- Use toast for alert.
5- Responsive Design.
6- Add Validation both frontend and backend.
7- Make protection for routing.
8- Finaly Deploy.
*/
