import React, {useCallback, useState}                          from "react";
import AsyncState, {useAsyncState}                             from "react-async-stateful";
import {fetchUsers, isMockingEnabled, setMockingEnabled, User} from "../Api";

const useForceUpdate = () => {
  const [, setKey] = useState(0);
  return useCallback(() => setKey(i => i + 1), []);
};

const App = () => {
  const [asyncState, , updateAsyncState] = useAsyncState<User[]>();
  const forceUpdate = useForceUpdate();

  const handleFetch = useCallback(() => {
    updateAsyncState(async () => {
      const res = await fetchUsers.submit({});
      return res.data.sort(() => .5 - Math.random());
    }, {refresh: true});
  }, []);

  const handleMockingChange = useCallback(() => {
    setMockingEnabled(!isMockingEnabled());
    forceUpdate();
  }, []);

  return <div>
    <h2>api-def examples</h2>

    <p>
      Enabled mocks <input type={"checkbox"} checked={isMockingEnabled()} onChange={handleMockingChange}/>
    </p>

    <button disabled={asyncState.pending} onClick={handleFetch}>{asyncState.pending ? "Fetching..." : "Fetch"}</button>

    {AsyncState.isResolved(asyncState) && asyncState.value.map(user => <div key={user.id}>
      {user.name}
    </div>)}
  </div>;
};

export default App;
