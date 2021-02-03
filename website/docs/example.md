---
id: example
title: Example
---

```tsx live
function Example() {
  // normally you would define this only once globally but for this example
  // we define it in our component
  const api = new Api({
    name: "Words API",
    baseUrl: "https://wordsapiv1.p.mashape.com/"
  });
  
  const fetchWordData = api.endpoint()
    .paramsOf<"word">()
    .responseOf<{word: string, results: Array<{
      definition: string,
      partOfSpeech: string,
    }>}>()
    .build({
      id: "fetch_word_data",
      path: "words/:word",
    })

  const [value, setValue] = useState("");
  const [state] = useAsyncState();
  
  const handleValueChange = useCallback((e) => setValue(e.target.value), []);

  const handleSubmit 

  return <div>
    <input value={value} onChange={handleValueChange} />
    <button onClick={handleSubmit} disabled={!value.length}>Submit</button>
  </div>;
}
```
