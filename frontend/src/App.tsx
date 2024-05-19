import { useState } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";

function App() {
  const [link, setLink] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const createShortLink = async () => {
    try {
      const getShortUrl = fetch("api/short", {
        method: "POST",
        body: JSON.stringify({ link }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { url, message } = await (await getShortUrl).json();
      if (url) {
        setShortUrl(url);
        handleModalOpen();
      }
      setMessage(message)
    } catch (error) {
      setMessage(error["message"])
    }
  };
  const handleModalOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="grid">
      <Card>
        <h1>Short.ly</h1>
        <input
          type="url"
          value={link}
          onChange={(event) => setLink(event?.target.value)}
          placeholder="Enter Url"
        />
        <small>{message}</small>
        <div role="button" onClick={createShortLink}>Generate Shorlink</div>
      </Card>
      <Modal open={open} header="Here Is Your Short link">
        <a href={shortUrl}>{shortUrl}</a>
        <footer>
          <button className="secondary" onClick={handleModalOpen}>
            Close
          </button>
        </footer>
      </Modal>
    </div>
  );
}

export default App;
