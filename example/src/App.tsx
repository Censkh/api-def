import { AxiosRequestBackend, FetchRequestBackend, ResponseOf, getRequestBackend, setRequestBackend } from "api-def";
import axios from "axios";
import React, { ChangeEvent, useCallback, useState } from "react";
import AsyncState, { useAsyncState } from "react-async-stateful";
import { User, fetchUsers, isMockingEnabled, setMockingEnabled } from "../Api";
import { fetchTest } from "../BaseUrlApi";

const useForceUpdate = () => {
  const [, setKey] = useState(0);
  return useCallback(() => setKey((i) => i + 1), []);
};

const App = () => {
  const [asyncState, , updateAsyncState] = useAsyncState<ResponseOf<typeof fetchUsers>>();
  const forceUpdate = useForceUpdate();

  const handleFetch = () => {
    updateAsyncState(
      async () => {
        const res = await fetchUsers.submit({});
        return res.data.sort(() => 0.5 - Math.random());
      },
      { refresh: true },
    );
  };

  const handleMockingChange = () => {
    setMockingEnabled(!isMockingEnabled());
    forceUpdate();
  };

  const handleRequestBackendChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLSelectElement).value;
    if (value === "axios") {
      setRequestBackend(new AxiosRequestBackend(axios));
    } else {
      setRequestBackend(new FetchRequestBackend());
    }
    forceUpdate();
  };

  return (
    <div>
      <h2>api-def examples</h2>

      <p>
        <b>Backend:</b>
        <select value={getRequestBackend().id} onChange={handleRequestBackendChange}>
          <option value={"axios"}>Axios</option>
          <option value={"fetch"}>Fetch</option>
        </select>
      </p>

      <b>Enable Mocks:</b>
      <p>
        <input type={"checkbox"} checked={isMockingEnabled()} onChange={handleMockingChange} />
      </p>

      <b>Base URL Test:</b>

      <p>
        <button type={"button"} onClick={() => fetchTest.submit({})}>
          Attempt Base URL
        </button>
      </p>

      <b>Fetch Test:</b>

      <p>
        <button type={"button"} disabled={asyncState.pending} onClick={handleFetch}>
          {asyncState.pending ? "Fetching..." : "Fetch"}
        </button>
      </p>

      {AsyncState.isResolved(asyncState) && asyncState.value.map((user) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};

export default App;
