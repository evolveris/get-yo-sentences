import React from "react";
import "./App.css";

function App() {
  const [listOfSentences, setListOfSentences] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [author, setAuthor] = React.useState("");

  const fetchSentences = () => {
    setIsLoading(true);

    fetch(`http://openlibrary.org/search.json?author=${author}`)
      .then(data => {
        return data.json();
      })
      .then(authorJsonData => {
        const listOfSentences = authorJsonData.docs
          .filter(book => {
            return book.hasOwnProperty("first_sentence");
          })
          .map(book => {
            return book.first_sentence[0];
          });
        setListOfSentences(listOfSentences);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Get👏Yo👏Sentences👏</h3>
        <div className="App-form">
          <label>Author:</label>
          <input
            onChange={e => {
              setAuthor(e.target.value);
            }}
            placeholder="Who?"
          />
          <button onClick={fetchSentences}>Give 'em to me 🛎</button>
        </div>
      </header>
      <main className="App-body">
        <div>
          <span>
            {isLoading ? (
              "Please wait. Fetching sentences."
            ) : (
              <ul>
                {listOfSentences.map(sentence => (
                  <li>{sentence}</li>
                ))}
              </ul>
            )}
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
